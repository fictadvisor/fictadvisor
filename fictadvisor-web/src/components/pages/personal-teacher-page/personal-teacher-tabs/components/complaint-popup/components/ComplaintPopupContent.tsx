import { FC } from 'react';
import { useQuery } from 'react-query';
import { Box, Typography } from '@mui/material';

import { Input, InputSize, TextArea } from '@/components/common/ui/form';
import { TextAreaSize } from '@/components/common/ui/form/text-area-mui/types';
import FormikDropdown from '@/components/common/ui/form/with-formik/dropdown/FormikDropdown';
import PopupContent from '@/components/common/ui/pop-ups/PopupContent';
import GroupAPI from '@/lib/api/group/GroupAPI';

import * as styles from './ComplaintPopupContent.styles';

const ComplaintPopupContent: FC = () => {
  const { data: groupData } = useQuery('all-groups', GroupAPI.getAll, {
    staleTime: Infinity,
  });

  if (!groupData) return;

  return (
    <PopupContent>
      <Box sx={styles.subtitleWrapper}>
        <Typography sx={styles.subtitle}>
          Якщо викладач ставиться якось не толерантно, зробив щось, що потребує
          втручання студради, напиши про це тут. Форма є анонімною, але можеш
          лишити дані для зв’язку і подальшої комунікації
        </Typography>
      </Box>
      <Box sx={styles.inputsWrapper}>
        <Input
          size={InputSize.LARGE}
          name="fullName"
          showRemark={false}
          placeholder="ПІБ (не обов’язково)"
        />
        <FormikDropdown
          name="groupId"
          options={
            groupData.groups
              ? groupData.groups.map(group => ({
                  id: group.id,
                  label: group.code,
                }))
              : []
          }
          dropdownSx={{ marginTop: '12px' }}
          label=""
          placeholder="Група (не обов’язково)"
          showRemark={false}
          disableClearable
        />
        <Input
          size={InputSize.LARGE}
          name="title"
          showRemark={false}
          placeholder="Заголовок до скарги"
        />
      </Box>
      <TextArea
        size={TextAreaSize.MEDIUM}
        name="message"
        placeholder="Опишіть свою скаргу"
        rowsNumber={6}
      />
    </PopupContent>
  );
};

export default ComplaintPopupContent;
