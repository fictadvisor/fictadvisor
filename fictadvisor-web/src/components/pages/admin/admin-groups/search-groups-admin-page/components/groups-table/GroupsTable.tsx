import React, { FC } from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import { CathedraColors } from '@/components/common/ui/cards/card-roles/CardRoles';
import { TrashBucketButton } from '@/components/common/ui/icon-button-mui/variants';
import Tag from '@/components/common/ui/tag';
import { TagSize, TagVariant } from '@/components/common/ui/tag/types';
import { Group } from '@/types/group';

import mergeSx from './../../../../../../../lib/utils/MergeSxStylesUtil';
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
                <Stack sx={styles.tableColumn}>
                  <Button
                    href={`/admin/groups/edit/${group.id}`}
                    text="Редагувати"
                    variant={ButtonVariant.OUTLINE}
                    startIcon={<PencilSquareIcon />}
                    size={ButtonSize.SMALL}
                    sx={styles.button}
                  />
                  <TrashBucketButton onClick={() => deleteGroup(group.id)} />
                </Stack>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default GroupsTable;
