import { SearchSubjectItemDto } from './search-subject-item.dto';
import { SearchTeacherItemDto } from './search-teacher-item.dto';
import { assign } from '../../../common/common.object';

export class SearchResultDto {
    subjects: SearchSubjectItemDto[];
    teachers: SearchTeacherItemDto[];

    public static from(
        subjects: SearchSubjectItemDto[],
        teachers: SearchTeacherItemDto[]
    ): SearchResultDto {
        return assign(
            new SearchResultDto(),
            {
                subjects,
                teachers
            }
        )
    }
}
