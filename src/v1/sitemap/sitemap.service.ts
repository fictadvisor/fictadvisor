import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import dateFormat from 'dateformat';
import { Subject, SubjectState } from 'src/v1/database/entities/subject.entity';
import { Teacher, TeacherState } from 'src/v1/database/entities/teacher.entity';
import { Repository } from 'typeorm';
import { create } from 'xmlbuilder2';
import { writeFile } from 'fs';


@Injectable()
export class SitemapService {
  constructor (
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
    private configService: ConfigService
  ) {}

  private NAVIGATION = ['/', '/teachers', '/subjects', '/help', '/superheroes'];

  public async build () {
    const baseUrl = this.configService.get<string>('frontBaseUrl');

    const root = create({ encoding: 'UTF-8' }).ele('urlset', {
      xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
    });

    const teachers = await this.teacherRepository.find({
      where: { state: TeacherState.APPROVED },
      select: ['link', 'updatedAt'],
    });
    const subjects = await this.subjectRepository.find({
      where: { state: SubjectState.APPROVED },
      select: ['link', 'updatedAt'],
    });

    this.NAVIGATION.forEach((n) => {
      const url = root.ele('url');
      url.ele('loc').txt(`${baseUrl}${n}`);
      url.ele('changefreq').txt('weekly');
      url.ele('priority').txt('1');
    });

    teachers.forEach((t) => {
      const url = root.ele('url');
      url.ele('loc').txt(`${baseUrl}/teachers/${t.link}`);
      url.ele('lastmod').txt(dateFormat(t.updatedAt, 'yyyy-mm-dd'));
      url.ele('changefreq').txt('daily');
      url.ele('priority').txt('0.5');
    });

    subjects.forEach((s) => {
      const url = root.ele('url');
      url.ele('loc').txt(`${baseUrl}/subjects/${s.link}`);
      url.ele('lastmod').txt(dateFormat(s.updatedAt, 'yyyy-mm-dd'));
      url.ele('changefreq').txt('daily');
      url.ele('priority').txt('0.5');
    });

    const xml = root.end({ prettyPrint: true });

    return new Promise<void>((resolve, reject) =>
      writeFile(
        `${this.configService.get<string>('static.dir')}/sitemap.xml`,
        xml,
        { encoding: 'utf-8' },
        (err) => (err ? reject(err) : resolve())
      )
    );
  }
}
