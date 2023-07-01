import { FC, SyntheticEvent } from 'react';
import { Box } from '@mui/material';
import dynamic from 'next/dynamic';

import Tab from '@/components/common/ui/tab-mui/tab';
import { TabTextPosition } from '@/components/common/ui/tab-mui/tab/types';
import TabContext from '@/components/common/ui/tab-mui/tab-context';
import TabList from '@/components/common/ui/tab-mui/tab-list';
import TabPanel from '@/components/common/ui/tab-mui/tab-panel';
import { TeachersPageTabs } from '@/components/pages/personal-teacher-page/PersonalTeacherPage';
import { TeacherSubjectPageInfo } from '@/lib/services/teacher/types';

import * as styles from './PersonalSubjectTeacherTabs.styles';

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

interface PersonalSubjectTeacherProps {
  data: TeacherSubjectPageInfo;
  tabIndex: string;
  handleChange: (event: SyntheticEvent, value: TeachersPageTabs) => void;
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
            textPosition={TabTextPosition.CENTER}
            value={TeachersPageTabs.GENERAL}
          />
          <Tab
            label="Відгуки"
            count={count}
            textPosition={TabTextPosition.CENTER}
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
