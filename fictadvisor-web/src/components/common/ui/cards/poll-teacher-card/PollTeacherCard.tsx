import { FC, useState } from 'react';
import { DisciplineTypeEnum } from '@fictadvisor/utils/enums';
import { CathedraResponse } from '@fictadvisor/utils/responses';
import { XMarkIcon } from '@heroicons/react/24/outline';
import cn from 'classnames';
import Link from 'next/link';

import Button from '@/components/common/ui/button';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import styles from '@/components/common/ui/cards/poll-teacher-card/PollTeacherCard.module.scss';
import { DivProps } from '@/components/common/ui/cards/types';
import IconButton from '@/components/common/ui/icon-button-mui';
import Tooltip from '@/components/common/ui/tooltip';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';

import { IconButtonColor } from '../../icon-button-mui/types';
import { CardDisciplineTypes } from '../card-discipline-types/CardDisciplineTypes';

import * as sxStyles from './pollTeachaerCard.styles';
import { SkipTeacherPopup } from './SkipTeacherPopup';

type PollTeacherCardProps = {
  id: string;
  name: string;
  description: string;
  disciplineTypes?: DisciplineTypeEnum[];
  avatar?: string;
  disabled?: boolean;
  href?: string;
  cathedras: CathedraResponse[];
} & DivProps;

export const PollTeacherCard: FC<PollTeacherCardProps> = ({
  id,
  name,
  description,
  disciplineTypes = [],
  avatar,
  disabled,
  cathedras,
  href = '/',
  ...rest
}) => {
  const [DisplayComponent, setDisplayComponent] = useState(true);
  const [open, setOpen] = useState(false);

  const handlerTeacherRemove = async () => {
    try {
      await TeacherAPI.removeFromPoll(id);
      setDisplayComponent(false);
      setOpen(false);
    } catch (er: unknown) {}
  };

  return (
    <>
      {DisplayComponent && (
        <article
          className={cn(
            styles['poll-teacher-card'],
            styles['poll-teacher-card-effect'],
            { [styles['card-disabled']]: disabled },
          )}
          {...rest}
        >
          <IconButton
            icon={<XMarkIcon />}
            color={IconButtonColor.TRANSPARENT}
            sx={sxStyles.buttonIcon}
            onClick={() => setOpen(true)}
          />
          <div className={styles['poll-teacher-card-shift']}>
            <img
              className={styles['poll-teacher-card-avatar']}
              src={avatar}
              alt="викладач"
            />
            <CardDisciplineTypes
              disciplineTypes={disciplineTypes}
              className={styles['poll-teacher-card-roles']}
              cathedras={cathedras}
            />
            <div className={styles['poll-teacher-card-info']}>
              <h4 className={styles['poll-teacher-name']}>{name}</h4>
              <Tooltip title={description} arrow={true} placement="right">
                <div className={styles['poll-subject-name']}>{description}</div>
              </Tooltip>
            </div>

            <Link href={href}>
              <Button
                color={disabled ? ButtonColor.SECONDARY : ButtonColor.PRIMARY}
                variant={ButtonVariant.OUTLINE}
                size={ButtonSize.SMALL}
                text={'Пройти опитування'}
              ></Button>
            </Link>
            {open && (
              <SkipTeacherPopup
                setOpen={setOpen}
                onTeacherSkip={handlerTeacherRemove}
              />
            )}
          </div>
        </article>
      )}
    </>
  );
};
