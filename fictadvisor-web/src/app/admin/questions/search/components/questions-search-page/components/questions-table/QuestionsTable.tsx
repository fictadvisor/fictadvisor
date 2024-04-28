import React, { FC } from 'react';
import { QuestionResponse } from '@fictadvisor/utils/responses';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import { typesOptions } from '@/app/admin/questions/common/constants';
import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import TableActions from './components/table-actions';

interface QuestionAdminSearchProps {
  questions?: QuestionResponse[];
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
