import { Module } from '@nestjs/common';
import { SitemapService } from './sitemap.service';
import { SitemapController } from './sitemap.controller';
import { JwtModule } from 'src/jwt/jwt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from 'src/database/entities/teacher.entity';
import { Subject } from 'src/database/entities/subject.entity';

@Module({
  imports: [
    JwtModule,
    TypeOrmModule.forFeature(
      [
        Teacher,
        Subject,
      ]
    ),
  ],
  providers: [SitemapService],
  controllers: [SitemapController]
})
export class SitemapModule {}
