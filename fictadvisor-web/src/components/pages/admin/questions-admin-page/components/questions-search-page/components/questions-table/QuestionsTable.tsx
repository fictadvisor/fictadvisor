import React, { FC } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { isAxiosError } from 'axios';

import useToast from '@/hooks/use-toast';
import QuestionAPI from '@/lib/api/questions/QuestionAPI';
import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import { typesOptions } from '../../../../constants';
import { AdminQuestion } from '../../../../types';

import TableActions from './components/table-actions';
import * as styles from './QuestionsTable.styles';

interface QuestionAdminSearchProps {
  questions?: AdminQuestion[];
}

const QuestionsTable: FC<QuestionAdminSearchProps> = ({ questions }) => {
  const toast = useToast();

  const deleteQuestion = async (id: string) => {
    try {
      await QuestionAPI.deleteQuestion(id);
      toast.success('Питання успішно видалено', '', 4000);
    } catch (e) {
      if (isAxiosError(e)) {
        toast.error(e.response?.data.messages[0]);
      }
    }
  };

  return (
    <Table>
      <TableHead>
        <TableCell sx={styles.headItem}>№</TableCell>
        <TableCell sx={mergeSx(styles.headItem, { minWidth: '525px' })}>
          Питання
        </TableCell>
        <TableCell sx={styles.headItem}>Категорія</TableCell>
        <TableCell sx={styles.headItem}>Тип відповіді</TableCell>
        <TableCell sx={styles.headItem} />
      </TableHead>
      <TableBody>
        {questions &&
          questions.map((question, index) => (
            <TableRow key={index}>
              <TableCell sx={styles.bodyItem}>{question.order}</TableCell>
              <TableCell sx={styles.bodyItem}>{question.text}</TableCell>
              <TableCell sx={styles.bodyItem}>{question.category}</TableCell>
              <TableCell sx={styles.bodyItem}>
                {typesOptions.find(x => x.id == question.type)?.label}
              </TableCell>
              <TableCell sx={styles.bodyItem}>
                <TableActions
                  question={question}
                  deleteQuestion={deleteQuestion}
                />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default QuestionsTable;
