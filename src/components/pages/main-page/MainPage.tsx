import { FC } from 'react';
import { isIOS, isSafari } from 'react-device-detect';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

import PageLayout from '@/components/common/layout/page-layout/PageLayout';
import Button, {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button';
import TokenPopup from '@/components/pages/main-page/components/token-popup';
import useAuthentication from '@/hooks/use-authentication';
import { GetStudentResourcesResponse } from '@/lib/api/student-resources/types/GetStudentResourcesResponse';

import BannerImage from '../../common/icons/BannerImage';

import ResourceCard from './components/resource-card/ResourceCard';

import styles from './MainPage.module.scss';

export interface MainPageProps {
  data: GetStudentResourcesResponse | null;
}

const MainPage: FC<MainPageProps> = ({ data }) => {
  const { query, isReady } = useRouter();
  const token = query.token as string;
  const { isLoggedIn } = useAuthentication();

  return (
    <PageLayout
      description="FICT Advisor - офіційний сайт Студради ФІОТ.
     Зустрічайте ваш студентський портал, який надає багато корисних інструментів для студентів.
     Тут ви знайдете опитування про викладачів, багатофункціональний розклад, можливість керувати групою,
      набори в активне ком’юніті та багато інших цікавих інструментів."
      className={styles['main-page']}
    >
      <div className={styles['main-page-content']}>
        {token && isReady && <TokenPopup token={token} />}
        <div className={styles['header']}>
          <div className={styles['header-info']}>
            <div className={styles['header-info-content']}>
              <h1 className={styles['title']}>Твій студентський портал</h1>
              <p>
                Зустрічай FICT Advisor — офіційний сайт Студради ФІОТ.
                Опитування про викладачів, багатофункціональний розклад,
                керування групою, набори в наше активне ком’юніті, розіграш шар
                та інші інструменти — шукай саме тут!
              </p>
              <div className={styles['buttons']}>
                <div className={styles['buttons-desk']}>
                  {!isLoggedIn && (
                    <>
                      <Link href={'/contract'}>
                        <Button
                          text="Договір про навчання"
                          disabled={false}
                          color={ButtonColor.PRIMARY}
                          variant={ButtonVariant.FILLED}
                          size={ButtonSize.LARGE}
                        />
                      </Link>
                      <hr className={styles['button-divider']} />
                    </>
                  )}
                  <Link href={'/priority'}>
                    <Button
                      text={'Обрати пріоритет'}
                      disabled={false}
                      variant={ButtonVariant.OUTLINE}
                      size={ButtonSize.LARGE}
                    />
                  </Link>
                </div>
                <div className={styles['buttons-tabl']}>
                  {!isLoggedIn && (
                    <>
                      <Link href={'/contract'}>
                        <Button
                          text="Договір про навчання"
                          disabled={false}
                          color={ButtonColor.PRIMARY}
                          variant={ButtonVariant.FILLED}
                          size={ButtonSize.MEDIUM}
                        />
                      </Link>
                      <hr className={styles['button-divider']} />
                    </>
                  )}
                  <Link href={'/priority'}>
                    <Button
                      text={'Обрати пріоритет'}
                      disabled={false}
                      variant={ButtonVariant.OUTLINE}
                      size={ButtonSize.MEDIUM}
                    />
                  </Link>
                </div>
                <div className={styles['buttons-mob']}>
                  {!isLoggedIn && (
                    <>
                      <Link href={'/contract'}>
                        <Button
                          text="Договір про навчання"
                          disabled={false}
                          color={ButtonColor.PRIMARY}
                          variant={ButtonVariant.FILLED}
                          size={ButtonSize.SMALL}
                        />
                      </Link>
                    </>
                  )}
                  <Link href={'/priority'}>
                    <Button
                      text={'Обрати пріоритет'}
                      disabled={false}
                      variant={ButtonVariant.OUTLINE}
                      size={ButtonSize.SMALL}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div
            className={cn(styles['build-image'], {
              [styles['animate']]: !isIOS && !isSafari,
            })}
          >
            <BannerImage />
          </div>
        </div>
        <div className={styles['resources']}>
          <h3>Студентські ресурси</h3>
          <div className={styles['resource-card-container']}>
            <div className={styles['resources-cards']}>
              {data?.studentResources.map(({ name, id, icon, link }) => (
                <div className={styles['card-holder']} key={id}>
                  <ResourceCard text={name} image={icon} href={link} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default MainPage;
