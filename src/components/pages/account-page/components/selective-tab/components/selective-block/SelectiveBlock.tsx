import { FC, useState } from 'react';
import { Box, Typography } from '@mui/material';

import PencilIcon from '@/components/common/icons/PencilIcon';
import OpenedSelective from '@/components/pages/account-page/components/selective-tab/components/opened-selective';
import { fillArray } from '@/components/pages/account-page/components/selective-tab/components/selective-block/utils';

import * as styles from './SelectiveBlock.styles';

interface SelectiveBlockProps {
  userId: string;
  semester: 1 | 2;
  year: number;
  disciplines: string[];
  disciplinesNumber: number;
  refetch: () => void;
  onOpenBlock: (num: number) => void;
}

const semesterMap = {
  1: 'I',
  2: 'II',
};

const SelectiveBlock: FC<SelectiveBlockProps> = ({
  disciplinesNumber,
  disciplines,
  semester,
  year,
  refetch,
  onOpenBlock,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isAllChosen = disciplines?.length === disciplinesNumber;
  const filledDisciplines = fillArray(
    disciplines,
    disciplinesNumber,
    'Не обрано',
  );

  const handleIconClick = () => {
    setIsOpen(true);
    onOpenBlock(1);
  };

  const handleSubmit = () => {
    setIsOpen(false);
    onOpenBlock(-1);
    refetch();
  };

  return (
    <>
      {isOpen ? (
        <OpenedSelective
          semester={semester}
          year={year}
          onSubmit={handleSubmit}
        />
      ) : (
        <Box sx={styles.wrapper}>
          <Box sx={styles.cardHeader}>
            <Typography variant="h6">{`${semesterMap[semester]} семестр ${year}`}</Typography>
            {!isAllChosen && <PencilIcon onClick={handleIconClick} />}
          </Box>
          <Box sx={styles.disciplines}>
            {filledDisciplines.map((discipline, index) => (
              <Typography key={index}>{discipline}</Typography>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default SelectiveBlock;
