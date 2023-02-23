import Footer from '@/components/common/composite/footer';

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
    <div className={styles['test-navigation-wrap']}>
      <p>
        *Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
        sequi, necessitatibus possimus ut cupiditate eaque a, io maiores illum
        excepturi ut voluptates eos perferendis fugit. Unde, voluptas quia?
        Dignissimos accusantium possimus eligendi consequatur odio nisi
        provident reprehenderit voluptatum quibusdam debitis, numquam aspernatur
        illo magnam unde animi tempore, quaerat, fuga qui quis. Error minus quod
        esse, illum omnis unde? Mollitia iure libero iste sapiente quos quas
        minus maiores, placeat dolores sunt reiciendis ipsa molestias unde?
        Quis, velit in? Fugitbus quisquam? Laborum, explicabo.
      </p>

      <div className={styles['footer']}>
        <Footer />
      </div>
    </div>
  );
};

export default NavigationPage;
