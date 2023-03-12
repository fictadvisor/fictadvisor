import React from 'react';
import mergeClassNames from 'merge-class-names';

import styles from './HeaderMobileCard.module.scss';

interface HeaderMobileCardProps {
  name: string;
  groupName: string;
  position: string;
  url?: string;
}

export const HeaderMobileCard: React.FC<HeaderMobileCardProps> = ({
  name,
  groupName,
  position,
  url,
}) => {
  return (
    <div className={mergeClassNames(styles[`header-card-container`])}>
      <div className={styles[`header-card-info`]}>
        <img
          src={url}
          alt="Картинка профілю"
          style={{ borderRadius: '100%' }}
        />
        <div style={{ marginLeft: '8px' }}>
          <h4 className={styles[`card-name`]}>{name}</h4>
          <div style={{ marginTop: '8px', gap: '8px' }}>
            {groupName && (
              <span className={styles['header-card-group-name']}>
                {groupName}
              </span>
            )}
            <span className={styles['header-card-postition']}>{position}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
