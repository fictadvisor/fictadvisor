import { AutoMap } from '@automapper/classes';

export class DbPageText {
  @AutoMap()
    key: string;

  @AutoMap()
    value: string;

  @AutoMap()
    link: string | null;

  @AutoMap()
    isShown: boolean;
}
