import React, { useRef, useState } from 'react';
import mergeClassNames from 'merge-class-names';

import styles from '@/components/common/composite/cards/Cards.module.scss';
import Button, { ButtonSize, ButtonType } from '@/components/common/ui/button';
import Rating from '@/components/common/ui/rating';
import Tag, { TagState } from '@/components/common/ui/tag';
import Tooltip from '@/components/common/ui/tooltip';

export type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

type LecturerPollCardProps = {
  name: string;
  description: string;
  roles: string[];
  url?: string;
  disabled?: boolean;
} & DivProps;

type RatingCardProps = {
  name: string;
  rating?: number;
  roles?: string[];
  url?: string;
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
  url = '/assets/icons/lecturer60.png',
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
      <img className={styles['card-avatar']} src={url} alt="викладач" />
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
        type={disabled ? ButtonType.SECONDARY_GRAY : ButtonType.SECONDARY_RED}
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
  url = '/assets/icons/lecturer60.png',
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
      <img className={styles['card-avatar']} src={url} alt="викладач" />

      {rating && <Rating rating={rating} />}
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
}) => {
  return (
    <article
      className={mergeClassNames(
        disabled && styles['card-disabled'],
        styles['card'],
        styles['card-effect'],
        styles['simple-card-container'],
      )}
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
          case 'лаборант':
            return (
              <Tag
                state={TagState.SMALL}
                text="Лаборант"
                className={disabled ? 'gray-third' : 'mint-first'}
                key={Math.random()}
              />
            );
          case 'лектор':
            return (
              <Tag
                state={TagState.SMALL}
                text="Лектор"
                className={disabled ? 'gray-third' : 'violet-first'}
                key={Math.random()}
              />
            );
          case 'практик':
            return (
              <Tag
                state={TagState.SMALL}
                text="Практик"
                className={disabled ? 'gray-third' : 'orange-first'}
                key={Math.random()}
              />
            );
        }
      })}
    </div>
  );
};
