import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useQuery } from 'react-query';
import { Box, Typography } from '@mui/material';

import * as styles from '@/app/admin/main/components/page-texts-form/PageTextsForm.styles';
import Input from '@/components/common/ui/form/input-mui';
import Switch from '@/components/common/ui/form/switch/Switch';
import { SwitchLabelPlacement } from '@/components/common/ui/form/switch/types';
import TextArea from '@/components/common/ui/form/text-area-mui';
import PageTextsAPI from '@/lib/api/page-texts/PageTextsAPI';

import { NewPageTexts, TextsProperties } from './types/PageTextsInterfaces';

const pageTextsKeys = [
  'mainpage_title',
  'mainpage_description',
  'mainpage_primary',
  'mainpage_secondary',
  'mainpage_studentresources_title',
];
const PageTextsForm = forwardRef((props, ref) => {
  const formRef = useRef(null);
  const [formValue, setFormValue] = useState<NewPageTexts>({});

  const data = useQuery(
    pageTextsKeys,
    () => PageTextsAPI.getAll(pageTextsKeys),
    {
      onSuccess: data => {
        if (Array.isArray(data)) {
          const newPageTexts = data.reduce(
            (
              acc: { [key: string]: TextsProperties },
              item: TextsProperties,
            ) => {
              acc[item.key] = item;
              return acc;
            },
            {},
          );
          setFormValue(newPageTexts);
        }
      },
    },
  );
  const handleInputChange = (
    key: string | null = null,
    value: string | boolean,
    linkKey: string | null = null,
    isShownKey: string | null = null,
  ) => {
    setFormValue(prevFormValue => {
      const updatedFormValue = { ...prevFormValue };
      if (linkKey !== null) {
        updatedFormValue[linkKey] = {
          ...updatedFormValue[linkKey],
          link: value as string,
        };
      }
      if (isShownKey !== null) {
        updatedFormValue[isShownKey] = {
          ...updatedFormValue[isShownKey],
          isShown: value as boolean,
        };
      }
      if (key !== null && linkKey === null) {
        updatedFormValue[key] = {
          ...updatedFormValue[key],
          value: value as string,
        };
      }
      return updatedFormValue;
    });
  };

  const pageTextSubmit = async () => {
    try {
      const transformedFormValue = Object.values(formValue);
      await PageTextsAPI.editPageTexts(transformedFormValue);
      return transformedFormValue;
    } catch (error) {
      throw error;
    }
  };

  useImperativeHandle(ref, () => ({
    pageTextSubmit: pageTextSubmit,
  }));

  return (
    <>
      {formValue['mainpage_title'] && (
        <form ref={formRef}>
          <Box sx={styles.inputsWrapper}>
            <Input
              sx={styles.input}
              label="Заголовок"
              name="mainpage_title"
              value={formValue['mainpage_title'].value}
              onChange={(value: string) =>
                handleInputChange('mainpage_title', value)
              }
            />
            <TextArea
              sx={styles.textArea}
              label="Опис під заголовком"
              value={formValue['mainpage_description'].value}
              onChange={(value: string) =>
                handleInputChange('mainpage_description', value)
              }
            />
          </Box>

          <Box sx={styles.inputsWrapper}>
            <Typography variant="body1">Кнопки</Typography>
            <Box sx={styles.miniInputsWrapper}>
              <Input
                sx={styles.miniInput}
                label="Праймері"
                name="mainpage_primary"
                value={formValue['mainpage_primary'].value}
                onChange={(value: string) =>
                  handleInputChange('mainpage_primary', value)
                }
              />
              <Input
                sx={styles.mediumInput}
                label="Посилання"
                name="mainpage_primary_resource"
                placeholder="https://"
                value={formValue['mainpage_primary'].link || ''}
                onChange={(value: string) =>
                  handleInputChange(null, value, 'mainpage_primary', null)
                }
              />
              <Switch
                label="Наявність кнопки"
                labelPlacement={SwitchLabelPlacement.START}
                checked={formValue['mainpage_primary'].isShown}
                onChange={checked =>
                  handleInputChange(null, checked, null, 'mainpage_primary')
                }
              />
            </Box>
            <Box sx={styles.miniInputsWrapper}>
              <Input
                sx={styles.miniInput}
                label="Секондарі"
                name="mainpage_secondary"
                value={formValue['mainpage_secondary'].value}
                onChange={(value: string) =>
                  handleInputChange('mainpage_secondary', value)
                }
              />
              <Input
                sx={styles.mediumInput}
                label="Посилання"
                name="mainpage_secondary_resource"
                placeholder="https://"
                value={formValue['mainpage_secondary'].link || ''}
                onChange={(value: string) =>
                  handleInputChange(null, value, 'mainpage_secondary', null)
                }
              />
              <Switch
                label="Наявність кнопки"
                labelPlacement={SwitchLabelPlacement.START}
                checked={formValue['mainpage_secondary'].isShown}
                onChange={checked =>
                  handleInputChange(null, checked, null, 'mainpage_secondary')
                }
              />
            </Box>
          </Box>

          <Box sx={styles.resourcesTitle}>
            <Typography variant="body1">Студентські ресурси</Typography>
            <Input
              sx={styles.input}
              label="Заголовок"
              name="mainpage_studentresources_title"
              value={formValue['mainpage_studentresources_title'].value}
              onChange={(value: string) =>
                handleInputChange('mainpage_studentresources_title', value)
              }
            />
          </Box>
        </form>
      )}
    </>
  );
});
export default PageTextsForm;
