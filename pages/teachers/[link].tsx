import { useState } from 'react';
import { GetServerSideProps } from 'next';

import { getFullName } from '../../lib/text';
import { AxiosError } from 'axios';

import PageLayout from '../../components/layout/PageLayout';
import Button from '../../components/ui/Button';
import ArrowIcon from '../../components/ui/icons/ArrowIcon';
import StarIcon from '../../components/ui/icons/StarIcon';
import Tag from '../../components/ui/Tag';

import { SubjectBlock } from '../../components/Subject';
import { ReviewBlock } from '../../components/Review';
import { Divider } from '../../components/ui/Divider';
import { Collapsible } from '../../components/ui/Collapsible';
import { StatisticsBlock } from '../../components/Statistics';
import { ContactBlock } from '../../components/Contact';
import api from '../../lib/api';
import { useQueryParams } from '../../lib/query';
import { toInteger } from '../../lib/number';


const PAGE_TABS = [
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
