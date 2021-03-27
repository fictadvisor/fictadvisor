import api from '../../lib/api';

import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { useQueryParams } from '../../lib/query';
import { toInteger } from '../../lib/number';
import { getFullName } from '../../lib/text';
import { AxiosError } from 'axios';

import PageLayout from '../../components/layout/PageLayout';
import Button from '../../components/ui/Button';
import ArrowIcon from '../../components/ui/icons/ArrowIcon';
import StarIcon from '../../components/ui/icons/StarIcon';
import Tag from '../../components/ui/Tag';

import Divider from '../../components/ui/Divider';
import Collapsible from '../../components/ui/Collapsible';

import StatisticsBlock from '../../components/blocks/StatisticsBlock';
import ReviewBlock from '../../components/blocks/ReviewBlock';
import ContactBlock from '../../components/blocks/ContactBlock';
import CourseBlock from '../../components/blocks/CourseBlock';

type TabProperties = { link: string };

const PAGE_TABS = [
  {
    name: 'Предмети',
    block: ({ link }: TabProperties) => {
      const courses = [
        { title: 'Системне програмування', rating: 4.8, reviewCount: 12, link: '0', recommended: true },
        { title: 'Системне програмування - 2', rating: 4.3, reviewCount: 4, link: '0', recommended: false },
        { title: 'Інтеграція ІТ-систем', rating: 0, reviewCount: 0, link: '0', recommended: false },
      ];

      return <CourseBlock courses={courses} />;
    }
  },
  {
    name: 'Відгуки',
    block: ({ link }: TabProperties) => {
      const reviews = [
        { rating: 3.5, date: new Date(), subject: 'Системне програмування', content: 'Так само як немає нікого, хто полюбивши, вважав за краще і зажадав би саме страждання тільки за те, що це страждання, а не тому, що інший раз виникають такі обставини, коли страждання і біль приносять якесь і чималу насолоду. Якщо скористатися найпростішим прикладом, то хто з нас став би займатися якими б то не було тяжкими фізичними вправами, якщо б це не приносило з собою якоїсь користі? І хто міг би по справедливості дорікнути прагнення до насолоди, яке не несло б з собою ніяких неприємностей, або того, хто уникав би такого страждання, яке не приносило б з собою ніякої насолоди?' },
        { rating: 4, date: new Date(), subject: 'Системне програмування - 2', content: 'І хто міг би по справедливості дорікнути прагнення до насолоди, яке не несло б з собою ніяких неприємностей, або того, хто уникав би такого страждання, яке не приносило б з собою ніякої насолоди?' }
      ];

      return <ReviewBlock reviews={reviews} />;
    }
  },
  {
    name: 'Контакти',
    block: ({ link }: TabProperties) => {
      const contacts = [
        { name: 'Телефон', value: '+380 50 507 29 43' },
        { name: 'Telegram', value: '@lisovychenko' },
        { name: 'Телефон', value: '+380 50 507 29 43' }
      ];

      return <ContactBlock contacts={contacts} />;
    }
  },
  {
    name: 'Статистика',
    block: ({ link }: TabProperties) => {
      const entries = [
        { name: 'Ввічливість', rating: 2.5 },
        { name: 'Пунктуальність', rating: 4 },
        { name: 'Об\'єктивність', rating: 5 },
        { name: 'Загалом', rating: 3.8 }
      ];

      return <StatisticsBlock entries={entries} />;
    }
  },
];

const Rating = (props) => (<div className="rating secondary">4.5<StarIcon /></div>);

const TeacherPage = ({ teacher }) => {
  const fullName = getFullName(teacher.last_name, teacher.first_name, teacher.middle_name);

  const [blockReady, setBlockReady] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [canCollapse, setCanCollapse] = useState(true);
  const [tab, _setTab] = useState(0);
  const { withQueryParam } = useQueryParams((query) => {
    _setTab(toInteger(query.t, tab));
    setBlockReady(true);
  });
  
  const setTab = withQueryParam('t', _setTab);

  const TabBlock = PAGE_TABS[tab].block;

  return (
    <PageLayout
      meta={{ title: fullName }}
      title="Сторінка викладача"
    >
      <div className={`block teacher ${collapsed ? 'collapsed' : ''} ${canCollapse ? 'collapsible' : ''}`}>
        <div className="teacher-info">
          <img className="avatar teacher" src="https://i.imgur.com/MFtw4PC.jpg"/>
          <div style={{ marginLeft: '24px' }}>
            <p className="name">{fullName}</p>
            <div className="flex" style={{ marginTop: '5px' }}>
              {
                teacher.tags.length > 0 &&
                <div className="tag-group">
                  {teacher.tags.map(tag => <Tag key={tag}>#{tag}</Tag>)}
                </div>
              }
              <Rating />
            </div>
          </div>
        </div>
        <Collapsible minHeight={110} collapsed={collapsed} onActiveChange={(active) => setCanCollapse(active)}>
          <Divider />
          <div className="teacher-description">
            <p className="title inner">Загальний опис</p>
            <div className="description" dangerouslySetInnerHTML={{ __html: teacher.description }}>
            </div>
          </div>
        </Collapsible>
      </div>
      {
        canCollapse &&
        <Button className="attached" onClick={() => setCollapsed(!collapsed)}>
          <span className={collapsed ? null : 'v-flipped'}><ArrowIcon /></span>
        </Button>
      }
      {
        blockReady && 
        <>
          <div className="button-group">
            {
              PAGE_TABS.map(
                (t, index) => 
                  <Button 
                    onClick={() => setTab(index)} 
                    active={tab === index}
                    key={index}
                  >
                    {t.name}
                  </Button>
              )
            }
          </div>
          <TabBlock link={teacher.link} />
        </>
      }
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { link } = context.query;

  try {
    const data = await api.fetchTeacher(typeof(link) === 'object' ? link[0] : link);

    return {
      props: {
        teacher: data,
      },
    };
  } catch (e) {
    const error = e as AxiosError;

    if (error.response.status === 404) {
      return { notFound: true };
    }

    throw e;
  }
};

export default TeacherPage;
