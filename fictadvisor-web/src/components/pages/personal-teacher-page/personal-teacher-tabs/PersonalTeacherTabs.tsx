import { FC, SyntheticEvent, useState } from 'react';
import {
  BookOpenIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  FaceFrownIcon,
} from '@heroicons/react/24/outline';
import { Box } from '@mui/material';
import dynamic from 'next/dynamic';

import Button from '@/components/common/ui/button';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import Tab from '@/components/common/ui/tab/tab';
import { TabTextPosition } from '@/components/common/ui/tab/tab/types';
import TabContext from '@/components/common/ui/tab/tab-context';
import TabList from '@/components/common/ui/tab/tab-list';
import TabPanel from '@/components/common/ui/tab/tab-panel';
import { TeachersPageTabs } from '@/components/pages/personal-teacher-page/utils';
import { TeacherPageInfo } from '@/lib/services/teacher/types';
import { Teacher } from '@/types/teacher';

import ComplaintPopup from './components/complaint-popup';
import * as stylesMUI from './PersonalTeacherTabs.styles';

const CommentTab = dynamic(
  () =>
    import(
      '@/components/pages/personal-teacher-page/personal-teacher-tabs/components/comment-tab'
    ),
);
const GeneralTab = dynamic(
  () =>
    import(
      '@/components/pages/personal-teacher-page/personal-teacher-tabs/components/general-tab'
    ),
);
const PollButtons = dynamic(
  () =>
    import(
      '@/components/pages/personal-teacher-page/personal-teacher-tabs/components/poll-buttons'
    ),
);
const SubjectTab = dynamic(
  () =>
    import(
      '@/components/pages/personal-teacher-page/personal-teacher-tabs/components/subject-tab'
    ),
);

interface PersonalTeacherTabsProps {
  data: TeacherPageInfo;
  teacher: Teacher;
  tabIndex: string;
  handleChange: (event: SyntheticEvent, value: TeachersPageTabs) => void;
}

const PersonalTeacherTabs: FC<PersonalTeacherTabsProps> = ({
  data,
  teacher,
  tabIndex,
  handleChange,
}) => {
  const count = data.comments.questions[0]?.comments.length ?? 0;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <Box>
      <TabContext value={tabIndex}>
        <Box sx={stylesMUI.tabListWrapper}>
          <TabList id="lol" onChange={handleChange} sx={stylesMUI.tabList}>
            <Tab
              icon={<ChartBarIcon />}
              label="Загальне"
              textPosition={TabTextPosition.CENTER}
              value={TeachersPageTabs.GENERAL}
            />
            <Tab
              icon={<BookOpenIcon />}
              label="Предмети"
              textPosition={TabTextPosition.CENTER}
              value={TeachersPageTabs.SUBJECTS}
            />
            <Tab
              icon={<ChatBubbleLeftRightIcon />}
              label="Відгуки"
              count={count}
              textPosition={TabTextPosition.CENTER}
              value={TeachersPageTabs.COMMENTS}
            />
          </TabList>
          <Box>
            <Button
              color={ButtonColor.SECONDARY}
              variant={ButtonVariant.FILLED}
              size={ButtonSize.SMALL}
              text={'Лишити скаргу'}
              onClick={() => setIsPopupOpen(true)}
              startIcon={<FaceFrownIcon width={24} height={24} />}
            ></Button>
          </Box>
        </Box>
        <ComplaintPopup
          isPopupOpen={isPopupOpen}
          setIsPopupOpen={setIsPopupOpen}
          teacherId={teacher.id}
        />
        <Box sx={stylesMUI.tabPanelList}>
          <TabPanel value={TeachersPageTabs.GENERAL}>
            {data.hasEnoughMarks ? (
              <GeneralTab marks={data.marks} roles={teacher.roles} />
            ) : (
              <PollButtons text={data.marksText} buttonInfo={data.buttonInfo} />
            )}
          </TabPanel>
          <TabPanel value={TeachersPageTabs.SUBJECTS}>
            <SubjectTab subjects={data.subjects} teacherId={teacher.id} />
          </TabPanel>
          <TabPanel value={TeachersPageTabs.COMMENTS}>
            {count === 0 ? (
              <PollButtons
                text={data.commentText}
                buttonInfo={data.buttonInfo}
              />
            ) : (
              <CommentTab teacherId={teacher.id} />
            )}
          </TabPanel>
        </Box>
      </TabContext>
    </Box>
  );
};

export default PersonalTeacherTabs;
