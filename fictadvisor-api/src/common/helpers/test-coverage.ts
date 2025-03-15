import * as fs from 'node:fs';
import * as path from 'node:path';
import { Request, Response } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpServer } from '@nestjs/common';

export enum TestType {
  UNIT = 'unit',
  INTEGRATION = 'integration',
}

type FileInfo = {
  path: string;
  prefix: string;
  extension: string;
}

type CoverageSetupOptions = {
  prefix: string,
  app: NestExpressApplication,
  testType: TestType,
}

export class TestCoverage {
  static setup ({ prefix, app, testType }: CoverageSetupOptions): void {
    const baseDir = path.join(__dirname, `../../../../coverage/${testType}`);
    if (!fs.existsSync(baseDir)) return;

    const server = app.getHttpAdapter();

    const files = this.getFileInfo(baseDir, prefix);
    for (const info of files) {
      this.createEndpoint(server, info);
    }
  }

  private static getFileInfo (baseDir: string, basePrefix: string): FileInfo[] {
    const dirContent = fs.readdirSync(
      baseDir,
      {
        withFileTypes: true,
        recursive: true,
      },
    );

    const files: FileInfo[] = [];

    for (const dirent of dirContent) {
      if (dirent.isFile()) {
        const { name } = dirent;

        const filePath = path.join(dirent.parentPath ?? dirent.path, name);
        const extension = name.match(/[^.]*$/g)[0];
        const prefix = filePath.replace(/(index)?\.html$/, '');

        files.push({
          path: filePath,
          prefix: path.join('/', basePrefix, path.relative(baseDir, prefix)).normalize(),
          extension,
        });
      }
    }

    return files;
  }

  private static createEndpoint (
    server: HttpServer,
    info: FileInfo,
  ) {
    const buffer = fs.readFileSync(info.path);
    let text: string;

    if (info.extension !== 'png') {
      text = buffer.toString();
    }

    if (info.extension === 'html') {
      text = text.replaceAll(/(index)?\.html/g, '');
    }

    server.get(info.prefix.replaceAll('\\', '/'), (req: Request, res: Response) => {
      res.contentType(info.extension);
      res.send(text ?? buffer);
    });
  }
}
