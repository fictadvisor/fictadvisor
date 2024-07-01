import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post, Delete, Param } from '@nestjs/common';
import { FAQService } from '../services/FAQService';
import { CreateFAQDTO } from '@fictadvisor/utils';

@ApiTags('faqs')
@Controller({
  version: '2',
  path: '/faqs',
})
export class FAQController {
  constructor (
    private readonly faqService: FAQService,
  ) {}

  /*@Post()
  async create (
    @Body() body: CreateFAQDTO,
  ) {}*/

  //async update () {}

  @Delete('/:faqId')
  async delete (
    @Param('faqId') faqId: string,
  ) {
    return this.faqService.delete(faqId);
  }

  // TODO

  //async getAll () {}
  //request endpoint with faq content that sends request to bot api

  // create FAQ through bot
}
