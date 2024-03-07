import React, { FC } from 'react';
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { CathedraColors } from '@/components/common/ui/cards/card-roles/CardRoles';
import Tag from '@/components/common/ui/tag';
import { TagSize, TagVariant } from '@/components/common/ui/tag/types';
import { Group } from '@/types/group';

import mergeSx from './../../../../../../../lib/utils/MergeSxStylesUtil';
import TableActions from './components/table-actions';
import * as styles from './GroupsTable.styles';

interface GroupsTableProps {
  groups?: Group[];
  isLoading?: boolean;
  count: number;
  deleteGroup: (id: string) => Promise<void>;
}

const GroupsTable: FC<GroupsTableProps> = ({ groups, deleteGroup }) => {
  return (
    <Table>
      <TableHead>
        <TableCell sx={styles.headItem}>Група</TableCell>
        <TableCell sx={styles.headItem}>Староста</TableCell>
        <TableCell sx={styles.headItem}>Курс</TableCell>
        <TableCell sx={styles.headItem}>Спеціальність</TableCell>
        <TableCell sx={styles.headItem}>Кафедра</TableCell>
        <TableCell sx={styles.headItem} />
      </TableHead>
      <TableBody>
        {groups &&
          groups.map((group, index) => (
            <TableRow key={index}>
              <TableCell sx={styles.bodyItem}>
                <Stack sx={styles.tableColumn}>
                  <Typography>{group.code}</Typography>
                </Stack>
              </TableCell>
              <TableCell sx={styles.bodyItem}>
                <Stack sx={styles.tableColumn}>
                  {`${group.captain.lastName || ''} ${
                    group.captain.firstName || ''
                  } ${group.captain.middleName || ''}`}
                </Stack>
              </TableCell>
              <TableCell sx={styles.bodyItem}>
                <Stack sx={styles.tableColumn}>
                  {new Date().getFullYear() - group.admissionYear}
                </Stack>
              </TableCell>
              <TableCell sx={styles.bodyItem}>
                <Stack sx={styles.tableColumn}>{group.speciality.code}</Stack>
              </TableCell>
              <TableCell sx={styles.bodyItem}>
                <Stack sx={styles.tableColumn}>
                  <Tag
                    key={group.cathedra.id}
                    text={group.cathedra.abbreviation}
                    variant={TagVariant.OUTLINE}
                    color={CathedraColors[group.cathedra.abbreviation]}
                    size={TagSize.SMALL}
                    sx={styles.tag}
                  />
                </Stack>
              </TableCell>
              <TableCell
                sx={mergeSx(styles.bodyItem, {
                  '.MuiStack-root': { justifyContent: 'end' },
                })}
              >
                <TableActions group={group} deleteGroup={deleteGroup} />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default GroupsTable;
