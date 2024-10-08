import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { Input, InputSize } from '@/components/common/ui/form';
import { FieldSize } from '@/components/common/ui/form/common/types';
import FormikDropdown from '@/components/common/ui/form/with-formik/dropdown/FormikDropdown';
import FormikTextArea from '@/components/common/ui/form/with-formik/text-area';
import PopupContent from '@/components/common/ui/pop-ups/PopupContent';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import GroupAPI from '@/lib/api/group/GroupAPI';

import * as styles from './ComplaintPopupContent.styles';

const ComplaintPopupContent = () => {
  const { displayError } = useToastError();
  const { data: groupData, error } = useQuery({
    queryKey: ['groups'],
    queryFn: () => GroupAPI.getAll(),
    placeholderData: (previousData, previousQuery) => previousData,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  if (error) {
    displayError(error);
  }
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
