import { FC } from 'react';

import PageLayout from '@/components/common/layout/page-layout';
import PrivacyPage from '@/components/pages/privacy-page';

const Privacy: FC = () => {
  return (
    <PageLayout
      title="Політика конфіденційності | FICT Advisor"
      description="На цій сторінці ми надаємо опис процесу збору та обробки персональних даних, а також умови їх видалення. Персональні дані видаляються після відрахування користувача з факультету, за власним запитом користувача або після деактивації системи."
    >
      <PrivacyPage />
    </PageLayout>
  );
};

export default Privacy;
