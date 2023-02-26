import Footer from '@/components/common/composite/footer';
import Header from '@/components/common/composite/header/';

import styles from '../test-pages.module.scss';

const NavigationPage = () => {
  return (
    <div className={styles['test-navigation-wrap']}>
      <div className={styles['header']}>
        <Header
          isLoggined={true}
          name="Ярмоленко Єлизавета Миколаївна"
          position="Зам староста"
          groupName="ІК-11"
        />
      </div>
      <p>
        *Lorem ipsum dolor sit amet coninus quod esse, illum omnis unde?
        Mollitia iure libero iste sapiente quos quas minus maiores, placeat
        dolores sunt reiciendis ipsa molestias unde? Quis, velit in? Fugitbus
        quisquam? Laborum, explicabo.*Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Laudantium sequi, necessitatibus possimus ut
        cupiditate eaque a, io maiores illum exunde? Quis, velit in? Fugitbus
        quisquam? Laborum, explicabo. *Lorem ipsum dolor sit amet coninus quod
        esse, illum omnis unde? Mollitia iure libero iste sapiente quos quas
        minus maiores, placeat dolores sunt reiciendis ipsa molestias unde?
        Quis, velit in? Fugitbus quisquam? Laborum, explicabo.*Lorem ipsum dolor
        sit amet consectetur adipisicing elit. Laudantium sequi, necessitatibus
        possimus ut cupiditate eaque a, io maiores illum exunde? Quis, velit in?
        Fugitbus quisquam? Laborum, explicabo.
      </p>
      <div className={styles['footer']}>
        <Footer />
      </div>
    </div>
  );
};

export default NavigationPage;
