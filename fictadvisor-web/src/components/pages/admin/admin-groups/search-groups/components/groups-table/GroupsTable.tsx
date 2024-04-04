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
import * as stylesAdmin from '@/components/pages/admin/common/styles/AdminPages.styles';
import mergeSx from '@/lib/utils/MergeSxStylesUtil';
import { Group } from '@/types/group';

import TableActions from './components/table-actions';

interface GroupsTableProps {
  groups: Group[];
  deleteGroup: (id: string) => Promise<void>;
}

const GroupsTable: FC<GroupsTableProps> = ({ groups, deleteGroup }) => {
  return (
    <Table>
      <TableHead>
        <TableCell sx={stylesAdmin.headItem}>Група</TableCell>
        <TableCell sx={stylesAdmin.headItem}>Староста</TableCell>
        <TableCell sx={stylesAdmin.headItem}>Курс</TableCell>
        <TableCell sx={stylesAdmin.headItem}>Спеціальність</TableCell>
        <TableCell sx={stylesAdmin.headItem}>Кафедра</TableCell>
        <TableCell sx={stylesAdmin.headItem} />
      </TableHead>
      <TableBody>
        {groups.map(group => (
          <TableRow key={group.id}>
            <TableCell sx={stylesAdmin.bodyItem}>
              <Stack sx={stylesAdmin.tableColumn}>
                <Typography>{group.code}</Typography>
              </Stack>
            </TableCell>
            <TableCell sx={stylesAdmin.bodyItem}>
              <Stack sx={stylesAdmin.tableColumn}>
                {`${group.captain.lastName || ''} ${
                  group.captain.firstName || ''
                } ${group.captain.middleName || ''}`}
              </Stack>
            </TableCell>
            <TableCell sx={stylesAdmin.bodyItem}>
              <Stack sx={stylesAdmin.tableColumn}>
                {new Date().getFullYear() - group.admissionYear}
              </Stack>
            </TableCell>
            <TableCell sx={stylesAdmin.bodyItem}>
              <Stack sx={stylesAdmin.tableColumn}>
                {group.speciality.code}
              </Stack>
            </TableCell>
            <TableCell sx={stylesAdmin.bodyItem}>
              <Stack sx={stylesAdmin.tableColumn}>
                <Tag
                  key={group.cathedra.id}
                  text={group.cathedra.abbreviation}
                  variant={TagVariant.OUTLINE}
                  color={CathedraColors[group.cathedra.abbreviation]}
                  size={TagSize.SMALL}
                  sx={stylesAdmin.tag}
                />
              </Stack>
            </TableCell>
            <TableCell
              sx={mergeSx(stylesAdmin.bodyItem, {
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
