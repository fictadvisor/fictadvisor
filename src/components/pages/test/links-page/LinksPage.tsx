import CustomLink from '@/components/common/ui/link/Link';

import styles from '../test-pages.module.scss';

const LinksPage = () => (
  <div className={styles['test-page-wrap']}>
    <div className={styles['test-page-content']}>
      <CustomLink
        href={'/test/links'}
        text="Click here to show Home"
        className={styles['test']}
      />
      <CustomLink href={'/test'} text="Click here to show Home" />
      <CustomLink href={'/test/alerts'} text="Click here to show Home" />
      <CustomLink href={'/test/buttons'} text="Click here to show Home" />
    </div>
  </div>
);

export default LinksPage;
