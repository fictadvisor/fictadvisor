import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

import Button, { ButtonVariant } from '@/components/common/ui/button';
import Rating from '@/components/common/ui/rating';
import Tag, { TagColor, TagSize } from '@/components/common/ui/tag';
import styles from '@/components/pages/personal-teacher-page/personal-teacher-card/PersonalTeacherCard.module.scss';
import { GetTeacherDTO } from '@/lib/api/teacher/dto/GetTeacherDTO';

import Contact, { ContactSize } from '../contacts/Contact';
//
// export enum TeacherRoles {
//   LECTURER = 'LECTURER',
//   LABORANT = 'LABORANT',
//   PRACTICIAN = 'PRACTICIAN',
// }
// export interface Contact {
//   link: string;
//   id: string;
//   name: string;
//   displayName: string;
// }
//
// export interface PersonalTeacherCardProps {
//   imageSrc?: string;
//   firstName: string;
//   middleName?: string;
//   lastName: string;
//   rating: number;
//   description: string;
//   roles: ('LECTURER' | 'LABORANT' | 'PRACTICIAN')[];
//   contacts: Contact[];
// }
export type PersonalTeacherCardProps = GetTeacherDTO;

const PersonalTeacherCard: React.FC<PersonalTeacherCardProps> = props => {
  const [isContactsVisible, setContactsVisibility] = useState(false);
  return (
    <div className={styles['card']}>
      <div className={styles['photo']}>
        <img src={props.avatar} className={styles['image']} alt={'photo'}></img>
      </div>
      <div className={styles['name-and-rating']}>
        <h4>
          {props.lastName + ' ' + props.firstName + ' ' + props.middleName}
        </h4>
        <div className={styles['rating']}>
          <Rating rating={3} />
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

      <Button
        className={styles['contacts-button']}
        text={'Контакти'}
        endIcon={isContactsVisible ? <ChevronUpIcon /> : <ChevronDownIcon />}
        variant={ButtonVariant.TEXT}
        onClick={() => setContactsVisibility(!isContactsVisible)}
      />

      <div
        className={styles[`contacts-${isContactsVisible ? `shown` : `hidden`}`]}
      >
        {props.contacts.map((contact, index) => (
          <Contact
            key={index}
            name={contact.name}
            displayName={contact.displayName}
            link={'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
            size={ContactSize.SMALL}
          />
        ))}
      </div>
    </div>
  );
};
export default PersonalTeacherCard;
