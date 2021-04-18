import { Expose } from 'class-transformer';
import { SubjectSearchIndex } from '../../../database/entities/subject-search-index';
import { assign } from '../../../common/common.object';

export class SearchSubjectItemDto {
    id: string;

    link: string;

    name: string;

    @Expose({ name: 'teacher_count' })
    teacherCount: number;

    rating: number;

    public static from(i: SubjectSearchIndex): SearchSubjectItemDto {
        return assign(
            new SearchSubjectItemDto(),
            {
                id: i.id,
                link: i.link,
                name: i.name,
                teacherCount: i.teacherCount,
                rating: i.rating
            }
        )
    }
}
