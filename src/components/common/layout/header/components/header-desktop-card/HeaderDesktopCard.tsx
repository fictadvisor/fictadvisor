import React from 'react';
import mergeClassNames from 'merge-class-names';

import styles from './HeaderDesktopCard.module.scss';

type HeaderCardProps = {
  name: string;
  groupName: string;
  position: string;
  url: string;
};

export const HeaderDesktopCard: React.FC<HeaderCardProps> = ({
  name,
  groupName,
  position,
  url,
  ...rest
}) => {
  return (
    <div className={mergeClassNames(styles[`header-card-container`])} {...rest}>
      <div className={styles[`header-card-info`]}>
        <h4 className={styles[`card-name`]}>{name}</h4>
        <div>
          <span className={styles['header-card-postition']}>{position}</span>
          <span className={styles['header-card-group-name']}>{groupName}</span>
        </div>
      </div>
      <img src={url} alt="Картинка профілю" />
    </div>
  );
};
