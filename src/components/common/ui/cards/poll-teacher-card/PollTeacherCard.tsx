import { FC, Fragment, useRef, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import mergeClassNames from 'merge-class-names';
import Image from 'next/image';
import Link from 'next/link';

import Button, {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button';
import { CardRoles } from '@/components/common/ui/cards/card-roles';
import styles from '@/components/common/ui/cards/poll-teacher-card/PollTeacherCard.module.scss';
import { DivProps } from '@/components/common/ui/cards/types';
import IconButton from '@/components/common/ui/icon-button-mui';
import Tooltip from '@/components/common/ui/tooltip';
import { TeacherRoles } from '@/lib/api/teacher/dto/GetTeacherDTO';
import { TeacherAPI } from '@/lib/api/teacher/TeacherAPI';

import * as sxStyles from './pollTeachaerCard.styles';
import { SkipTeacherPopup } from './SkipTeacherPopup';

type PollTeacherCardProps = {
  id: string;
  name: string;
  description: string;
  roles?: TeacherRoles[];
  avatar?: string;
  disabled?: boolean;
  href?: string;
} & DivProps;

export const PollTeacherCard: FC<PollTeacherCardProps> = ({
  id,
  name,
  description,
  roles,
  avatar,
  disabled,
  href,
  ...rest
}) => {
  const [DisplayComponent, setDisplayComponent] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement | null>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  const handlerTeacherRemove = async () => {
    try {
      await TeacherAPI.removeTeacher(id);
      setDisplayComponent(false);
      setOpen(false);
    } catch (er: unknown) {}
  };
  const onMouseOverHandler = () => {
    const elem = divRef.current;
    setIsTruncated(elem.scrollHeight - 1 > elem.getBoundingClientRect().height);
  };

  if (DisplayComponent)
    return (
      <article
        className={mergeClassNames(
          styles['poll-teacher-card'],
          styles['poll-teacher-card-effect'],
          disabled && styles['card-disabled'],
        )}
        {...rest}
      >
        <IconButton
          icon={<XMarkIcon />}
          color="transparent"
          sx={sxStyles.buttonIcon}
          onClick={() => setOpen(true)}
        />
        <div className={styles['poll-teacher-card-shift']}>
          <Image
            width={64}
            height={64}
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
          {open && (
            <SkipTeacherPopup
              setOpen={setOpen}
              onTeacherSkip={handlerTeacherRemove}
            />
          )}
        </div>
      </article>
    );

  return <Fragment></Fragment>;
};
