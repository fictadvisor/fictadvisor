import React, { FC } from 'react';
import { Typography } from '@mui/material';

import Link from '@/components/common/ui/custom-link/CustomLink';
import theme from '@/styles/theme';

interface EventDisciplineLinkProps {
  infoText?: string;
  defaultText: string;
}

const TextWithLinks: FC<EventDisciplineLinkProps> = ({
  infoText,
  defaultText,
}) => {
  const linkifyText = (inputText: string) => {
    const linkRegex = /(\bhttps?:\/\/\S+\b)/gi;
    const parts = inputText.split(linkRegex);

    return parts.map((part, index) => {
      if (part.match(linkRegex)) {
        return <Link key={index} href={part} text={part} target="_blank" />;
      } else {
        return part;
      }
    });
  };

  return (
    <Typography sx={{ whiteSpace: 'pre-line' }}>
      {infoText ? linkifyText(infoText) : defaultText}
    </Typography>
  );
};

export default TextWithLinks;
