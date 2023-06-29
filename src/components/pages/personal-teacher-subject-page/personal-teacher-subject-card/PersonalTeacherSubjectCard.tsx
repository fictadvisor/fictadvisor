import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

import Button, { ButtonVariant } from '@/components/common/ui/button';
import Rating from '@/components/common/ui/rating-mui';
import Tag from '@/components/common/ui/tag-mui';
import styles from '@/components/pages/personal-teacher-subject-page/personal-teacher-subject-card/PersonalTeacherSubjectCard.module.scss';
import { TeacherSubjectContext } from '@/components/pages/personal-teacher-subject-page/PersonalTeacherSubjectPage';
import { TeacherRoles } from '@/lib/api/teacher/dto/GetTeacherDTO';
import { GetTeacherSubjectDTO } from '@/lib/api/teacher/dto/GetTeacherSubjectDTO';

import Contact from '../contacts/Contact';

export type PersonalTeacherSubjectCardProps = GetTeacherSubjectDTO;

const PersonalTeacherSubjectCard: FC<
  PersonalTeacherSubjectCardProps
> = props => {
  const [isContactsVisible, setContactsVisibility] = useState(false);
  const blockRef = useRef(null);
  const { setFloatingCardShowed } = useContext(TeacherSubjectContext);
  useEffect(() => {
    const handleScroll = () => {
      const bottom = blockRef.current?.getBoundingClientRect().bottom;
      if (bottom < 0) {
        setFloatingCardShowed(true);
      } else {
        setFloatingCardShowed(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div ref={blockRef} className={styles['card']}>
      <div className={styles['photo']}>
        <img src={props.avatar} className={styles['image']} alt="photo" />
      </div>
      <div className={styles['name-and-rating']}>
        <h4>
          {props.lastName + ' ' + props.firstName + ' ' + props.middleName}
        </h4>
        {props.rating != 0 && <Rating rating={props.rating / 20} />}
      </div>
      <div className={styles['subject']}>
        <h5>{props.subject.name}</h5>
      </div>
      <div className={styles['tags']}>
        {props.roles.includes(TeacherRoles.LECTURER) && (
          <Tag color="indigo" size="small" text="Лекції" />
        )}

        {props.roles.includes(TeacherRoles.PRACTICIAN) && (
          <Tag color="orange" size="small" text="Практики" />
        )}

        {props.roles.includes(TeacherRoles.LABORANT) && (
          <Tag color="mint" size="small" text="Лабораторні" />
        )}
      </div>

      {props.contacts.length > 0 && (
        <>
          <Button
            className={styles['contacts-button']}
            text={'Контакти'}
            endIcon={
              isContactsVisible ? <ChevronUpIcon /> : <ChevronDownIcon />
            }
            variant={ButtonVariant.TEXT}
            onClick={() => setContactsVisibility(!isContactsVisible)}
          />

          <div
            className={
              styles[`contacts-${isContactsVisible ? `shown` : `hidden`}`]
            }
          >
            {props.contacts.map((contact, index) => (
              <div key={index} className={styles['contacts-item']}>
                <Contact
                  name={contact.name}
                  displayName={contact.displayName}
                  link={contact.link}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
export default PersonalTeacherSubjectCard;
