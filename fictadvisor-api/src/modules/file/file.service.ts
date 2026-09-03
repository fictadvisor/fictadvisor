import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { join, extname } from 'path';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { find } from '../../common/utils/array.utils';
import { StudentWithContactsData } from './types/student-with-contacts.data';
import { MINUTE } from '../date/v2/date.service';
import { utils, write } from 'xlsx';
import { MinioConfigService } from '../../config/minio-config.service';
import { StoredFile } from './types/stored-file.data';

@Injectable()
export class FileService {
  // Data client — talks to MinIO over the internal endpoint (fast, off any CDN).
  private readonly client: S3Client;
  // Presign client — bound to the PUBLIC endpoint so presigned URLs carry a
  // browser-reachable host (SigV4 signs the host, so it can't be swapped later).
  private readonly presignClient: S3Client;
  private readonly bucket: string;
  // Base URL for building public object links, e.g. `${publicUrl}/${bucket}`.
  private readonly publicBase: string;

  constructor (private minioConfigService: MinioConfigService) {
    this.bucket = minioConfigService.bucket;
    this.publicBase = `${minioConfigService.publicUrl.replace(/\/+$/, '')}/${this.bucket}`;
    const credentials = {
      accessKeyId: minioConfigService.accessKeyId,
      secretAccessKey: minioConfigService.secretAccessKey,
    };
    // MinIO uses path-style addressing (`<endpoint>/<bucket>/<key>`).
    this.client = new S3Client({
      endpoint: minioConfigService.endpoint,
      region: minioConfigService.region,
      forcePathStyle: true,
      credentials,
    });
    this.presignClient = new S3Client({
      endpoint: minioConfigService.publicUrl,
      region: minioConfigService.region,
      forcePathStyle: true,
      credentials,
    });
  }

  async saveByHash (fileContent: Express.Multer.File, directory: string): Promise<string> {
    const fileName = createHash('md5').update(fileContent.buffer).digest('hex');
    const key = this.formatLink(join('static', directory, fileName + extname(fileContent.originalname)));

    await this.client.send(new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: fileContent.buffer,
      ContentType: fileContent.mimetype,
    }));

    return this.buildPublicUrl(key);
  }

  private buildPublicUrl (key: string): string {
    return `${this.publicBase}/${key}`;
  }

  isStorageLink (link: string | null | undefined): link is string {
    return link?.startsWith(`${this.publicBase}/`) ?? false;
  }

  private formatLink (path: string): string {
    return path.replaceAll('\\', '/');
  }

  getPathFromLink (link: string): string {
    const url = new URL(link);
    const pathParts = url.pathname.split('/').slice(2);
    return pathParts.join('/');
  }

  async checkFileExist (path: string): Promise<boolean> {
    try {
      await this.client.send(new HeadObjectCommand({ Bucket: this.bucket, Key: path }));
      return true;
    } catch (error) {
      const err = error as { name?: string; $metadata?: { httpStatusCode?: number } };
      if (err?.name === 'NotFound' || err?.$metadata?.httpStatusCode === 404) {
        return false;
      }
      throw error;
    }
  }

  async deleteFile (path: string): Promise<void> {
    await this.client.send(new DeleteObjectCommand({ Bucket: this.bucket, Key: path }));
  }

  async getFileContent (path: string, isPrivate = true, encoding: BufferEncoding = 'utf-8') {
    const key = this.resolveKey(path, isPrivate);
    const { Body } = await this.client.send(new GetObjectCommand({ Bucket: this.bucket, Key: key }));

    return Body!.transformToString(encoding);
  }

  /** Undefined when the object is absent, rather than an S3 NoSuchKey. */
  async findFileContent (path: string, isPrivate = true, encoding: BufferEncoding = 'utf-8') {
    // Resolved here rather than by the caller: `checkFileExist` takes a full key,
    // while `getFileContent` takes a path it prefixes itself, and mixing the two
    // up silently reports every file as missing.
    const key = this.resolveKey(path, isPrivate);
    if (!await this.checkFileExist(key)) return undefined;

    const { Body } = await this.client.send(new GetObjectCommand({ Bucket: this.bucket, Key: key }));

    return Body!.transformToString(encoding);
  }

  private resolveKey (path: string, isPrivate: boolean): string {
    return this.formatLink(join(isPrivate ? 'private' : 'static', path));
  }

  /** Writes to a path the caller names, rather than to a hash of the content. */
  async saveContent (
    path: string,
    body: Buffer | string,
    contentType: string,
    isPrivate = true,
  ): Promise<void> {
    await this.client.send(new PutObjectCommand({
      Bucket: this.bucket,
      Key: this.resolveKey(path, isPrivate),
      Body: body,
      ContentType: contentType,
    }));
  }

  async deleteByPath (path: string, isPrivate = true): Promise<void> {
    await this.deleteFile(this.resolveKey(path, isPrivate));
  }

  /** Every object under a prefix, with the path relative to that prefix. */
  async listFiles (prefix: string, isPrivate = true): Promise<StoredFile[]> {
    const base = this.resolveKey(prefix, isPrivate);
    const files: StoredFile[] = [];
    let continuationToken: string | undefined;

    do {
      const page = await this.client.send(new ListObjectsV2Command({
        Bucket: this.bucket,
        // A prefix has to end with the separator, otherwise `selective` would
        // also match a sibling called `selective-archive`.
        Prefix: base.endsWith('/') ? base : `${base}/`,
        ContinuationToken: continuationToken,
      }));

      for (const object of page.Contents ?? []) {
        if (!object.Key) continue;
        files.push({
          name: object.Key.slice(base.replace(/\/+$/, '').length + 1),
          size: object.Size ?? 0,
          updatedAt: object.LastModified ?? new Date(0),
        });
      }

      continuationToken = page.IsTruncated ? page.NextContinuationToken : undefined;
    } while (continuationToken);

    return files;
  }

  private getSignedReadUrl (key: string, expiresInMs: number): Promise<string> {
    return getSignedUrl(
      this.presignClient,
      new GetObjectCommand({ Bucket: this.bucket, Key: key }),
      { expiresIn: Math.floor(expiresInMs / 1000) },
    );
  }

  async generateGroupList (students: StudentWithContactsData[], groupId: string): Promise<string> {
    const fileName = `${groupId}.xlsx`;
    const key = this.formatLink(join('static', 'lists', fileName));

    const timeout = MINUTE * 15;

    if (await this.checkFileExist(key)) {
      return this.getSignedReadUrl(key, timeout);
    }

    const data = students.map((student) => ({
      lastName: student.lastName,
      firstName: student.firstName,
      middleName: student.middleName,
      email: student.email,
      telegram: find(student.contacts, 'name', 'TELEGRAM')?.link || '',
      github: find(student.contacts, 'name', 'GITHUB')?.link || '',
      instagram: find(student.contacts, 'name', 'INSTAGRAM')?.link || '',
      facebook: find(student.contacts, 'name', 'FACEBOOK')?.link || '',
      twitter: find(student.contacts, 'name', 'TWITTER')?.link || '',
      discord: find(student.contacts, 'name', 'DISCORD')?.link || '',
      youtube: find(student.contacts, 'name', 'YOUTUBE')?.link || '',
      mail: find(student.contacts, 'name', 'MAIL')?.link || '',
    }));

    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet);

    const dataBuffer = write(workbook, {
      type: 'buffer',
      bookType: 'xlsx',
    });

    await this.client.send(new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: dataBuffer,
      ContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    }));

    setTimeout(() => {
      this.deleteFile(key).catch(() => undefined);
    }, timeout);

    return this.getSignedReadUrl(key, timeout);
  }
}
