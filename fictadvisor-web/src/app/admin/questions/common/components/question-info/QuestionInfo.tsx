'use client';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import {
  Divider,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from '@mui/material';

import { Dropdown, TextArea } from '@/components/common/ui/form';
import { FieldSize } from '@/components/common/ui/form/common/types';
import Input from '@/components/common/ui/form/input-mui';
import { InputSize } from '@/components/common/ui/form/input-mui/types';
import { TextAreaSize } from '@/components/common/ui/form/text-area-mui/types';
import mergeSx from '@/lib/utils/MergeSxStylesUtil';
import { QuestionType } from '@/types/poll';

import {
  displayOptions,
  initialQuestionInfoValues,
  typesOptions,
} from '../../constants';
import { AdminQuestion, AdminQuestionDisplay } from '../../types';

import * as styles from './QuestionInfo.styles';

interface QuestionInfoProps {
  question?: AdminQuestion;
  handleChanges: (values: AdminQuestion) => void;
}

const QuestionInfo: FC<QuestionInfoProps> = ({ question, handleChanges }) => {
  const [questionInfo, setQuestionInfo] = useState<AdminQuestion>(
    initialQuestionInfoValues,
  );
  const [orderValue, setOrderValue] = useState<number | string>('');

  useEffect(() => {
    if (question) {
      setQuestionInfo({
        ...question,
      });
      setOrderValue(question.order);
    }
  }, [question]);

  useEffect(() => {
    handleChanges({
      ...questionInfo,
    });
  }, [questionInfo]);

  const handleOrder = (value: string) => {
    if (!new RegExp('^[0-9]*$').test(value) || value == '') {
      setOrderValue('');
      setQuestionInfo(prev => ({ ...prev, order: 0 }));
    } else {
      setOrderValue(parseInt(value));
      setQuestionInfo(prev => ({ ...prev, order: parseInt(value) }));
    }
  };

  return (
    <Stack sx={styles.infoSection} flexDirection="column" gap="14px">
      <Input
        sx={styles.input}
        size={InputSize.MEDIUM}
        label="Порядковий номер"
        value={orderValue.toString()}
        onChange={value => handleOrder(value)}
        showRemark={false}
      />
      <Input
        sx={styles.input}
        size={InputSize.MEDIUM}
        label="Назва"
        value={questionInfo.name}
        onChange={value => setQuestionInfo(prev => ({ ...prev, name: value }))}
        showRemark={false}
      />
      <Input
        sx={styles.input}
        size={InputSize.MEDIUM}
        label="Текст"
        value={questionInfo.text}
        onChange={value => setQuestionInfo(prev => ({ ...prev, text: value }))}
        showRemark={false}
      />
      <Input
        sx={styles.input}
        size={InputSize.MEDIUM}
        label="Категорія"
        value={questionInfo.category}
        onChange={value =>
          setQuestionInfo(prev => ({ ...prev, category: value }))
        }
        showRemark={false}
      />
      <TextArea
        sx={styles.textarea}
        size={TextAreaSize.MEDIUM}
        value={questionInfo.description as string}
        label="Опис до питання"
        onChange={value =>
          setQuestionInfo(prev => ({ ...prev, description: value }))
        }
        showRemark={false}
      />
      <TextArea
        sx={styles.textarea}
        size={TextAreaSize.MEDIUM}
        value={questionInfo.criteria as string}
        label="Опис критеріїв"
        onChange={value =>
          setQuestionInfo(prev => ({ ...prev, criteria: value }))
        }
        showRemark={false}
      />
      <Dropdown
        size={FieldSize.MEDIUM}
        label="Тип відповідей"
        value={questionInfo.type}
        options={typesOptions}
        onChange={id =>
          setQuestionInfo(prev => ({ ...prev, type: id as QuestionType }))
        }
        disableClearable
        showRemark={false}
      />
      <FormControlLabel
        sx={mergeSx(styles.switchWrapper)}
        control={
          <Switch
            sx={styles.switchStyle}
            checked={questionInfo.isRequired}
            onChange={(e, value) =>
              setQuestionInfo(prev => ({ ...prev, isRequired: value }))
            }
          />
        }
        label={<Typography sx={styles.switchLabel}>Обов’язковість</Typography>}
        labelPlacement="start"
      />
      <Divider orientation="horizontal" sx={styles.divider} />
      <Dropdown
        size={FieldSize.MEDIUM}
        label="Тип відображення"
        value={questionInfo.display}
        options={displayOptions}
        onChange={id =>
          setQuestionInfo(prev => ({
            ...prev,
            display: id as AdminQuestionDisplay,
          }))
        }
        disableClearable
        showRemark={false}
      />
    </Stack>
  );
};

export default QuestionInfo;
