import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Button from '@/components/common/ui/button/Button';
import { ButtonVariant } from '@/components/common/ui/button-mui/types';

import styles from './AnswersSaved.module.scss';

const AnswersSaved = () => {
  const router = useRouter();

  return (
    <div className={styles.savedWrapper}>
      <div className={styles.content}>
        <Image src="/gifs/frogging.gif" alt="frog" width={90} height={90} />
        <h1>Дякуємо за відповіді!</h1>
        <b>
          Ваші відповіді допоможуть покращити якість навчання на нашому
          факультеті. Також Ви можете оцінити інших викладачів.
        </b>
        <div className={styles.buttons}>
          <Button
            className={styles.toOtherPolls}
            text={'Пройти нове опитування'}
            type="submit"
            onClick={() => router.push('/poll')}
          />
          <Button
            className={styles.toMain}
            text={'Повернутись на головну'}
            type="submit"
            variant={ButtonVariant.OUTLINE}
            onClick={() => router.push('/')}
          />
        </div>
      </div>
    </div>
  );
};

export default AnswersSaved;
