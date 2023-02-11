import Footer from '@/components/common/composite/footer/Footer';
import Header from '@/components/common/composite/header';

import styles from '../test.module.scss';

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
      <Header buttons={buttons} isLoggined={false} />
      <br />
      <Header
        groupName="ІС-11"
        username="Ярмоленко Єлизавета Миколаївна"
        position="Зам. староста"
        buttons={buttons}
        isLoggined={true}
      />
      <br />
      <Footer />
    </div>
  );
};

export default NavigationPage;
