import React from 'react';
import { Box, Button, SxProps, Theme, Typography } from '@mui/material';

import { CheckIcon, DoubleCheck } from '@/components/common/icons/DoubleCheck';
import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import * as styles from './PollCard.styles';

type PollCard = {
  questionNumber: number;
  question?: string;
  numberOfAnswered: number;
  numberOfQuestions: number;
  disabled?: boolean;
  isComment?: boolean;
  isActive: boolean;
  sx?: SxProps<Theme>;
  onClick?: () => void;
};

const PollCard: React.FC<PollCard> = ({
  questionNumber,
  question,
  numberOfAnswered,
  numberOfQuestions,
  disabled,
  isComment,
  isActive,
  sx = {},
  onClick = () => {},
}) => {
  let isDoubleCheckIcon,
    showIcon = true;
  if (numberOfAnswered >= 1 && numberOfAnswered !== numberOfQuestions) {
    isDoubleCheckIcon = false;
  } else if (numberOfAnswered === numberOfQuestions) {
    isDoubleCheckIcon = true;
  } else if (numberOfAnswered === 0) showIcon = false;

  return (
    <Button onClick={onClick} sx={mergeSx(styles.card(isActive, disabled), sx)}>
      <Box sx={styles.textWrapper}>
        <Typography variant="body1Bold">
          {questionNumber}. {question}
        </Typography>
        <Typography variant="body1" sx={styles.questionNumber(disabled)}>
          {isComment
            ? 'Відкрите запитання'
            : `${numberOfAnswered}/${numberOfQuestions} запитання`}
        </Typography>
      </Box>
      <Box>
        {showIcon && (isDoubleCheckIcon ? <DoubleCheck /> : <CheckIcon />)}
      </Box>
    </Button>
  );
};

export default PollCard;
