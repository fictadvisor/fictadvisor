import { Controller, Get, Post } from '@nestjs/common';
import { UserRole } from 'src/database/entities/user.entity';
import { Authorize } from 'src/security/security.authorization';
import { SitemapService } from './sitemap.service';

@Controller('sitemap')
export class SitemapController {
    constructor(
        private sitemapService: SitemapService,
    ) {}

    @Post('/build')
    @Authorize({ roles: [UserRole.Admin] })
    public async build() {
        await this.sitemapService.build();
    }
}
