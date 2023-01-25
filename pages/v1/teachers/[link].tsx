import {useState} from 'react';
import {GetServerSideProps} from 'next';
import {AxiosError} from 'axios';

import PageLayout from '../../../components/v1/layout/PageLayout';
import Button from '../../../components/v1/ui/Button';
import ArrowIcon from '../../../components/v1/ui/icons/ArrowIcon';
import StarIcon from '../../../components/v1/ui/icons/StarIcon';
import Tag from '../../../components/v1/ui/Tag';

import Divider from '../../../components/v1/ui/Divider';
import Collapsible from '../../../components/v1/ui/Collapsible';

import ReviewBlock from '../../../components/v1/blocks/ReviewBlock';
import ContactBlock from '../../../components/v1/blocks/ContactBlock';
import CourseBlock from '../../../components/v1/blocks/CourseBlock';
import Disclaimer from '../../../components/v1/ui/Disclaimer';
import {toInteger} from "../../../lib/v1/number";
import api from "../../../lib/v1/api";
import {useQueryParams} from "../../../lib/v1/query";
import {getFullName} from "../../../lib/v1/text";

type TabProperties = { link: string, id: string };

const PAGE_TABS = [
    {
        name: 'Предмети',
        block: ({id, link}: TabProperties) => <CourseBlock id={id} link={link}/>
    },
    {
        name: 'Відгуки',
        block: ({link}: TabProperties) => <ReviewBlock link={link}/>,
    },
    {
        name: 'Контакти',
        block: ({link}: TabProperties) => <ContactBlock link={link}/>
    },
    /*{
      name: 'Статистика',
      block: ({ links }: TabProperties) => <StatisticsBlock links={links} />,
    },*/
];

const STATE_MESSAGES = {
    pending: () => <Disclaimer className="warning m-b">Інформація перевіряється редакцією</Disclaimer>,
    declined: () => <Disclaimer className="alert m-b">Інформація не є дійсною та була відхилена редакцією</Disclaimer>,
};

const Rating = ({rating}) => {
    return (
        rating && rating > 0
            ? (<div className="rating c-secondary" style={{paddingTop: '1px'}}>{+rating.toFixed(2)}<StarIcon/></div>)
            : null
    );
};

const TeacherPage = ({teacher}) => {
    const fullName = getFullName(teacher.last_name, teacher.first_name, teacher.middle_name);
    const hasDescription = teacher.description != null;

    const [blockReady, setBlockReady] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [canCollapse, setCanCollapse] = useState(hasDescription);
    const [tab, _setTab] = useState(0);
    const {withQueryParam} = useQueryParams((query) => {
        _setTab(toInteger(query.t, tab));
        setBlockReady(true);
    });

    const setTab = withQueryParam('t', _setTab);

    const TabBlock = PAGE_TABS[tab].block;
    const StateMessage = STATE_MESSAGES[teacher.state];

    return (
        <PageLayout
            meta={{title: fullName}}
            title="Сторінка викладача"
        >
            {
                StateMessage &&
                <StateMessage/>
            }
            <div className={`block teacher ${collapsed ? 'collapsed' : ''} ${canCollapse ? 'collapsible' : ''}`}>
                <div className="teacher-info">
                    <img className="avatar teacher" src={teacher.image}/>
                    <div className="d-flex" style={{marginLeft: '24px'}}>
                        <div style={{display: 'block', margin: 'auto 0'}}>
                            <p className="name">{fullName}</p>
                            <div className="d-flex m-t">
                                {
                                    teacher.tags.length > 0 &&
                                    <div className="tag-group">
                                        {teacher.tags.map(tag => <Tag key={tag}>#{tag}</Tag>)}
                                    </div>
                                }
                                <Rating rating={teacher.rating}/>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    hasDescription &&
                    <Collapsible minHeight={110} collapsed={collapsed}
                                 onActiveChange={(active) => setCanCollapse(active)}>
                        <Divider/>
                        <div className="teacher-description">
                            <p className="title inner">Загальний опис</p>
                            <div className="description" dangerouslySetInnerHTML={{__html: teacher.description}}>
                            </div>
                        </div>
                    </Collapsible>
                }
            </div>
            {
                canCollapse &&
                <Button className="attached" onClick={() => setCollapsed(!collapsed)}>
                    <span className={collapsed ? null : 't-v-flipped'}><ArrowIcon/></span>
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
                    <TabBlock id={teacher.id} link={teacher.link}/>
                </>
            }
        </PageLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {link} = context.query;

    try {
        const data = await api.teachers.get(typeof (link) === 'object' ? link[0] : link);

        return {
            props: {
                teacher: data,
            },
        };
    } catch (e) {
        const error = e as AxiosError;

        if (error.response.status === 404) {
            return {notFound: true};
        }

        throw e;
    }
};

export default TeacherPage;
