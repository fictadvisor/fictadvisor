import { FC } from 'react';
import { useQuery } from 'react-query';
import { Box, Typography } from '@mui/material';
import { isAxiosError } from 'axios';

import { Input, InputSize } from '@/components/common/ui/form';
import { FieldSize } from '@/components/common/ui/form/common/types';
import FormikDropdown from '@/components/common/ui/form/with-formik/dropdown/FormikDropdown';
import FormikTextArea from '@/components/common/ui/form/with-formik/text-area';
import PopupContent from '@/components/common/ui/pop-ups/PopupContent';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import GroupAPI from '@/lib/api/group/GroupAPI';

import * as styles from './ComplaintPopupContent.styles';
import { groupDropdownWrapper } from './ComplaintPopupContent.styles';

const ComplaintPopupContent: FC = () => {
  const toastError = useToastError();
  const { data: groupData } = useQuery(['groups'], () => GroupAPI.getAll(), {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    onError: error => {
      if (isAxiosError(error)) {
        toastError.displayError(error);
      }
    },
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
          label="ПІБ"
          size={InputSize.LARGE}
          name="fullName"
          placeholder="ПІБ (не обов’язково)"
        />
        <Box sx={styles.groupDropdownWrapper}>
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
            label="Група"
            placeholder="Група (не обов’язково)"
            showRemark={false}
            size={FieldSize.LARGE}
          />
        </Box>
        <Input
          label="Заголовок до скарги"
          size={InputSize.LARGE}
          name="title"
          placeholder="Заголовок до скарги"
        />
      </Box>
      <FormikTextArea
        label="Текст скарги"
        name="message"
        placeholder="Опишіть свою скаргу"
        showRemark
      />
    </PopupContent>
  );
};

export default ComplaintPopupContent;
