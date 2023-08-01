import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CreateQueueDTO } from '../dtos/CreateQueueDTO';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';
import { Queue, QueuePosition, QueuePositionStatus, QueueUser } from '@prisma/client';
import { UpdateQueueDTO } from '../dtos/UpdateQueueDTO';
import { Page } from '../../utils/QueryAllDTO';
import { mapAsync } from '../../utils/ArrayUtil';
import { CreateQueueUserDTO } from '../dtos/CreateQueueUserDTO';
import { UpdateQueueUserDTO } from '../dtos/UpdateQueueUserDTO';
import { CreateEntrantDTO } from '../dtos/CreateEntrantDTO';
import { AdmissionAPI } from '../../telegram/AdmissionAPI';

interface IMessageData {
  queue: string;
  position?: number;
  delta?: number;
  code?: number;
}

export enum MessageType {
  PROCESSING,
  MOVED,
  POSITION,
  DELETED,
}

const messages = {
  [MessageType.PROCESSING]: (d: IMessageData) => `<b>${d.queue}</b>\n\nВаша заявка вже оброблюється оператором. Можете заходити до корпусу.\n\n<b>\nВаш номер: ${d.code}</b>`,
  [MessageType.MOVED]: (d: IMessageData) => `<b>${d.queue}</b>\n\nВашу заявку посунули у черзі на ${d.delta} позицій ${d.delta > 0 ? 'назад' : 'вперед'}.`,
  [MessageType.POSITION]: (d: IMessageData) => `<b>${d.queue}</b>\n\nВаша позиція у черзі: <b>${d.position}</b>\nНе відходьте далеко від корпусу.`,
  [MessageType.DELETED]: (d: IMessageData) => `<b>${d.queue}</b>\n\nДякую за користування нашою електронною чергою.`,
};

@Injectable()
export class AdmissionService {
  constructor (
    private prisma: PrismaService,
  ) {}

  private questionLastPosition: object = {};

  async createQueue (body: CreateQueueDTO) {
    return {
      queue: await this.prisma.queue.create({
        data: {
          name: body.name,
          active: true,
        },
      }),
    };
  }

  async getQueues () {
    return {
      queues: await this.prisma.queue.findMany({
        orderBy: {
          active: 'desc',
        },
      }),
    };
  }

  async getQueue (queueId: number) {
    const queue = await this.getAndCheckQueue(queueId);

    const queueSize = await this.prisma.queuePosition.count({
      where: {
        queue,
        status: QueuePositionStatus.WAITING,
      },
    });

    const lastPosition = this.questionLastPosition[queue.id] ?? 1;

    return {
      queue,
      queueSize,
      lastPosition,
    };
  }

  async updateQueue (queueId: number, body: UpdateQueueDTO) {
    await this.getAndCheckQueue(queueId);

    await this.prisma.queue.update({
      where: {
        id: queueId,
      },
      data: body,
    });
  }

  async deleteQueue (queueId: number) {
    await this.getAndCheckQueue(queueId);

    await this.prisma.queue.delete({
      where: {
        id: queueId,
      },
    });
  }

  async advanceQueue (queueId: number) {
    const queue = await this.getAndCheckQueue(queueId);

    const position = await this.prisma.queuePosition.findFirst({
      where: {
        queueId: queue.id,
        status: QueuePositionStatus.WAITING,
      },
      orderBy: {
        position: 'asc',
      },
    });

    if (!position) {
      throw new BadRequestException('There is no one in queue');
    }

    this.prisma.queuePosition.update({
      where: {
        id: queue.id,
      },
      data: {
        status: QueuePositionStatus.GOING,
      },
    });

    const user = await this.prisma.queueUser.findFirst({
      where: {
        id: position.userId,
      },
    });

    await this.sendMessage(user, MessageType.PROCESSING, { queue: queue.name, code: position.code });

    return position;
  }

  async notifyQueue (queueId: number) {
    const queue = await this.getAndCheckQueue(queueId);

    const positions = await this.prisma.queuePosition.findMany({
      where: {
        queueId: queue.id,
        status: QueuePositionStatus.WAITING,
      },
      orderBy: {
        position: 'asc',
      },
      take: 20,
    });

    for (let i = 0; i < Math.min(positions.length, 10); i++) {
      const numPosition = i + 1;
      const position = positions[i];

      if (position.lastNotifiedPosition !== numPosition) {
        if (position.lastNotifiedPosition < numPosition || i < 10) {
          this.prisma.queuePosition.update({
            where: {
              id: queue.id,
            },
            data: {
              lastNotifiedPosition: numPosition,
            },
          });

          const user = await this.prisma.queueUser.findFirst({
            where: {
              queuePositions: {
                some: {
                  userId: position.userId,
                },
              },
            },
          });

          await this.sendMessage(user, MessageType.POSITION, { queue: queue.name, position: numPosition });
        }
      }
    }
  }

  async deleteQueuePosition (queueId: number, userId: number) {
    const queue = await this.getAndCheckQueue(queueId);
    const user = await this.getAndCheckUser(userId);

    this.prisma.queuePosition.deleteMany({
      where: {
        queueId,
        userId,
      },
    });

    await this.sendMessage(user, MessageType.DELETED, { queue: queue.name });
  }

  async getAndCheckQueue (queueId: number) {
    const queue = await this.prisma.queue.findUnique({
      where: {
        id: queueId,
      },
    });

    if (!queue) {
      throw new InvalidEntityIdException('Queue');
    }

    return queue;
  }

  async getQueueUsers (queueId: number, page: Page) {
    const queue = await this.getAndCheckQueue(queueId);
    const count = await this.prisma.queuePosition.count({
      where: {
        queue,
      },
    });
    const positions = await this.prisma.queuePosition.findMany({
      where: {
        queue,
      },
      take: page.take,
      skip: page.skip,
      include: {
        user: true,
      },
      orderBy: {
        position: 'asc',
      },
    });

    const newPositions = await mapAsync(positions, async (position) => ({
      ...position,
      relativePosition: await this.getRelativePosition(position),
      user: await this.prisma.queueUser.findUnique({
        where: {
          id: +position.userId,
        },
      }),
    }));

    return {
      count,
      positions: newPositions,
    };
  }

  async getRelativePosition ({ queueId, position }: QueuePosition) {
    return this.prisma.queuePosition.count({
      where: {
        queueId,
        status: QueuePositionStatus.WAITING,
        position: {
          lte: position,
        },
      },
    });
  }

  async getAndCheckUser (userId: number) {
    const user = await this.prisma.queueUser.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new InvalidEntityIdException('Entrant');
    }

    return user;
  }

  async createQueueUser (queueId: number, body: CreateQueueUserDTO) {
    const queue = await this.getAndCheckQueue(queueId);
    const user = await this.getAndCheckUser(body.id);

    if (!body.force) {
      if (!queue.open) {
        throw new BadRequestException('Queue is closed');
      }

      if (!queue.active) {
        throw new BadRequestException('Queue is closed');
      }
    }

    const queuePosition = this.prisma.queuePosition.findFirst({
      where: {
        queue,
        user,
      },
    });

    if (queuePosition) {
      throw new BadRequestException('Queue position already exists');
    }

    const code = this.generatePosition(queue);

    return {
      position: await this.prisma.queuePosition.create({
        data: {
          queueId,
          userId: body.id,
          code,
          position: code,
        },
      }),
    };
  }

  generatePosition (queue: Queue) {
    if (!(queue.id in this.questionLastPosition)) {
      this.questionLastPosition[queue.id] = 0;
    }

    return ++this.questionLastPosition[queue.id];
  }

  async getAndCheckQueueUser (queueId: number, userId: number) {
    const queuePosition = await this.prisma.queuePosition.findFirst({
      where: {
        queueId,
        userId,
      },
    });

    if (!queuePosition) {
      throw new InvalidEntityIdException('QueuePosition');
    }

    return queuePosition;
  }

  async updateQueueUser (queueId: number, userId: number, body: UpdateQueueUserDTO) {
    const queue = await this.getAndCheckQueue(queueId);
    const user = await this.getAndCheckUser(userId);
    const position = await this.getAndCheckQueueUser(queueId, userId);

    let positionDelta = 0;
    if (body.position && body.position !== position.position) {
      const old = position.position;
      position.position = Math.max(body.position, 0);

      positionDelta = position.position - old;
    }

    let statusUpdated = false;
    if (body.status && body.status !== position.status) {
      position.status = body.status;

      statusUpdated = true;
    }

    await this.prisma.queuePosition.updateMany({
      where: {
        queueId,
        userId,
      },
      data: {
        position: position.position,
        status: position.status,
      },
    });

    if (positionDelta !== 0) {
      await this.sendMessage(user, MessageType.MOVED, { queue: queue.name, delta: positionDelta });
    }

    if (statusUpdated || positionDelta !== 0) {
      await this.notifyQueue(queueId);

      if (body.status === QueuePositionStatus.GOING) {
        await this.sendMessage(user, MessageType.PROCESSING, { queue: queue.name, code: position.code });
      }
    }

    return {
      position,
    };
  }

  async getQueueUser (queueId: number, userId: number) {
    const queue = await this.getAndCheckQueue(queueId);
    const user = await this.getAndCheckUser(userId);
    const position = await this.getAndCheckQueueUser(queueId, userId);

    return {
      queue,
      user,
      position,
    };
  }

  async getUsers (page: Page) {
    const users = await this.prisma.queueUser.findMany({
      ...page,
    });
    const count = await this.prisma.queueUser.count({});

    return {
      count,
      users: users.map((user) => ({
        ...user,
        telegramId: user.telegramId ? Number(user.telegramId) : null,
      })),
    };
  }

  async createUser (body: CreateEntrantDTO) {

    const user = await this.prisma.queueUser.create({
      data: {
        ...body,
      },
    });

    this.prisma.entrant.create({
      data: {
        firstName: body.firstName,
        middleName: body.middleName,
        lastName: body.lastName,
        specialty: body.speciality,
      },
    });

    return {
      user,
    };
  }

  async getUser (userId: number) {
    const user = await this.prisma.queueUser.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new BadRequestException('Such user does not exist');
    }

    const queues = await this.prisma.queuePosition.findMany({
      where: {
        user,
      },
    });

    return {
      user,
      queues,
    };
  }

  async sendMessage (user: QueueUser, type: MessageType, data: IMessageData) {
    if (!user.telegramId) return;

    const text = messages[type](data);
    await AdmissionAPI.sendMessage(user.telegramId, text, 'HTML');
  }
}