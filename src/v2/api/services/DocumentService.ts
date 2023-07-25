import { Injectable } from '@nestjs/common';
import { FileService } from '../../utils/files/FileService';
import { PersonalDataDTO, StudyContractDTO } from '../dtos/StudyContractDTO';
import { StudyTypeParam } from '../dtos/StudyContractParams';
import { ObjectIsRequiredException } from '../../utils/exceptions/ObjectIsRequiredException';
import * as process from 'process';
import { EmailService } from './EmailService';

const DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

@Injectable()
export class DocumentService {

  constructor (
    private fileService: FileService,
    private emailService: EmailService,
  ) {}

  private getFullString (...args) {
    return args.filter((a) => a).join(', ');
  }

  private formatPersonalData (data: PersonalDataDTO) {
    return {
      ...data,
      passportData: this.getFullString(data.passportNumber, data.passportInstitute, data.passportDate),
      settlement: this.getFullString(data.region, data.settlement),
      address: this.getFullString(data.address, data.index),
      bigName: data.lastName.toUpperCase(),
    };
  }

  generateStudyContract (data: StudyContractDTO) {
    if (data.meta.studyType === StudyTypeParam.CONTRACT && !data.meta.paymentType) {
      throw new ObjectIsRequiredException('Payment type');
    }

    const obj = {
      entrant: this.formatPersonalData(data.entrant),
      representative: data.representative.firstName ? this.formatPersonalData(data.representative) : {},
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

    this.emailService.sendWithAttachments({
      to: emails,
      subject: `Договори щодо вступу | ${data.entrant.lastName} ${data.entrant.firstName}`,
      message: 'Документи вкладені у цей лист.',
      attachments,
    });
  }
}