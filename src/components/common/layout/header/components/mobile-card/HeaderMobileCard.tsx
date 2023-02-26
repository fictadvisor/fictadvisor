import React, { useRef, useState } from 'react';
import mergeClassNames from 'merge-class-names';

import Button, {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button/Button';
import Rating from '@/components/common/ui/rating/Rating';
import Tag, { TagColor, TagSize } from '@/components/common/ui/tag/Tag';
import Tooltip from '@/components/common/ui/tooltip/Tooltip';

import styles from './HeaderMobileCard.module.scss';

interface HeaderMobileCardProps {
  name: string;
  groupName: string;
  position: string;
  url?: string;
}

interface HeaderCardProps {
  name: string;
  groupName: string;
  position: string;
  url?: string;
}

interface LecturerHeaderCardProps {
  name: string;
  description: string;
  url?: string;
}

interface PollCardProps {
  name: string;
  description: string;
  roles: string[];
  url?: string;
}

interface RatingCardProps {
  name: string;
  rating?: number;
  roles?: string[];
  url?: string;
}

interface SimpleCardProps {
  name: string;
  details?: string;
  rating?: number;
}

const useToolTip = (
  element: HTMLParagraphElement,
  toolTipWidth: number,
): any => {
  console.dir(element);
  //to find out if the p element is truncated
  let isTruncated;

  let offsetX, offsetY, toolTipDirection;

  if (element) {
    const props = element.getBoundingClientRect();
    isTruncated = element.scrollHeight - 1 > props.height;
    offsetY = window.scrollY + props.top;

    if (props.right + toolTipWidth > window.innerWidth) {
      //tooltip is over the screen

      offsetX = { left: props.left - toolTipWidth };
      toolTipDirection = 'right';
    } else {
      //tooltip is within the screen

      // console.log("here");
      offsetX = { left: props.right };
      toolTipDirection = 'left';
    }
  }
  return { offsetX, isTruncated, offsetY, toolTipDirection };
};

export const HeaderMobileCard: React.FC<HeaderMobileCardProps> = ({
  name,
  groupName,
  position,
  url = '/assets/icons/frog36.png',
}) => {
  return (
    <div className={mergeClassNames(styles[`header-card-container`])}>
      <div className={styles[`header-card-info`]}>
        <img src={url} alt="Картинка профілю" />
        <div style={{ marginLeft: '8px' }}>
          <h4 className={styles[`card-name`]}>{name}</h4>
          <div style={{ marginTop: '8px', gap: '8px' }}>
            <span className={styles['header-card-group-name']}>
              {groupName}
            </span>
            <span className={styles['header-card-postition']}>{position}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export const LecturerHeaderCard: React.FC<LecturerHeaderCardProps> = ({
  name,
  description,
  url = '/assets/icons/lecturer60.png',
}) => {
  const [showToolTip, setShowToolTip] = useState<boolean>(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const { offsetX, offsetY, isTruncated, toolTipDirection } = useToolTip(
    ref.current,
    300,
  );

  return (
    <div
      className={mergeClassNames(
        styles['card'],
        styles['header-lecturer-card-container'],
      )}
    >
      <img src={url} alt="картинка викладача" />
      <div className={styles['header-lecturer-card-info']}>
        <h4 className={styles['card-name']}>{name}</h4>
        <p
          ref={ref}
          className={styles['lecturer-description']}
          onMouseEnter={() => setShowToolTip(true)}
          onMouseLeave={() => setShowToolTip(false)}
        >
          {description}

          {showToolTip && isTruncated && (
            <Tooltip
              text={description}
              style={{
                position: 'absolute',
                ...offsetX,
                width: '300px',
                fontSize: '11px',
                top: offsetY,
              }}
              direction={toolTipDirection}
            />
          )}
        </p>
      </div>
    </div>
  );
};

export const PollCard: React.FC<PollCardProps> = ({
  name,
  description,
  roles,
  url = '/assets/icons/lecturer60.png',
}) => {
  const [showToolTip, setShowToolTip] = useState<boolean>(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const { offsetX, offsetY, isTruncated, toolTipDirection } = useToolTip(
    ref.current,
    300,
  );

  return (
    <article
      className={mergeClassNames(
        styles['card'],
        styles['card-effect'],
        styles['poll-card-container'],
      )}
    >
      <img className={styles['card-avatar']} src={url} alt="викладач" />
      <br />
      <CardRoles roles={roles} />
      <h4 className={styles['card-name']}>{name}</h4>
      <p
        ref={ref}
        className={styles['lecturer-description']}
        onMouseEnter={() => setShowToolTip(true)}
        onMouseLeave={() => setShowToolTip(false)}
      >
        {description}
        {showToolTip && isTruncated && (
          <Tooltip
            text={description}
            direction={toolTipDirection}
            style={{
              position: 'absolute',
              ...offsetX,
              width: '300px',
              fontSize: '11px',
              top: offsetY,
            }}
          />
        )}
      </p>

      <Button
        variant={ButtonVariant.OUTLINE}
        color={ButtonColor.PRIMARY}
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
}) => {
  return (
    <article
      className={mergeClassNames(
        styles['card'],
        styles['card-effect'],
        styles['rating-card-container'],
      )}
    >
      <img className={styles['card-avatar']} src={url} alt="викладач" />

      {rating && <Rating rating={rating} />}
      {!rating && <br />}
      {roles && <CardRoles roles={roles} />}
      <h4 className={styles['card-name']}>{name}</h4>
    </article>
  );
};

export const SimpleCard: React.FC<SimpleCardProps> = ({
  name,
  details,
  rating,
}) => {
  const [showToolTip, setShowToolTip] = useState<boolean>(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const { offsetX, offsetY, isTruncated, toolTipDirection } = useToolTip(
    ref.current,
    300,
  );

  return (
    <article
      className={mergeClassNames(
        styles['card'],
        styles['card-effect'],
        styles['simple-card-container'],
      )}
    >
      <p
        ref={ref}
        className={mergeClassNames(
          styles['card-name '],
          styles['simple-card-name'],
        )}
        onMouseEnter={() => setShowToolTip(true)}
        onMouseLeave={() => setShowToolTip(false)}
      >
        {name}
        {showToolTip && isTruncated && (
          <Tooltip
            text={name}
            direction={toolTipDirection}
            style={{
              position: 'absolute',
              ...offsetX,
              width: '300px',
              fontSize: '11px',
              top: offsetY,
            }}
          />
        )}
      </p>

      {details && <p>{details}</p>}
      {rating && (
        <Rating rating={rating} style={{ justifyContent: 'flex-start' }} />
      )}
    </article>
  );
};

const CardRoles: React.FC<{ roles: string[] }> = ({ roles }) => {
  return (
    <div className={styles['card-roles']}>
      {roles.map(role => {
        switch (role) {
          case 'лаборант':
            return (
              <Tag
                color={TagColor.MINT}
                size={TagSize.SMALL}
                text="Лаборант"
                key={Math.random()}
              />
            );
          case 'лектор':
            return (
              <Tag
                color={TagColor.VIOLET}
                size={TagSize.SMALL}
                text="Лектор"
                key={Math.random()}
              />
            );
          case 'практик':
            return (
              <Tag
                color={TagColor.ORANGE}
                size={TagSize.SMALL}
                text="Практик"
                key={Math.random()}
              />
            );
        }
      })}
    </div>
  );
};
