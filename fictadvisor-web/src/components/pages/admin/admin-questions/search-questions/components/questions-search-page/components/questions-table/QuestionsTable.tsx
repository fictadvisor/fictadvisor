import React, { FC } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

import { typesOptions } from '@/components/pages/admin/admin-questions/common/constants';
import { AdminQuestion } from '@/components/pages/admin/admin-questions/common/types';
import * as stylesAdmin from '@/components/pages/admin/common/styles/AdminPages.styles';
import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import TableActions from './components/table-actions';

interface QuestionAdminSearchProps {
  questions?: AdminQuestion[];
  deleteQuestion: (id: string) => Promise<void>;
}

const QuestionsTable: FC<QuestionAdminSearchProps> = ({
  questions,
  deleteQuestion,
}) => {
  return (
    <Table>
      <TableHead>
        <TableCell sx={stylesAdmin.headItem}>№</TableCell>
        <TableCell sx={mergeSx(stylesAdmin.headItem, { minWidth: '525px' })}>
          Питання
        </TableCell>
        <TableCell sx={stylesAdmin.headItem}>Категорія</TableCell>
        <TableCell sx={stylesAdmin.headItem}>Тип відповіді</TableCell>
        <TableCell sx={stylesAdmin.headItem} />
      </TableHead>
      <TableBody>
        {questions &&
          questions.map(question => (
            <TableRow key={question.id}>
              <TableCell sx={stylesAdmin.bodyItem}>{question.order}</TableCell>
              <TableCell sx={stylesAdmin.bodyItem}>{question.text}</TableCell>
              <TableCell sx={stylesAdmin.bodyItem}>
                {question.category}
              </TableCell>
              <TableCell sx={stylesAdmin.bodyItem}>
                {typesOptions.find(x => x.id == question.type)?.label}
              </TableCell>
              <TableCell sx={stylesAdmin.bodyItem}>
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
