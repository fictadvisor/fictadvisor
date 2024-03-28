import React, { FC, useState } from 'react';
import {
  Box,
  Table,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';

import Checkbox from '@/components/common/ui/form/checkbox';
import { Teacher } from '@/types/teacher';

import * as styles from './SideList.styles';

interface SideListProps {
  teachers: Teacher[];
  title: string;
  checked: Teacher[];
  onCheck: (newChecked: Teacher[]) => void;
}
const SideList: FC<SideListProps> = ({ teachers, title, checked, onCheck }) => {
  const [sideChecked, setSideChecked] = useState<Teacher[]>(checked);
  const [curPage, setCurPage] = useState(0);

  const firstItem = curPage * 5;
  const lastItem = firstItem + 5;
  const currentItems = teachers.slice(firstItem, lastItem);
  const handleToggle = (value: Teacher) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setSideChecked(newChecked);
    onCheck(newChecked);
  };

  return (
    <Box sx={styles.list}>
      <Table>
        <TableHead>
          <Typography sx={styles.listHeading}>{`${title}`}</Typography>
        </TableHead>
        {currentItems.map((teacher: Teacher) => {
          return (
            <TableRow
              onClick={handleToggle(teacher)}
              key={teacher.id}
              sx={styles.row}
            >
              <TableCell sx={styles.bodyItem}>
                <Checkbox
                  checked={sideChecked.indexOf(teacher) !== -1}
                  sx={{ width: '20px' }}
                />
              </TableCell>
              <TableCell sx={styles.bodyItem}>
                <Box
                  component="img"
                  src={teacher.avatar}
                  alt="photo"
                  sx={styles.avatar}
                />
              </TableCell>
              <TableCell sx={styles.bodyItem}>
                <Typography>
                  {teacher.lastName} {teacher.firstName} {teacher.middleName}
                </Typography>
              </TableCell>
            </TableRow>
          );
        })}
        <TableRow sx={styles.row}>
          <TablePagination
            sx={styles.pagination}
            count={teachers.length}
            page={curPage}
            rowsPerPage={5}
            onPageChange={(e, page) => setCurPage(page)}
          />
        </TableRow>
      </Table>
    </Box>
  );
};

export default SideList;
