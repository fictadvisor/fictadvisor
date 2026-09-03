'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  SelectiveFileResponse,
  StudyingSemester,
} from '@fictadvisor/utils/responses';
import { PlayIcon, TrashIcon } from '@heroicons/react/24/outline';
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
import SelectiveFileAPI from '@/lib/api/selective-file/SelectiveFileAPI';

const ACCEPTED_EXTENSIONS = '.csv,.xlsx,.xls';

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} Б`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} КБ`;
  return `${(bytes / 1024 / 1024).toFixed(1)} МБ`;
};

const formatDateTime = (value: string) =>
  new Date(value).toLocaleString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

const semesterKey = ({ year, semester }: { year: number; semester: number }) =>
  `${year}-${semester}`;

const Page = () => {
  const toast = useToast();
  const { displayError } = useToastError();

  const [files, setFiles] = useState<SelectiveFileResponse[]>([]);
  const [semesters, setSemesters] = useState<StudyingSemester[]>([]);
  const [uploadYear, setUploadYear] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [parseTarget, setParseTarget] = useState('');
  const [fileToDelete, setFileToDelete] =
    useState<SelectiveFileResponse | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  // Cleared on every new run so an old report is never read as the new one.
  const [report, setReport] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const { files } = await SelectiveFileAPI.getAll();
      setFiles(files);
    } catch (error) {
      displayError(error);
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const { semesters } = await DatesAPI.getAllSemesters();
        setSemesters(semesters);
      } catch (error) {
        displayError(error);
      }
    };

    void load();
    void refresh();
  }, [refresh]);

  // The years to upload for come from the configured semesters, so a file can
  // never be filed under a year the schedule knows nothing about.
  const years = useMemo(
    () =>
      Array.from(new Set(semesters.map(({ year }) => year))).sort(
        (a, b) => b - a,
      ),
    [semesters],
  );

  // Only semesters whose year has a file can be imported.
  const parsableSemesters = useMemo(() => {
    const uploadedYears = new Set(files.map(({ year }) => year));
    return semesters.filter(({ year }) => uploadedYears.has(year));
  }, [files, semesters]);

  const handleUpload = async () => {
    if (!file || !uploadYear) return;

    setIsUploading(true);
    try {
      await SelectiveFileAPI.upload(+uploadYear, file);
      toast.success(`Файл за ${uploadYear} рік завантажено`, '', 4000);
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      await refresh();
    } catch (error) {
      displayError(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!fileToDelete) return;

    try {
      await SelectiveFileAPI.delete(fileToDelete.year);
      toast.success(`Файл за ${fileToDelete.year} рік видалено`, '', 4000);
      await refresh();
    } catch (error) {
      displayError(error);
    } finally {
      setFileToDelete(null);
    }
  };

  const handleParse = async () => {
    const target = parsableSemesters.find(
      semester => semesterKey(semester) === parseTarget,
    );
    if (!target) return;

    setIsParsing(true);
    setReport(null);
    try {
      const result = await SelectiveFileAPI.parse(target.year, target.semester);
      setReport(
        [
          `Груп у файлі: ${result.groups}`,
          `Пропущено невідомих груп: ${result.skippedGroups}`,
          `Створено дисциплін: ${result.createdDisciplines}`,
          `Призначено вибірок: ${result.assignedSelectives}`,
          `Видалено зайвих дисциплін: ${result.deletedDisciplines}`,
        ].join('\n'),
      );
      toast.success('Парсер відпрацював', '', 4000);
    } catch (error) {
      displayError(error);
    } finally {
      setIsParsing(false);
    }
  };

  return (
    <Box sx={styles.page}>
      <Box sx={styles.header}>
        <CardHeader title="Вибіркові дисципліни" sx={styles.title} />
      </Box>

      <Box sx={styles.section}>
        <Typography variant="body1Medium" sx={styles.sectionTitle}>
          Завантажити файл
        </Typography>
        <Box sx={styles.controls}>
          <TextField
            select
            size="small"
            label="Рік"
            sx={styles.field}
            slotProps={styles.selectSlotProps}
            value={uploadYear}
            onChange={event => setUploadYear(event.target.value)}
          >
            {years.map(year => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </TextField>
          <Button
            size={ButtonSize.MEDIUM}
            variant={ButtonVariant.OUTLINE}
            color={ButtonColor.SECONDARY}
            text="Обрати файл"
            sx={styles.actionButton}
            onClick={() => fileInputRef.current?.click()}
          />
          <input
            ref={fileInputRef}
            hidden
            type="file"
            accept={ACCEPTED_EXTENSIONS}
            onChange={event => setFile(event.target.files?.[0] ?? null)}
          />
          <Typography variant="body2" sx={styles.fileName}>
            {file ? file.name : 'Файл не обрано'}
          </Typography>
          <Button
            size={ButtonSize.MEDIUM}
            text="Завантажити"
            sx={styles.actionButton}
            disabled={!file || !uploadYear || isUploading}
            onClick={handleUpload}
          />
        </Box>
        <Typography variant="body2" sx={styles.sectionTitle}>
          Ім&apos;я файлу задає сервер за обраним роком, до 5 МБ. Завантаження
          замінює файл, який уже є за цей рік.
        </Typography>
      </Box>

      <Box sx={styles.section}>
        <Typography variant="body1Medium" sx={styles.sectionTitle}>
          Завантажені файли
        </Typography>
        {files.length ? (
          <Box sx={styles.table}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Рік</TableCell>
                  <TableCell>Файл</TableCell>
                  <TableCell>Розмір</TableCell>
                  <TableCell>Оновлено</TableCell>
                  <TableCell align="right">Дії</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {files.map(selectiveFile => (
                  <TableRow key={selectiveFile.year}>
                    <TableCell>{selectiveFile.year}</TableCell>
                    <TableCell>{selectiveFile.name}</TableCell>
                    <TableCell>{formatSize(selectiveFile.size)}</TableCell>
                    <TableCell>
                      {formatDateTime(selectiveFile.updatedAt)}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        size={ButtonSize.SMALL}
                        variant={ButtonVariant.OUTLINE}
                        color={ButtonColor.SECONDARY}
                        startIcon={<TrashIcon width={16} height={16} />}
                        text="Видалити"
                        sx={styles.rowButton}
                        onClick={() => setFileToDelete(selectiveFile)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        ) : (
          <Typography sx={styles.empty}>Файлів ще немає</Typography>
        )}
      </Box>

      <Box sx={styles.section}>
        <Typography variant="body1Medium" sx={styles.sectionTitle}>
          Імпорт вибірок
        </Typography>
        <Box sx={styles.controls}>
          <TextField
            select
            size="small"
            label="Семестр"
            sx={{ ...styles.field, minWidth: '220px' }}
            slotProps={styles.selectSlotProps}
            value={parseTarget}
            onChange={event => setParseTarget(event.target.value)}
          >
            {parsableSemesters.map(semester => (
              <MenuItem
                key={semesterKey(semester)}
                value={semesterKey(semester)}
              >
                {`${semester.year} — ${semester.semester} семестр`}
              </MenuItem>
            ))}
          </TextField>
          <Button
            size={ButtonSize.MEDIUM}
            text="Запустити парсер"
            sx={styles.actionButton}
            startIcon={<PlayIcon width={16} height={16} />}
            disabled={!parseTarget || isParsing}
            onClick={handleParse}
          />
        </Box>
        <Typography variant="body2" sx={styles.sectionTitle}>
          Файл містить обидва семестри року — парсер бере рядки лише того, який
          обрано.
        </Typography>
        {report && <Typography sx={styles.summary}>{report}</Typography>}
      </Box>

      {fileToDelete && (
        <DeletePopup
          setPopupOpen={() => setFileToDelete(null)}
          handleDeleteSubmit={handleDelete}
          name={`файл за ${fileToDelete.year} рік`}
        />
      )}
    </Box>
  );
};

export default Page;
