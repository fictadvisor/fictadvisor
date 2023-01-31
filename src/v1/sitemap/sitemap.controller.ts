import { Controller, Post } from '@nestjs/common';
import { UserRole } from 'src/v1/database/entities/user.entity';
import { Authorize } from 'src/v1/security/security.authorization';
import { SitemapService } from './sitemap.service';

@Controller('sitemap')
export class SitemapController {
  constructor (private readonly sitemapService: SitemapService) {}

  @Post('/build')
  @Authorize({ roles: [UserRole.Admin] })
  public async build () {
    await this.sitemapService.build();
  }
}
