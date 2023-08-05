import { Injectable } from '@nestjs/common';
import { FileService } from '../../utils/files/FileService';
import { PersonalDataDTO, StudyContractDTO } from '../dtos/StudyContractDTO';
import { PaymentTypeParam, StudyFormParam, StudyTypeParam } from '../dtos/StudyContractParams';
import { ObjectIsRequiredException } from '../../utils/exceptions/ObjectIsRequiredException';
import * as process from 'process';
import { EmailService } from './EmailService';
import { PriorityDTO } from '../dtos/PriorityDTO';
import { EducationProgram, PriorityState } from '@prisma/client';
import { InvalidEducationProgramsException } from '../../utils/exceptions/InvalidEducationProgramsException';
import { EntrantRepository } from '../../database/repositories/EntrantRepository';
import { NoPermissionException } from '../../utils/exceptions/NoPermissionException';
import { FullNameDTO } from '../dtos/FullNameDTO';
import { DataNotFoundException } from '../../utils/exceptions/DataNotFoundException';
import { DbEntrant } from '../../database/entities/DbEntrant';

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

  private async sendContract (data: StudyContractDTO) {
    const obj = {
      entrant: this.formatPersonalData(data.entrant),
      representative: data.representative?.firstName ? this.formatPersonalData(data.representative) : {},
    };

    const emails = [data.entrant.email];
    if (data.meta.isToAdmission) emails.push(process.env.ADMISSION_EMAIL);

    const agreementName = `${data.meta.speciality}_${data.meta.studyType}_${data.meta.studyForm}.docx`;
    const agreement = this.fileService.fillTemplate(agreementName, obj);

    const attachments = [{ name: 'Договір про навчання.docx', buffer: agreement, contentType: DOCX }];

    if (data.meta.studyType === StudyTypeParam.CONTRACT) {
      const paymentName = `${data.meta.speciality}_${data.meta.paymentType}_${data.meta.studyForm}.docx`;
      const payment = this.fileService.fillTemplate(paymentName, obj);
      attachments.push({ name: 'Договір про надання платної освітньої послуги.docx', buffer: payment, contentType: DOCX });
    }

    await this.emailService.sendWithAttachments({
      to: emails,
      subject: `Договори щодо вступу | ${data.entrant.lastName} ${data.entrant.firstName}`,
      message: 'Документи вкладені у цей лист.',
      attachments,
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

    await this.entrantRepository.updateById(dbEntrant.id, {
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
        upsert: data.representative.firstName ? {
          update: data.representative,
          create: data.representative,
        } : undefined,
      },
    });

    await this.sendContract(data);
  }

  async generateContract (data: FullNameDTO) {
    const entrant = await this.entrantRepository.find(data);
    if (!entrant?.entrantData) throw new DataNotFoundException();

    if (!entrant.studyForm || !entrant.studyType) throw new NoPermissionException();

    await this.sendContract({
      meta: {
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
    });
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

    let priorities = [];
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
      priorities = (await this.entrantRepository.findById(entrant.id) as DbEntrant).priority.priorities.map((p) => ({
        priority: p.priority,
        program: p.program,
      }));
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
    const obj = {};
    priorities.map(({ priority, program }) => obj[program] = priority);

    const priority = this.fileService.fillTemplate(`Пріоритетка_${data.specialty}.docx`, { ...data, day, ...obj });

    const emails = [data.email];
    if (data.isToAdmission) emails.push(process.env.ADMISSION_EMAIL);

    await this.emailService.sendWithAttachments({
      to: emails,
      subject: `Пріоритетка | ${data.lastName} ${data.firstName}`,
      message: 'Документ вкладений у цей лист.',
      attachments: [{ name: 'Пріоритетка.docx', buffer: priority, contentType: DOCX }],
    });
  }
}