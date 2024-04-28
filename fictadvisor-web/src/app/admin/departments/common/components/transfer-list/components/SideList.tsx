import React, { FC, useState } from 'react';
import { TeacherWithRolesAndCathedrasResponse } from '@fictadvisor/utils/responses';
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

import * as styles from './SideList.styles';

interface SideListProps {
  teachers: TeacherWithRolesAndCathedrasResponse[];
  title: string;
  checked: TeacherWithRolesAndCathedrasResponse[];
  onCheck: (newChecked: TeacherWithRolesAndCathedrasResponse[]) => void;
}
const SideList: FC<SideListProps> = ({ teachers, title, checked, onCheck }) => {
  const [sideChecked, setSideChecked] =
    useState<TeacherWithRolesAndCathedrasResponse[]>(checked);
  const [currPage, setCurrPage] = useState(0);

  const firstItem = currPage * 5;
  const lastItem = firstItem + 5;
  const currentItems = teachers.slice(firstItem, lastItem);
  const handleToggle = (value: TeacherWithRolesAndCathedrasResponse) => () => {
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
        {currentItems.map((teacher: TeacherWithRolesAndCathedrasResponse) => {
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
            page={currPage}
            rowsPerPage={5}
            onPageChange={(e, page) => setCurrPage(page)}
          />
        </TableRow>
      </Table>
    </Box>
  );
};

export default SideList;
