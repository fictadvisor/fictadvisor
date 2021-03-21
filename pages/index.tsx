import { useEffect, useState } from 'react';;
import PageLayout from '../components/layout/PageLayout';
import { SubjectBlock } from '../components/Subject';
import Button from '../components/ui/Button'
import { useRouter } from 'next/router';
import { ReviewBlock } from '../components/Review';
import { Divider } from '../components/ui/Divider';
import { wrapText } from '../lib/text';
import ArrowIcon from '../components/ui/icons/ArrowIcon';
import StarIcon from '../components/ui/icons/StarIcon';
import Tag from '../components/ui/Tag';
import { Collapsible } from '../components/ui/Collapsible';
import { StatisticsBlock } from '../components/Statistics';
import { ContactBlock } from '../components/Contact';

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
    block: ContactBlock
  },
  {
    name: 'Статистика',
    link: 'stats',
    block: StatisticsBlock
  },
];

function Rating(props) {
  return (
    <div className="rating secondary">
      4.5
      <StarIcon />
    </div>
  );
}

const findTabByLink = (link) => {
  const index = tabs.findIndex(t => t.link === link);
  return index === -1 ? 0 : index;
};

const placeholderText = "Дійсно, ніхто не відкидає, не зневажає, не уникає насолод тільки через те, що це насолоди, але лише через те, що тих, хто не вміє розумно вдаватися насолоді, осягають великі страждання. Так само як немає нікого, хто полюбивши, вважав за краще і зажадав би саме страждання тільки за те, що це страждання, а не тому, що інший раз виникають такі обставини, коли страждання і біль. Дійсно, ніхто не відкидає, не зневажає, не уникає насолод тільки через те, що це насолоди, але лише через те, що тих, хто не вміє розумно вдаватися насолоді, осягають великі страждання. Так само як немає нікого, хто полюбивши, вважав за краще і зажадав би саме страждання тільки за те, що це страждання, а не тому, що інший раз виникають такі обставини, коли страждання і біль. Дійсно, ніхто не відкидає, не зневажає, не уникає насолод тільки через те, що це насолоди, але лише через те, що тих, хто не вміє розумно вдаватися насолоді, осягають великі страждання. Так само як немає нікого, хто полюбивши, вважав за краще і зажадав би саме страждання тільки за те, що це страждання, а не тому, що інший раз виникають такі обставини, коли страждання і біль.";

export default function HomePage() {
  const router = useRouter();
  const [blockReady, setBlockReady] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
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
      <div className={`block teacher ${collapsed ? 'collapsed' : ''}`}>
        <div className="teacher-info">
          <img className="avatar teacher" src="https://i.imgur.com/MFtw4PC.jpg"/>
          <div style={{ marginLeft: '24px' }}>
            <p className="name">Лісовиченко Олег Іванович</p>
            <div className="flex" style={{ marginTop: '5px' }}>
              <div className="tag-group">
                <Tag>#кібернетика</Tag>
              </div>
              <Rating />
            </div>
          </div>
        </div>
        <Collapsible minHeight={110} collapsed={collapsed}>
          <Divider />
          <div className="teacher-description">
            <p className="title inner">Загальний опис</p>
            <div className="description">
              <p>Дійсно, ніхто не відкидає, не зневажає, не уникає насолод тільки через те, що це насолоди, але лише через те, що тих, хто не вміє розумно вдаватися насолоді, осягають великі страждання. Так само як немає нікого, хто полюбивши, вважав за краще.</p>
              <p>Зажадав би саме страждання тільки за те, що це страждання, а не тому, що інший раз виникають такі обставини, коли страждання і біль. Дійсно, ніхто не відкидає, не зневажає, не уникає насолод.</p>
              <p>Тільки через те, що це насолоди, але лише через те, що тих, хто не вміє розумно вдаватися насолоді, осягають великі страждання. Так само як немає нікого, хто полюбивши, вважав за краще і зажадав би саме страждання тільки за те, що це страждання, а не тому, що інший раз виникають такі обставини, коли страждання і біль. Дійсно, ніхто не відкидає, не зневажає, не уникає насолод тільки через те, що це насолоди, але лише через те, що тих, хто не вміє розумно вдаватися насолоді, осягають великі страждання.</p>
              Так само як немає нікого, хто полюбивши, вважав за краще і зажадав би саме страждання тільки за те, що це страждання, а не тому, що інший раз виникають такі обставини, коли страждання і біль.
            </div>
          </div>
        </Collapsible>
      </div>
      <Button className="attached" onClick={() => setCollapsed(!collapsed)}>
        <span className={collapsed ? null : 'v-flipped'}><ArrowIcon /></span>
      </Button>
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
