'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { PollDatesResponse } from '@fictadvisor/utils/responses';
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

// `datetime-local` wants local wall-clock time, while the API speaks UTC ISO.
const toInput = (value: string | null) => {
  if (!value) return '';
  const date = new Date(value);
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

const semesterKey = ({ year, semester }: { year: number; semester: number }) =>
  `${year}-${semester}`;

const semesterLabel = ({
  year,
  semester,
}: {
  year: number;
  semester: number;
}) => `${year} — ${semester} семестр`;

const Page = () => {
  const toast = useToast();
  const { displayError } = useToastError();

  const [pollDates, setPollDates] = useState<PollDatesResponse[]>([]);
  const [edited, setEdited] = useState<
    Record<string, { startPoll: string; endPoll: string }>
  >({});
  const [added, setAdded] = useState({
    target: '',
    startPoll: '',
    endPoll: '',
  });
  const [toDelete, setToDelete] = useState<PollDatesResponse | null>(null);

  const refresh = useCallback(async () => {
    try {
      const { pollDates } = await DatesAPI.getPollDates();
      setPollDates(pollDates);
      setEdited({});
    } catch (error) {
      displayError(error);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  // The API answers with a row per semester, set or not. Only the ones that
  // carry borders belong in the table; the rest are what can still be added.
  const filled = useMemo(
    () => pollDates.filter(({ startPoll, endPoll }) => startPoll ?? endPoll),
    [pollDates],
  );
  const unset = useMemo(
    () => pollDates.filter(({ startPoll, endPoll }) => !startPoll && !endPoll),
    [pollDates],
  );

  const valueOf = (row: PollDatesResponse, field: 'startPoll' | 'endPoll') =>
    edited[semesterKey(row)]?.[field] ?? toInput(row[field]);

  const handleEdit = (
    row: PollDatesResponse,
    field: 'startPoll' | 'endPoll',
    value: string,
  ) => {
    const key = semesterKey(row);
    setEdited(previous => ({
      ...previous,
      [key]: {
        startPoll: previous[key]?.startPoll ?? toInput(row.startPoll),
        endPoll: previous[key]?.endPoll ?? toInput(row.endPoll),
        [field]: value,
      },
    }));
  };

  const handleSave = async (row: PollDatesResponse) => {
    const changes = edited[semesterKey(row)];
    if (!changes?.startPoll || !changes?.endPoll) return;

    try {
      await DatesAPI.updatePollDates(row.year, row.semester, {
        startPoll: new Date(changes.startPoll),
        endPoll: new Date(changes.endPoll),
      });
      toast.success('Дати опитування збережено', '', 4000);
      await refresh();
    } catch (error) {
      displayError(error);
    }
  };

  const handleAdd = async () => {
    const target = unset.find(row => semesterKey(row) === added.target);
    if (!target || !added.startPoll || !added.endPoll) return;

    try {
      await DatesAPI.updatePollDates(target.year, target.semester, {
        startPoll: new Date(added.startPoll),
        endPoll: new Date(added.endPoll),
      });
      toast.success('Дати опитування додано', '', 4000);
      setAdded({ target: '', startPoll: '', endPoll: '' });
      await refresh();
    } catch (error) {
      displayError(error);
    }
  };

  const handleDelete = async () => {
    if (!toDelete) return;

    try {
      await DatesAPI.deletePollDates(toDelete.year, toDelete.semester);
      toast.success('Дати опитування видалено', '', 4000);
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
        <CardHeader title="Дати опитувань" sx={styles.title} />
      </Box>

      <Box sx={styles.section}>
        <Typography variant="body1Medium" sx={styles.sectionTitle}>
          Додати дати опитування
        </Typography>
        {unset.length ? (
          <Box sx={styles.controls}>
            <TextField
              select
              size="small"
              label="Семестр"
              sx={{ ...styles.field, minWidth: '220px' }}
              slotProps={styles.selectSlotProps}
              value={added.target}
              onChange={event =>
                setAdded({ ...added, target: event.target.value })
              }
            >
              {unset.map(row => (
                <MenuItem key={semesterKey(row)} value={semesterKey(row)}>
                  {semesterLabel(row)}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              size="small"
              type="datetime-local"
              label="Початок"
              sx={styles.field}
              slotProps={{ inputLabel: { shrink: true } }}
              value={added.startPoll}
              onChange={event =>
                setAdded({ ...added, startPoll: event.target.value })
              }
            />
            <TextField
              size="small"
              type="datetime-local"
              label="Кінець"
              sx={styles.field}
              slotProps={{ inputLabel: { shrink: true } }}
              value={added.endPoll}
              onChange={event =>
                setAdded({ ...added, endPoll: event.target.value })
              }
            />
            <Button
              size={ButtonSize.MEDIUM}
              text="Додати"
              sx={styles.actionButton}
              disabled={!added.target || !added.startPoll || !added.endPoll}
              onClick={handleAdd}
            />
          </Box>
        ) : (
          <Typography sx={styles.empty}>
            Межі задані для всіх семестрів
          </Typography>
        )}
      </Box>

      <Box sx={styles.section}>
        <Typography variant="body1Medium" sx={styles.sectionTitle}>
          Задані дати
        </Typography>
        <Typography variant="body2" sx={styles.sectionTitle}>
          Опитування семестру відкривається і закривається за цими датами. Поки
          межі не задані, опитування за семестр не приймається.
        </Typography>
        {filled.length ? (
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
                {filled.map(row => (
                  <TableRow key={semesterKey(row)}>
                    <TableCell>{row.year}</TableCell>
                    <TableCell>{row.semester}</TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        type="datetime-local"
                        value={valueOf(row, 'startPoll')}
                        onChange={event =>
                          handleEdit(row, 'startPoll', event.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        type="datetime-local"
                        value={valueOf(row, 'endPoll')}
                        onChange={event =>
                          handleEdit(row, 'endPoll', event.target.value)
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
                          disabled={!edited[semesterKey(row)]}
                          onClick={() => handleSave(row)}
                        />
                        <Button
                          size={ButtonSize.SMALL}
                          variant={ButtonVariant.OUTLINE}
                          color={ButtonColor.SECONDARY}
                          startIcon={<TrashIcon width={16} height={16} />}
                          text="Видалити"
                          sx={styles.rowButton}
                          onClick={() => setToDelete(row)}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        ) : (
          <Typography sx={styles.empty}>
            Дат опитувань ще немає — додай їх для потрібного семестру
          </Typography>
        )}
      </Box>

      {toDelete && (
        <DeletePopup
          setPopupOpen={() => setToDelete(null)}
          handleDeleteSubmit={handleDelete}
          name={`дати опитування за ${semesterLabel(toDelete)}`}
        />
      )}
    </Box>
  );
};

export default Page;
