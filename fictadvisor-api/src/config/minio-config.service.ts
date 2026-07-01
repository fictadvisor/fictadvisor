import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MinioConfigService {
  constructor (private configService: ConfigService) {}

  get endpoint (): string {
    return this.configService.get<string>('minio.endpoint');
  }

  // Public base URL browsers use (avatar links + presigned URLs). Falls back to
  // the internal endpoint when unset (e.g. local dev without a proxy).
  get publicUrl (): string {
    return this.configService.get<string>('minio.publicUrl') || this.endpoint;
  }

  get region (): string {
    return this.configService.get<string>('minio.region');
  }

  get accessKeyId (): string {
    return this.configService.get<string>('minio.accessKeyId');
  }

  get secretAccessKey (): string {
    return this.configService.get<string>('minio.secretAccessKey');
  }

  get bucket (): string {
    return this.configService.get<string>('minio.bucket');
  }
}
