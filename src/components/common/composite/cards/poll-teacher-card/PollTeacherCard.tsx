import React, { useRef, useState } from 'react';
import mergeClassNames from 'merge-class-names';

import { DivProps } from '@/components/common/composite/cards/Cards';
import styles from '@/components/common/composite/cards/poll-teacher-card/PollTeacherCard.module.scss';
import Button, {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button';
import Tooltip from '@/components/common/ui/tooltip';
import Tag, { TagColor, TagSize, TagVariant } from '@/components/common/ui/tag';

type PollTeacherCardProps = {
  name: string;
  description: string;
  roles?: string[];
  avatar?: string;
  disabled?: boolean;
} & DivProps;

export const PollTeacherCard: React.FC<PollTeacherCardProps> = ({
  name,
  description,
  roles,
  avatar,
  disabled,
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

        <CardRoles roles={roles} disabled={disabled} />
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

        <Button
          color={disabled ? ButtonColor.SECONDARY : ButtonColor.PRIMARY}
          variant={ButtonVariant.OUTLINE}
          size={ButtonSize.SMALL}
          text={'Пройти опитування'}
        ></Button>
      </div>
    </article>
  );
};

const CardRoles: React.FC<{ roles: string[]; disabled?: boolean }> = ({ roles,
                                                                               disabled = false,}) => {
  return (
    <div className={styles['card-roles']}>
      {roles.map(role => {
        switch (role) {
          case 'LABORANT':
            return (
              <Tag
                size={TagSize.SMALL}
                text="Лаборант"
                variant={disabled ? TagVariant.OUTLINE : TagVariant.FILLED}
                color={disabled ? TagColor.GRAY : TagColor.MINT}
                key={Math.random()}
              />
            );
          case 'LECTURER':
            return (
              <Tag
                size={TagSize.SMALL}
                text="Лектор"
                variant={disabled ? TagVariant.OUTLINE : TagVariant.FILLED}
                color={disabled ? TagColor.GRAY : TagColor.VIOLET}
                key={Math.random()}
              />
            );
          case 'PRACTICIAN':
            return (
              <Tag
                size={TagSize.SMALL}
                text="Практик"
                variant={disabled ? TagVariant.OUTLINE : TagVariant.FILLED}
                color={disabled ? TagColor.GRAY : TagColor.ORANGE}
                key={Math.random()}
              />
            );
        }
      })}
    </div>
  );
};

