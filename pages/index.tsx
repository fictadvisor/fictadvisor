import { useEffect, useState } from 'react';;
import PageLayout from '../components/layout/PageLayout';
import { SubjectBlock } from '../components/Subject';
import Button from '../components/ui/Button'
import { useRouter } from 'next/router';
import { ReviewBlock } from '../components/Review';

const tabs = [
  {
    name: 'Предмети',
    link: 'subjects',
    block: SubjectBlock
  },
  {
    name: 'Відгуки',
    link: 'reviews',
    block: ReviewBlock
  },
  {
    name: 'Контакти',
    link: 'contacts',
    block: SubjectBlock
  },
  {
    name: 'Статистика',
    link: 'stats',
    block: SubjectBlock
  },
];

const findTabByLink = (link) => {
  const index = tabs.findIndex(t => t.link === link);
  return index === -1 ? 0 : index;
};

export default function HomePage() {
  const router = useRouter();
  const [blockReady, setBlockReady] = useState(false);
  const [tab, setTab] = useState(0);

  const TabBlock = tabs[tab].block;

  useEffect(() => {
    if (!router.isReady) { return; }

    const activeTab = findTabByLink(router.query.t);

    setTab(activeTab);
    setBlockReady(true);
  }, [router.isReady]);

  const changeTab = (index) => {
    setTab(index);
    router.push({ pathname: router.pathname, query: { ...router.query, t: tabs[index].link } }, null, { shallow: true });
  };

  return (
    <PageLayout
      meta={{ title: 'Лісовиченко Олег Іванович' }}
      title="Сторінка викладача"
    >
      <div className="block">
        test
      </div>
      {
        blockReady && 
        <>
          <div className="button-group">
            {
              tabs.map(
                (t, index) => 
                  <Button 
                    onClick={() => changeTab(index)} 
                    active={tab === index}
                    key={t.link}
                  >
                    {t.name}
                  </Button>
              )
            }
          </div>
          <TabBlock />
        </>
      }
    </PageLayout>
  )
}
