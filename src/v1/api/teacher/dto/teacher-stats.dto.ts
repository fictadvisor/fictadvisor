import { StatEntry } from '../../../database/entities/stat-entry.entity';
import { assign } from '../../../common/common.object';

export class TeacherStatsItemDto {
  name: string;
  value: number;

  public static from(e: StatEntry): TeacherStatsItemDto {
    return assign(new TeacherStatsItemDto(), {
      name: e.name,
      value: e.value,
    });
  }
}
