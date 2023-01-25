import {Injectable} from '@nestjs/common';
import {PrismaService} from '../../database/PrismaService';
import {UpdateSuperheroData} from "./dto/UpdateSuperheroData";

@Injectable()
export class UserRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

}