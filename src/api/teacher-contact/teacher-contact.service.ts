import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Page, Pageable, Searchable, SortableProcessor } from 'src/common/common.api';
import { SearchableQueryDto } from 'src/common/common.dto';
import { ServiceException } from 'src/common/common.exception';
import { TeacherContactView } from 'src/database/entities/teacher-contact-view.entity';
import { Repository } from 'typeorm';
import { TeacherContactDto } from './dto/teacher-contact.dto';

@Injectable()
export class TeacherContactService {
	constructor(
        @InjectRepository(TeacherContactView)
        private teacherContactViewRepository: Repository<TeacherContactView>
    ) {}

    async getTeacherContacts(link: string): Promise<{'items': Array<TeacherContactDto>}> {
        const items = await this.teacherContactViewRepository.find({ link });

        return ({
            'items': items.map(tcv => TeacherContactDto.from(tcv))
        });
    }
}