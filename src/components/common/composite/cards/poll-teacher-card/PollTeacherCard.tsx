import React, { useRef, useState } from 'react';
import mergeClassNames from 'merge-class-names';
import Link from 'next/link';

import { CardRoles } from '@/components/common/composite/cards/card-roles';
import { DivProps } from '@/components/common/composite/cards/Cards';
import styles from '@/components/common/composite/cards/poll-teacher-card/PollTeacherCard.module.scss';
import Button, {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button';
import Tooltip from '@/components/common/ui/tooltip';
import { TeacherRoles } from '@/lib/api/teacher/dto/GetTeacherDTO';

type PollTeacherCardProps = {
  name: string;
  description: string;
  roles?: TeacherRoles[];
  avatar?: string;
  disabled?: boolean;
  href?: string;
} & DivProps;

export const PollTeacherCard: React.FC<PollTeacherCardProps> = ({
  name,
  description,
  roles,
  avatar,
  disabled,
  href,
  ...rest
}) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  const onMouseOverHandler = () => {
    const elem = divRef.current;
    setIsTruncated(elem.scrollHeight - 1 > elem.getBoundingClientRect().height);
  };

  return (
    <article
      className={mergeClassNames(
        styles['poll-teacher-card'],
        styles['poll-teacher-card-effect'],
        disabled && styles['card-disabled'],
      )}
      {...rest}
    >
      <div className={styles['poll-teacher-card-shift']}>
        <img
          className={styles['poll-teacher-card-avatar']}
          src={avatar}
          alt="викладач"
        />

        <CardRoles
          roles={roles}
          className={styles['poll-teacher-card-roles']}
        />
        <div className={styles['poll-teacher-card-info']}>
          <h4 className={styles['poll-teacher-name']}>{name}</h4>
          <Tooltip
            display={isTruncated}
            text={description}
            style={{
              width: '300px',
              fontSize: '11px',
            }}
          >
            <div
              onMouseOver={onMouseOverHandler}
              ref={divRef}
              className={styles['poll-subject-name']}
            >
              {description}
            </div>
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
      </div>
    </article>
  );
};
