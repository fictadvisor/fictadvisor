import { Injectable } from '@nestjs/common';
import { FileService } from '../../utils/files/FileService';
import { PersonalDataDTO, StudyContractDTO } from '../dtos/StudyContractDTO';
import { PaymentTypeParam, StudyFormParam, StudyTypeParam } from '../dtos/StudyContractParams';
import * as process from 'process';
import { EmailService } from './EmailService';
import { PriorityDTO } from '../dtos/PriorityDTO';
import { EducationalDegree, EducationProgram, PriorityState } from '@prisma/client';
import { InvalidEducationProgramsException } from '../../utils/exceptions/InvalidEducationProgramsException';
import { EntrantRepository } from '../../database/repositories/EntrantRepository';
import { NoPermissionException } from '../../utils/exceptions/NoPermissionException';
import { DataNotFoundException } from '../../utils/exceptions/DataNotFoundException';
import { ObjectIsRequiredException } from '../../utils/exceptions/ObjectIsRequiredException';

const DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

const EducationPrograms = {
  121: [EducationProgram.CSSE, EducationProgram.ISSE],
  126: [EducationProgram.IIS, EducationProgram.ISRS, EducationProgram.IMST],
};

@Injectable()
export class DocumentService {

  constructor (
    private fileService: FileService,
    private emailService: EmailService,
    private entrantRepository: EntrantRepository,
  ) {}

  private getFullString (separator: string, ...args) {
    return args.filter((a) => a).join(separator);
  }

  private formatPersonalData (data: PersonalDataDTO) {
    const passport = this.getFullString(' ', data.passportSeries, data.passportNumber);
    return {
      ...data,
      passport,
      passportData: this.getFullString(', ', data.passportDate, data.passportInstitute),
      address: this.getFullString(', ', data.region, data.settlement, data.address, data.index),
      idCode: !data.idCode ? passport : data.idCode,
      bigName: data.lastName.toUpperCase(),
    };
  }

  private async sendContract (data: StudyContractDTO, sendToEntrant: boolean) {
    const obj = {
      entrant: this.formatPersonalData(data.entrant),
      representative: data.representative?.firstName ? this.formatPersonalData(data.representative) : {},
    };

    const emails = [];
    if (sendToEntrant) emails.push(data.entrant.email);
    if (data.meta.isToAdmission) emails.push(process.env.ADMISSION_EMAIL);

    const agreementName = `${data.meta.degree}_${data.meta.speciality}_${data.meta.educationalProgram}_${data.meta.programType}_${data.meta.studyForm}_${data.meta.studyType}.docx`;
    const agreement = this.fileService.fillTemplate(agreementName, obj);

    const attachments = [{ name: `Договір | ${data.entrant.lastName} ${data.entrant.firstName} ${data.entrant.middleName}.docx`, buffer: agreement, contentType: DOCX }];

    if (data.meta.studyType === StudyTypeParam.CONTRACT) {
      const paymentName = `${data.meta.degree}_${data.meta.speciality}_${data.meta.programType}_${data.meta.studyForm}_${data.meta.paymentType}.docx`;
      const payment = this.fileService.fillTemplate(paymentName, { ...obj, customer: this.formatPersonalData(data.customer) });
      attachments.push({ name: `Оплата | ${data.entrant.lastName} ${data.entrant.firstName} ${data.entrant.middleName}.docx`, buffer: payment, contentType: DOCX });
    }

    const admissionEmail = data.meta.degree === EducationalDegree.MASTER ? 'vstup.fiot.m@gmail.com' : 'vstup.fiot@gmail.com';
    const link = data.meta.degree === EducationalDegree.MASTER ? 'https://t.me/fictmasterchat' : 'https://t.me/abit_fict';

    await this.emailService.sendWithAttachments({
      to: emails,
      subject: `Договори щодо вступу | ${data.entrant.lastName} ${data.entrant.firstName}`,
      message: `Договори НЕ ТРЕБА друкувати чи доповнювати іншою інформацією. Якщо подаєте дистанційно, завантажте документи та підпишіть КЕПом вступника та законного представника (замовника), якщо вступнику немає 18 років (деталі: https://pk.kpi.ua/originals/). Підписані КЕПом документи слід відправляти на пошту ${admissionEmail}. Якщо виникають запитання, звертайтеся в чат в телеграмі:`,
      link,
      attachments,
    });
  }

  private async sendPriority (data: PriorityDTO, sendToEntrant: boolean) {
    const priorities = {};
    for (const num in data.priorities) {
      const program = data.priorities[num];
      priorities[program] = num;
    }

    const day = data.day.padStart(2, '0');
    const priority = this.fileService.fillTemplate(`Пріоритетка_${data.specialty}.docx`, { ...data, day, ...priorities });

    const emails = [];
    if (sendToEntrant) emails.push(data.email);
    if (data.isToAdmission) emails.push(process.env.ADMISSION_EMAIL);

    await this.emailService.sendWithAttachments({
      to: emails,
      subject: `Пріоритетка | ${data.lastName} ${data.firstName}`,
      message: 'Пріоритетку НЕ ТРЕБА друкувати чи доповнювати іншою інформацією. Якщо подаєте дистанційно, завантажте документ та підпишіть КЕПом вступника. Якщо виникають запитання, звертайтеся в чат в телеграмі:',
      link: 'https://t.me/abit_fict',
      attachments: [{ name: `Пріоритетка | ${data.lastName} ${data.firstName} ${data.middleName}.docx`, buffer: priority, contentType: DOCX }],
    });
  }

  async createContract (data: StudyContractDTO) {
    if (data.meta.studyType === StudyTypeParam.CONTRACT && !data.meta.paymentType) {
      throw new ObjectIsRequiredException('Payment type');
    }

    const { firstName, middleName, lastName, ...entrant } = data.entrant;

    const dbEntrant = await this.entrantRepository.getOrCreate({
      firstName,
      middleName,
      lastName,
      specialty: data.meta.speciality,
    });

    if (dbEntrant.entrantData && !data.meta.isForcePushed) throw new NoPermissionException();

    const customer = data.customer?.firstName
      ? data.customer
      : data.representative?.firstName
        ? data.representative
        : data.entrant;

    await this.sendContract({ ...data, customer }, true);

    await this.entrantRepository.updateById(dbEntrant.id, {
      degree: data.meta.degree,
      educationalProgram: data.meta.educationalProgram,
      programType: data.meta.programType,
      studyType: data.meta.studyType,
      studyForm: data.meta.studyForm,
      paymentType: data.meta.paymentType,
      entrantData: {
        upsert: {
          update: entrant,
          create: entrant,
        },
      },
      representativeData: {
        upsert: data.representative?.firstName ? {
          update: data.representative,
          create: data.representative,
        } : undefined,
      },
      customerData: {
        upsert: data.meta.studyType === StudyTypeParam.CONTRACT ? {
          update: customer,
          create: customer,
        } : undefined,
      },
    });
  }

  async getContract (id: string) {
    const entrant = await this.entrantRepository.findById(id);
    if (!entrant?.entrantData) throw new DataNotFoundException();

    if (!entrant.studyForm || !entrant.studyType || entrant.studyType === StudyTypeParam.CONTRACT && !entrant.customerData) {
      throw new NoPermissionException();
    }

    await this.sendContract({
      meta: {
        degree: entrant.degree,
        educationalProgram: entrant.educationalProgram,
        programType: entrant.programType,
        speciality: entrant.specialty,
        studyType: entrant.studyType as StudyTypeParam,
        studyForm: entrant.studyForm as StudyFormParam,
        paymentType: entrant.paymentType as PaymentTypeParam,
        isToAdmission: true,
        isForcePushed: false,
      },
      entrant: {
        firstName: entrant.firstName,
        middleName: entrant.middleName,
        lastName: entrant.lastName,
        ...entrant.entrantData,
      },
      representative: entrant.representativeData,
      customer: entrant.customerData,
    }, false);
  }

  async getPriority (id: string) {
    const entrant = await this.entrantRepository.findById(id);
    if (!entrant?.priority) throw new DataNotFoundException();

    const priorities = {};
    entrant.priority.priorities.map(({ priority, program }) => {
      priorities[priority] = program;
    });
    
    await this.sendPriority({
      firstName: entrant.firstName,
      middleName: entrant.middleName,
      lastName: entrant.lastName,
      specialty: entrant.specialty,
      day: entrant.priority.date.split('.')[0],
      isToAdmission: true,
      priorities,
    } as PriorityDTO, false);
  }

  private validatePrograms ({ specialty, priorities, isForcePushed }: PriorityDTO) {
    const programs = Object.values(priorities);
    const expected = EducationPrograms[specialty];
    if (isForcePushed) {
      if (!programs.every((p) => expected.includes(p))) {
        throw new InvalidEducationProgramsException();
      }
    } else if (expected.length !== programs.length || !expected.every((p) => programs.includes(p))) {
      throw new InvalidEducationProgramsException();
    }
  }

  async generatePriority (data: PriorityDTO) {
    this.validatePrograms(data);
    const day = data.day.padStart(2, '0');

    const priorities = [];
    for (const priority in data.priorities) {
      priorities.push({ priority: Number(priority), program: data.priorities[priority] });
    }

    const entrant = await this.entrantRepository.getOrCreate({
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      specialty: data.specialty,
    });

    if (entrant.priority && data.isForcePushed) {
      for (const priority of priorities) {
        await this.entrantRepository.updateById(entrant.id, {
          priority: {
            update: {
              priorities: {
                update: {
                  where: {
                    entrantId_priority: {
                      entrantId: entrant.id,
                      priority: priority.priority,
                    },
                  },
                  data: {
                    program: priority.program,
                  },
                },
              },
            },
          },
        });
      }
    } else if (entrant.priority) {
      throw new NoPermissionException();
    } else {
      await this.entrantRepository.updateById(entrant.id, {
        priority: {
          create: {
            state: PriorityState.NOT_APPROVED,
            date: `${day}.08.${new Date().getFullYear()}`,
            priorities: {
              createMany: {
                data: priorities,
              },
            },
          },
        },
      });
    }

    await this.sendPriority(data, true);
  }
}