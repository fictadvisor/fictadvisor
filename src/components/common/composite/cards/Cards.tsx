import React, { useRef, useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import mergeClassNames from 'merge-class-names';

import styles from '@/components/common/composite/cards/Cards.module.scss';
import Button, {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button';
import Rating from '@/components/common/ui/rating';
import Tag, {
  TagColor,
  TagSize,
  TagVariant,
} from '@/components/common/ui/tag/Tag';
import Tooltip from '@/components/common/ui/tooltip';

export type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

type LecturerPollCardProps = {
  name: string;
  description: string;
  roles?: string[];
  avatar?: string;
  disabled?: boolean;
} & DivProps;

type RatingCardProps = {
  name: string;
  rating?: number;
  roles?: string[];
  avatar?: string;
  disabled?: boolean;
} & DivProps;

type SimpleCardProps = {
  name: string;
  details?: string;
  rating?: number;
  disabled?: boolean;
} & DivProps;

export const LecturerPollCard: React.FC<LecturerPollCardProps> = ({
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
        disabled && styles['card-disabled'],
        styles['card'],
        styles['card-effect'],
        styles['lecturer-poll-card-container'],
      )}
      {...rest}
    >
      <img className={styles['card-avatar']} src={avatar} alt="викладач" />
      <br />
      <CardRoles roles={roles} disabled={disabled} />
      <h4 className={styles['card-name']}>{name}</h4>
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
          className={styles['lecturer-description']}
        >
          {description}
        </div>
      </Tooltip>

      <Button
        color={disabled ? ButtonColor.SECONDARY : ButtonColor.PRIMARY}
        variant={ButtonVariant.OUTLINE}
        size={ButtonSize.SMALL}
        text={'Пройти опитування'}
      ></Button>
    </article>
  );
};

export const RatingCard: React.FC<RatingCardProps> = ({
  rating,
  name,
  roles,
  avatar,
  disabled,
  ...rest
}) => {
  return (
    <article
      className={mergeClassNames(
        styles['card'],
        styles['card-effect'],
        styles['rating-card-container'],
        disabled && styles['card-disabled'],
      )}
      {...rest}
    >
      <img className={styles['card-avatar']} src={avatar} alt="викладач" />
      {rating && (
        <div className={styles['mobile-rating']}>
          {rating}
          <StarIcon color="#FCD34D" width={24} height={24} />
        </div>
      )}
      {rating && (
        <Rating rating={rating} className={styles['desktop-rating']} />
      )}
      {!rating && <br />}
      {roles && <CardRoles roles={roles} disabled={disabled} />}
      <h4 className={styles['card-name']}>{name}</h4>
    </article>
  );
};

export const SimpleCard: React.FC<SimpleCardProps> = ({
  name,
  details,
  rating,
  disabled,
  ...rest
}) => {
  return (
    <article
      className={mergeClassNames(
        disabled && styles['card-disabled'],
        styles['card'],
        styles['card-effect'],
        styles['simple-card-container'],
      )}
      {...rest}
    >
      <div
        className={mergeClassNames(
          styles['card-name'],
          styles['simple-card-name'],
        )}
      >
        {name}
      </div>
      {details && <p>{details}</p>}
      {rating && (
        <Rating rating={rating} style={{ justifyContent: 'flex-start' }} />
      )}
    </article>
  );
};

const CardRoles: React.FC<{ roles: string[]; disabled?: boolean }> = ({
  roles,
  disabled = false,
}) => {
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
