import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';

@Injectable()
export class PollService {
  constructor(
    private prisma: PrismaService,
  ) {}


}