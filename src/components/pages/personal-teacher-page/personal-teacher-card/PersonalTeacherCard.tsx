import React from 'react';

import Rating from '@/components/common/ui/rating';
import Tag, { TagColor, TagSize } from '@/components/common/ui/tag';
import styles from '@/components/pages/personal-teacher-page/personal-teacher-card/PersonalTeacherCard.module.scss';

export enum TeacherRoles {
  LECTURER = 'LECTURER',
  LABORANT = 'LABORANT',
  PRACTICIAN = 'PRACTICIAN',
}
export interface Contact {
  link: string;
  id: string;
  name: string;
  displayName: string;
}

export interface PersonalTeacherCardProps {
  imageSrc?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  rating: number;
  description: string;
  roles: ('LECTURER' | 'LABORANT' | 'PRACTICIAN')[];
  contacts: Contact[];
}

const PersonalTeacherCard: React.FC<PersonalTeacherCardProps> = props => {
  console.log(props.roles);
  return (
    <div className={styles['card']}>
      <div className={styles['info']}>
        <div className={styles['photo']}>
          <img
            src={props.imageSrc}
            className={styles['image']}
            alt={'photo'}
          ></img>
        </div>
        <div className={styles['name-and-rating']}>
          <h4>
            {props.lastName + ' ' + props.firstName + ' ' + props.middleName}
          </h4>
          <div className={styles['rating']}>
            <Rating rating={props.rating} />
          </div>
        </div>
        <div className={styles['tags-and-info']}>
          <div className={styles['tags']}>
            <div>
              {props.roles.includes('LECTURER') && (
                <Tag
                  color={TagColor.VIOLET}
                  size={TagSize.SMALL}
                  text={'Лектор'}
                />
              )}
            </div>
            <div>
              {props.roles.includes('PRACTICIAN') && (
                <Tag
                  color={TagColor.ORANGE}
                  size={TagSize.SMALL}
                  text={'Практик'}
                />
              )}
            </div>
            <div>
              {props.roles.includes('LABORANT') && (
                <Tag
                  color={TagColor.MINT}
                  size={TagSize.SMALL}
                  text={'Лаборант'}
                />
              )}
            </div>
          </div>
          <h6>{props.description}. </h6>
        </div>
      </div>
      <div className={styles['contacts']}>
        <div>контакт 1</div>
        <div>контакт 2</div>
      </div>
    </div>
  );
};
export default PersonalTeacherCard;
