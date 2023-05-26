import React from 'react';
import Link from 'next/link';

import PageLayout from '@/components/common/layout/page-layout/PageLayout';

import styles from './PrivacyPage.module.scss';

const PrivacyPage = () => {
  return (
    <PageLayout
      description={'Політика конфіденційності'}
      hasFooter={true}
      hasHeader={true}
    >
      <div className={styles['privacy-content']}>
        <h4 className={styles['h4-content']}>Політика конфіденційності</h4>
        <div className={styles['privacy-list']}>
          <div className={styles['privacy-list-item']}>
            <p className={styles['body-primary']}>
              FICT Advisor – це інформаційна система Студради ФІОТ для студентів
              Факультету інформатики та обчислювальної техніки Національного
              технічного університету України “Київський політехнічний інститут
              ім. Ігоря Сікорського” (далі – Система). Основними завданнями
              Системи є допомога студентам факультету, забезпечення якості вищої
              освіти, цифровізація та автоматизація внутрішніх та зовнішніх
              процесів Студради ФІОТ та її відділів.
            </p>
          </div>
          <div className={styles['privacy-list-item']}>
            <h6 className={styles['h6-content']}>Які дані ми збираємо?</h6>
            <p className={styles['body-primary']}>
              Згідно з законом України “Про захист персональних прав”,
              персональними даними вважаються такі дані, за допомогою яких можна
              однозначно ідентифікувати особу. Система збирає такі дані:
              прізвище, ім’я, по батькові, академічна група. За запитом
              Адміністрації Системи персональні дані користувача можуть бути
              уточнені та відформатовані до одного виду.
            </p>
          </div>
          <div className={styles['privacy-list-item']}>
            <h6 className={styles['h6-content']}>Як ми ці дані оброблюємо?</h6>
            <p className={styles['body-primary']}>
              Система є Open-Source проєктом, тому весь код знаходиться у
              публічному просторі за посиланням{' '}
              <Link href={'https://github.com/fictadvisor/'}>
                https://github.com/fictadvisor/
              </Link>
              . Персональні дані використовуються з метою верифікації
              особистості та уніфікації зареєстрованих користувачів. Це зроблено
              для того, щоб контингент користувачів, який зареєстрований у
              Системі, відповідав контингенту Факультету, звідси результати
              опитувань та інших проведених подій будуть більш репрезентативними
              і достовірними.
            </p>
          </div>
          <div className={styles['privacy-list-item']}>
            <h6 className={styles['h6-content']}>
              Коли ми видаляємо персональні дані?
            </h6>
            <p className={styles['body-primary']}>
              Персональні дані користувача видаляються: після відрахування
              користувача з Факультету; за власним запитом користувача; після
              деактивації системи. Адміністрація Системи залишає за собою право
              видалити акаунт та персональні дані користувача у випадках, коли
              дії користувача шкодять функціонуванню Системи.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PrivacyPage;
