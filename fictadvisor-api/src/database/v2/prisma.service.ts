import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, State } from '@prisma/client/fictadvisor';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit () {
    await this.$connect();
    await this.user.deleteMany({
      where: {
        state: State.PENDING,
        password: {
          not: {
            equals: null,
          },
        },
      },
    });
  }

  async enableShutdownHooks (app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
