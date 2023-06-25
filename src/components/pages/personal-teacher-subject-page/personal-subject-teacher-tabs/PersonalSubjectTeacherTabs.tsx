import { FC } from 'react';
import { Box } from '@mui/material';

import Tab from '@/components/common/ui/tab-mui/tab';
import TabContext from '@/components/common/ui/tab-mui/tab-context';
import TabList from '@/components/common/ui/tab-mui/tab-list';
import TabPanel from '@/components/common/ui/tab-mui/tab-panel';
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
import dynamic from 'next/dynamic';

import { TeachersPageTabs } from '@/components/pages/personal-teacher-page/PersonalTeacherPage';
import { GetTeacherSubjectResponse } from '@/lib/services/teacher/TeacherService';

import * as styles from './PersonalSubjectTeacherTabs.styles';

interface PersonalSubjectTeacherProps {
  data: GetTeacherSubjectResponse;
  tabIndex: string;
  handleChange: (event, value) => void;
}
const PersonalSubjectTeacherTabs: FC<PersonalSubjectTeacherProps> = ({
  data,
  tabIndex,
  handleChange,
}) => {
  const count = data.comments.questions[0]?.comments.length ?? 0;
  return (
    <Box>
      <TabContext value={tabIndex}>
        <TabList id="lol" onChange={handleChange} sx={styles.tabList}>
          <Tab
            label="Загальне"
            textPosition="center"
            value={TeachersPageTabs.GENERAL}
          />
          <Tab
            label="Відгуки"
            count={count}
            textPosition="center"
            value={TeachersPageTabs.COMMENTS}
          />
        </TabList>

        <Box sx={styles.tabPanelList}>
          <TabPanel value={TeachersPageTabs.GENERAL}>
            {data.hasEnoughMarks ? (
              <GeneralTab marks={data.marks} roles={data.info.roles} />
            ) : (
              data.buttonInfo.map((button, index) => (
                <PollButtons
                  key={index}
                  text={data.marksText}
                  buttonInfo={data.buttonInfo}
                />
              ))
            )}
          </TabPanel>
          <TabPanel value={TeachersPageTabs.COMMENTS}>
            {count === 0 ? (
              <PollButtons
                text={data.commentText}
                buttonInfo={data.buttonInfo}
              />
            ) : (
              <CommentTab
                teacherId={data.info.id}
                subjectId={data.info?.subject?.id}
              />
            )}
          </TabPanel>
        </Box>
      </TabContext>
    </Box>
  );
};

export default PersonalSubjectTeacherTabs;
