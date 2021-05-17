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
import Disclaimer from '../../components/ui/Disclaimer';

type TabProperties = { link: string };

const PAGE_TABS = [
  {
    name: 'Предмети',
    block: ({ link }: TabProperties) => <CourseBlock link={link} />
  },
  {
    name: 'Відгуки',
    block: ({ link }: TabProperties) => <ReviewBlock link={link} />,
  },
  {
    name: 'Контакти',
    block: ({ link }: TabProperties) => <ContactBlock link={link} />
  },
  {
    name: 'Статистика',
    block: ({ link }: TabProperties) => <StatisticsBlock link={link} />,
  },
];

const STATE_MESSAGES = {
  pending: () => <Disclaimer className="warning m-b">Інформація перевіряється редакцією</Disclaimer>,
  declined: () => <Disclaimer className="alert m-b">Інформація не є дійсною та була відхилена редакцією</Disclaimer>,
};

const Rating = ({ rating }) => {
  return (
    rating && rating > 0 
      ? (<div className="rating c-secondary" style={{ marginLeft: '5px' }}>{rating}<StarIcon /></div>)
      : null
  );
};

const TeacherPage = ({ teacher }) => {
  const fullName = getFullName(teacher.last_name, teacher.first_name, teacher.middle_name);
  const hasDescription = teacher.description != null;

  const [blockReady, setBlockReady] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [canCollapse, setCanCollapse] = useState(hasDescription);
  const [tab, _setTab] = useState(0);
  const { withQueryParam } = useQueryParams((query) => {
    _setTab(toInteger(query.t, tab));
    setBlockReady(true);
  });
  
  const setTab = withQueryParam('t', _setTab);

  const TabBlock = PAGE_TABS[tab].block;
  const StateMessage = STATE_MESSAGES[teacher.state];

  return (
    <PageLayout
      meta={{ title: fullName }}
      title="Сторінка викладача"
    >
      {
        StateMessage &&
        <StateMessage />
      }
      <div className={`block teacher ${collapsed ? 'collapsed' : ''} ${canCollapse ? 'collapsible' : ''}`}>
        <div className="teacher-info">
          <img className="avatar teacher" src={teacher.image}/>
          <div className="d-flex" style={{ marginLeft: '24px' }}>
            <div style={{ display: 'block', margin: 'auto 0' }}>
              <p className="name">{fullName}</p>
              <div className="d-flex m-t">
                {
                  teacher.tags.length > 0 &&
                  <div className="tag-group">
                    {teacher.tags.map(tag => <Tag key={tag}>#{tag}</Tag>)}
                  </div>
                }
                <Rating rating={teacher.rating} />
              </div>
            </div>
          </div>
        </div>
        {
         hasDescription &&
          <Collapsible minHeight={110} collapsed={collapsed} onActiveChange={(active) => setCanCollapse(active)}>
            <Divider />
            <div className="teacher-description">
              <p className="title inner">Загальний опис</p>
              <div className="description" dangerouslySetInnerHTML={{ __html: teacher.description }}>
              </div>
            </div>
          </Collapsible>
        }
      </div>
      {
        canCollapse &&
        <Button className="attached" onClick={() => setCollapsed(!collapsed)}>
          <span className={collapsed ? null : 't-v-flipped'}><ArrowIcon /></span>
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
    const data = await api.teachers.get(typeof(link) === 'object' ? link[0] : link);

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
