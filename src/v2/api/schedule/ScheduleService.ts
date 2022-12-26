import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';

@Injectable()
export class ScheduleService {
  constructor(
    private prisma: PrismaService,
  ) {}


}