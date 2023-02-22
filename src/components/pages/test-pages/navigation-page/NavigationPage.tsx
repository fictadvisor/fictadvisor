import Footer from '@/components/common/composite/footer';
import Header from '@/components/common/composite/header';

import styles from '../test-pages.module.scss';

const NavigationPage = () => {
  const buttons = [
    {
      text: 'Головна',
    },
    {
      text: 'Опитування',
    },
    {
      text: 'Викладачі',
    },
    {
      text: 'Предмети',
    },
  ];

  return (
    <div className={styles['test-page-wrap']}>
      {/* <Header buttons={buttons} isLoggined={false} />
      <br />
      <Header
        groupName="ІС-11"
        username="Ярмоленко Єлизавета Миколаївна"
        position="Зам. староста"
        buttons={buttons}
        isLoggined={true}
      /> */}

      <Footer />
    </div>
  );
};

export default NavigationPage;
