import { Fragment } from 'react';
import { Stack } from '@mui/system';

import Checkbox from '@/components/common/ui/form/checkbox';
import { CheckboxColor } from '@/components/common/ui/form/checkbox/types';
import useAuthentication from '@/hooks/use-authentication';
import { useSchedule } from '@/store/schedule/useSchedule';

import * as styles from './CheckBoxSection.styles';

export const CheckBoxSection = () => {
  const [groupId, checkboxes, updateCheckboxes] = useSchedule(state => [
    state.groupId,
    state.checkboxes,
    state.updateCheckboxes,
  ]);

  const { user } = useAuthentication();

  const handleValuesChange = (value: Record<string, boolean>) => {
    updateCheckboxes({ ...checkboxes, ...value });
  };

  return (
    <Stack sx={styles.checkboxes}>
      {user && user.group?.id === groupId && (
        <Fragment>
          <Checkbox
            label={'Інша подія'}
            name={'otherEvents'}
            color={CheckboxColor.EVENT}
            checked={checkboxes.otherEvents}
            onChange={(event, checked) =>
              handleValuesChange({ otherEvents: checked })
            }
          />
          <Checkbox
            label={'Мої вибіркові'}
            color={CheckboxColor.PRIMARY}
            name={'isSelective'}
            checked={checkboxes.isSelective}
            onChange={(event, checked) =>
              handleValuesChange({ isSelective: checked })
            }
          />
        </Fragment>
      )}
      <Checkbox
        label={'Лекція'}
        name={'addLecture'}
        color={CheckboxColor.LECTURE}
        checked={checkboxes.addLecture}
        onChange={(event, checked) =>
          handleValuesChange({ addLecture: checked })
        }
      />
      <Checkbox
        label={'Практика'}
        name={'addPractice'}
        color={CheckboxColor.PRACTICE}
        checked={checkboxes.addPractice}
        onChange={(event, checked) =>
          handleValuesChange({ addPractice: checked })
        }
      />
      <Checkbox
        label={'Лабораторна'}
        name={'addLaboratory'}
        color={CheckboxColor.LAB}
        checked={checkboxes.addLaboratory}
        onChange={(event, checked) =>
          handleValuesChange({ addLaboratory: checked })
        }
      />
    </Stack>
  );
};
