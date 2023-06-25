import { Module } from '@nestjs/common';
import { CathedraController } from '../api/controllers/CathedraController';
import { CathedraService } from '../api/services/CathedraService';
import { AccessModule } from './AccessModule';

@Module({
  controllers: [CathedraController],
  providers: [CathedraService],
  exports: [CathedraService],
  imports: [AccessModule],
})
export class CathedraModule {}
