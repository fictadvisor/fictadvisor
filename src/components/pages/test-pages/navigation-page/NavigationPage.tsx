import Footer from '@/components/common/layout/footer';
import Header from '@/components/common/layout/header';

import styles from '../test-pages.module.scss';

const NavigationPage = () => {
  return (
    <div
      // className={styles['test-navigation-wrap']}
      style={{ backgroundColor: '#1e1e1e' }}
    >
      <div className={styles['header']}>
        <Header
          isLoggined={false}
          name="Ярмоленко Єлизавета Миколаївна"
          position="Зам староста"
          groupName="ІК-11"
        />
      </div>
      <p>
        *Lorem ipsum dolor sit amet coninus quod esse, illum omnis unde?
        Mollitia iure libero iste sapiente quos quas minus maiores, placeat
        icabo.
      </p>
      <div className={styles['footer']}>
        <Footer />
      </div>
    </div>
  );
};

export default NavigationPage;
