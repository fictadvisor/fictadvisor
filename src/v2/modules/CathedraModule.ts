import { Module } from '@nestjs/common';
import { CathedraController } from '../api/controllers/CathedraController';
import { CathedraService } from '../api/services/CathedraService';
import { AccessModule } from './AccessModule';
import { MapperModule } from './MapperModule';

@Module({
  controllers: [CathedraController],
  providers: [CathedraService],
  exports: [CathedraService],
  imports: [AccessModule, MapperModule],
})
export class CathedraModule {}
