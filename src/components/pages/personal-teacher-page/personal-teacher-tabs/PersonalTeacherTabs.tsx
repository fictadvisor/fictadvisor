import { FC, SyntheticEvent } from 'react';
import { Box } from '@mui/material';
import dynamic from 'next/dynamic';

import Tab from '@/components/common/ui/tab/tab';
import { TabTextPosition } from '@/components/common/ui/tab/tab/types';
import TabContext from '@/components/common/ui/tab/tab-context';
import TabList from '@/components/common/ui/tab/tab-list';
import TabPanel from '@/components/common/ui/tab/tab-panel';
import { TeachersPageTabs } from '@/components/pages/personal-teacher-page/PersonalTeacherPage';
import { TeacherPageInfo } from '@/lib/services/teacher/types';

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
  tabIndex: string;
  handleChange: (event: SyntheticEvent, value: TeachersPageTabs) => void;
}

const PersonalTeacherTabs: FC<PersonalTeacherTabsProps> = ({
  data,
  tabIndex,
  handleChange,
}) => {
  const count = data.comments.questions[0]?.comments.length ?? 0;
  return (
    <Box>
      <TabContext value={tabIndex}>
        <TabList id="lol" onChange={handleChange} sx={stylesMUI.tabList}>
          <Tab
            label="Загальне"
            textPosition={TabTextPosition.CENTER}
            value={TeachersPageTabs.GENERAL}
          />
          <Tab
            label="Предмети"
            textPosition={TabTextPosition.CENTER}
            value={TeachersPageTabs.SUBJECTS}
          />
          <Tab
            label="Відгуки"
            count={count}
            textPosition={TabTextPosition.CENTER}
            value={TeachersPageTabs.COMMENTS}
          />
        </TabList>

        <Box sx={stylesMUI.tabPanelList}>
          <TabPanel value={TeachersPageTabs.GENERAL}>
            {data.hasEnoughMarks ? (
              <GeneralTab marks={data.marks} roles={data.info.roles} />
            ) : (
              <PollButtons text={data.marksText} buttonInfo={data.buttonInfo} />
            )}
          </TabPanel>
          <TabPanel value={TeachersPageTabs.SUBJECTS}>
            <SubjectTab subjects={data.subjects} teacherId={data.info.id} />
          </TabPanel>
          <TabPanel value={TeachersPageTabs.COMMENTS}>
            {count === 0 ? (
              <PollButtons
                text={data.commentText}
                buttonInfo={data.buttonInfo}
              />
            ) : (
              <CommentTab teacherId={data.info.id} />
            )}
          </TabPanel>
        </Box>
      </TabContext>
    </Box>
  );
};

export default PersonalTeacherTabs;
