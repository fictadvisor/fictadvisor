'use client';

import { useCallback, useEffect, useState } from 'react';
import { StudyingSemester } from '@fictadvisor/utils/responses';
import { TrashIcon } from '@heroicons/react/24/outline';
import {
  Box,
  CardHeader,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';

import * as styles from '@/app/admin/common/styles/AdminSettingsPage.styles';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import DeletePopup from '@/components/common/ui/delete-popup';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import DatesAPI from '@/lib/api/dates/DatesAPI';

const SEMESTER_NUMBERS = [1, 2];

const toDateInput = (value: string) =>
  value ? new Date(value).toISOString().slice(0, 10) : '';

const semesterKey = ({ year, semester }: { year: number; semester: number }) =>
  `${year}-${semester}`;

const Page = () => {
  const toast = useToast();
  const { displayError } = useToastError();

  const [semesters, setSemesters] = useState<StudyingSemester[]>([]);
  // Edits live next to the loaded rows so an unsaved date never looks saved.
  const [edited, setEdited] = useState<
    Record<string, { startDate: string; endDate: string }>
  >({});
  const [toDelete, setToDelete] = useState<StudyingSemester | null>(null);
  const [newSemester, setNewSemester] = useState({
    year: String(new Date().getFullYear()),
    semester: '1',
    startDate: '',
    endDate: '',
  });

  const refresh = useCallback(async () => {
    try {
      const { semesters } = await DatesAPI.getAllSemesters();
      setSemesters(semesters);
      setEdited({});
    } catch (error) {
      displayError(error);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const valueOf = (
    semester: StudyingSemester,
    field: 'startDate' | 'endDate',
  ) => edited[semesterKey(semester)]?.[field] ?? toDateInput(semester[field]);

  const handleEdit = (
    semester: StudyingSemester,
    field: 'startDate' | 'endDate',
    value: string,
  ) => {
    const key = semesterKey(semester);
    setEdited(previous => ({
      ...previous,
      [key]: {
        startDate: previous[key]?.startDate ?? toDateInput(semester.startDate),
        endDate: previous[key]?.endDate ?? toDateInput(semester.endDate),
        [field]: value,
      },
    }));
  };

  const handleSave = async (semester: StudyingSemester) => {
    const changes = edited[semesterKey(semester)];
    if (!changes) return;

    try {
      await DatesAPI.updateSemester(semester.year, semester.semester, {
        startDate: new Date(changes.startDate),
        endDate: new Date(changes.endDate),
      });
      toast.success('Семестр оновлено', '', 4000);
      await refresh();
    } catch (error) {
      displayError(error);
    }
  };

  const handleCreate = async () => {
    try {
      await DatesAPI.createSemester({
        year: +newSemester.year,
        semester: +newSemester.semester,
        startDate: new Date(newSemester.startDate),
        endDate: new Date(newSemester.endDate),
      });
      toast.success('Семестр створено', '', 4000);
      setNewSemester(previous => ({ ...previous, startDate: '', endDate: '' }));
      await refresh();
    } catch (error) {
      displayError(error);
    }
  };

  const handleDelete = async () => {
    if (!toDelete) return;

    try {
      await DatesAPI.deleteSemester(toDelete.year, toDelete.semester);
      toast.success('Семестр видалено', '', 4000);
      await refresh();
    } catch (error) {
      displayError(error);
    } finally {
      setToDelete(null);
    }
  };

  return (
    <Box sx={styles.page}>
      <Box sx={styles.header}>
        <CardHeader title="Семестри" sx={styles.title} />
      </Box>

      <Box sx={styles.section}>
        <Typography variant="body1Medium" sx={styles.sectionTitle}>
          Додати семестр
        </Typography>
        <Box sx={styles.controls}>
          <TextField
            size="small"
            type="number"
            label="Рік"
            sx={styles.field}
            value={newSemester.year}
            onChange={event =>
              setNewSemester({ ...newSemester, year: event.target.value })
            }
          />
          <TextField
            select
            size="small"
            label="Семестр"
            sx={styles.field}
            slotProps={styles.selectSlotProps}
            value={newSemester.semester}
            onChange={event =>
              setNewSemester({ ...newSemester, semester: event.target.value })
            }
          >
            {SEMESTER_NUMBERS.map(number => (
              <MenuItem key={number} value={number}>
                {number}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            size="small"
            type="date"
            label="Початок"
            sx={styles.field}
            slotProps={{ inputLabel: { shrink: true } }}
            value={newSemester.startDate}
            onChange={event =>
              setNewSemester({ ...newSemester, startDate: event.target.value })
            }
          />
          <TextField
            size="small"
            type="date"
            label="Кінець"
            sx={styles.field}
            slotProps={{ inputLabel: { shrink: true } }}
            value={newSemester.endDate}
            onChange={event =>
              setNewSemester({ ...newSemester, endDate: event.target.value })
            }
          />
          <Button
            size={ButtonSize.MEDIUM}
            text="Створити"
            sx={styles.actionButton}
            disabled={
              !newSemester.year ||
              !newSemester.startDate ||
              !newSemester.endDate
            }
            onClick={handleCreate}
          />
        </Box>
      </Box>

      <Box sx={styles.section}>
        <Typography variant="body1Medium" sx={styles.sectionTitle}>
          Наявні семестри
        </Typography>
        {semesters.length ? (
          <Box sx={styles.table}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Рік</TableCell>
                  <TableCell>Семестр</TableCell>
                  <TableCell>Початок</TableCell>
                  <TableCell>Кінець</TableCell>
                  <TableCell align="right">Дії</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {semesters.map(semester => (
                  <TableRow key={semesterKey(semester)}>
                    <TableCell>{semester.year}</TableCell>
                    <TableCell>{semester.semester}</TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        type="date"
                        value={valueOf(semester, 'startDate')}
                        onChange={event =>
                          handleEdit(semester, 'startDate', event.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        type="date"
                        value={valueOf(semester, 'endDate')}
                        onChange={event =>
                          handleEdit(semester, 'endDate', event.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Box
                        sx={{
                          display: 'flex',
                          gap: '8px',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <Button
                          size={ButtonSize.SMALL}
                          text="Зберегти"
                          sx={styles.rowButton}
                          disabled={!edited[semesterKey(semester)]}
                          onClick={() => handleSave(semester)}
                        />
                        <Button
                          size={ButtonSize.SMALL}
                          variant={ButtonVariant.OUTLINE}
                          color={ButtonColor.SECONDARY}
                          startIcon={<TrashIcon width={16} height={16} />}
                          text="Видалити"
                          sx={styles.rowButton}
                          onClick={() => setToDelete(semester)}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        ) : (
          <Typography sx={styles.empty}>Семестрів ще немає</Typography>
        )}
      </Box>

      {toDelete && (
        <DeletePopup
          setPopupOpen={() => setToDelete(null)}
          handleDeleteSubmit={handleDelete}
          name={`${toDelete.year} — ${toDelete.semester} семестр`}
        />
      )}
    </Box>
  );
};

export default Page;
