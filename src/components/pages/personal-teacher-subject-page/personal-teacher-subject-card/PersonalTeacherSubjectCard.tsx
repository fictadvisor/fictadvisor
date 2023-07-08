import { FC, useContext, useEffect, useRef, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

import Button, { ButtonVariant } from '@/components/common/ui/button';
import Rating from '@/components/common/ui/rating-mui';
import Tag from '@/components/common/ui/tag-mui';
import { TagColor, TagSize } from '@/components/common/ui/tag-mui/types';
import styles from '@/components/pages/personal-teacher-subject-page/personal-teacher-subject-card/PersonalTeacherSubjectCard.module.scss';
import { teacherSubjectContext } from '@/components/pages/personal-teacher-subject-page/PersonalTeacherSubjectPage';
import { TeacherRole, TeacherWithSubject } from '@/types/teacher';

import Contact from '../contacts/Contact';

// TODO: use destruction in props
const PersonalTeacherSubjectCard: FC<TeacherWithSubject> = props => {
  const [isContactsVisible, setContactsVisibility] = useState(false);
  const blockRef = useRef<HTMLDivElement>(null);
  const { setFloatingCardShowed } = useContext(teacherSubjectContext);

  useEffect(() => {
    const handleScroll = () => {
      const bottom = blockRef.current?.getBoundingClientRect().bottom;
      if (Number(bottom) < 0) {
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
        {props.rating !== 0 && <Rating rating={props.rating / 20} />}
      </div>
      <div className={styles['subject']}>
        <h5>{props.subject.name}</h5>
      </div>
      <div className={styles['tags']}>
        {props.roles.includes(TeacherRole.LECTURER) && (
          <Tag color={TagColor.INDIGO} size={TagSize.SMALL} text="Лекції" />
        )}

        {props.roles.includes(TeacherRole.PRACTICIAN) && (
          <Tag color={TagColor.ORANGE} size={TagSize.SMALL} text="Практики" />
        )}

        {props.roles.includes(TeacherRole.LABORANT) && (
          <Tag color={TagColor.MINT} size={TagSize.SMALL} text="Лабораторні" />
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
