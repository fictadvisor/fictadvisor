import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { join, extname } from 'path';
import * as admin from 'firebase-admin';
import * as process from 'process';
import { find } from '../../common/utils/array.utils';
import { StudentWithContactsData } from './types/student-with-contacts.data';
import { MINUTE } from '../date/v2/date.service';
import { Bucket } from '@google-cloud/storage';
import { utils, write } from 'xlsx';

@Injectable()
export class FileService {
  private storage: Bucket;

  constructor () {
    admin.initializeApp({
      credential: admin.credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS),
      storageBucket: process.env.BUCKET_NAME,
    });
    this.storage = admin.storage().bucket();
  }

  async saveByHash (fileContent: Express.Multer.File, directory: string): Promise<string> {
    const fileName = createHash('md5').update(fileContent.buffer).digest('hex');
    const filePath = join('static', directory, fileName + extname(fileContent.originalname));

    const file = this.storage.file(filePath);
    await file.save(fileContent.buffer);

    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '01-01-2222',
    });
    return url;
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
    const [result] = await this.storage.file(path).exists();
    return result;
  }

  async deleteFile (path: string): Promise<void> {
    await this.storage.file(path).delete();
  }

  async getFileContent (path: string, isPrivate = true, encoding: BufferEncoding = 'utf-8') {
    const filePath = this.formatLink(join(isPrivate ? 'private' : 'static', path));
    const [file] = await this.storage.file(filePath).download();

    return file.toString(encoding);
  }

  async generateGroupList (students: StudentWithContactsData[], groupId: string): Promise<string> {
    const fileName = `${groupId}.xlsx`;
    const path = join('static', 'lists', fileName);

    const timeout = MINUTE * 15;

    const file = this.storage.file(path);
    if (await this.checkFileExist(path)) {
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: Date.now() + timeout,
      });

      return url;
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

    await file.save(dataBuffer);

    setTimeout(async () => this.storage.file(path).delete(), timeout);

    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + timeout,
    });

    return url;
  }
}
