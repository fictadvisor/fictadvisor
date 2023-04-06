import React from 'react';
import { Box } from '@mui/material';

import { CustomCheck } from '@/components/common/custom-svg/CustomCheck';
import Tag from '@/components/common/ui/tag-mui';

import * as styles from './TagTestPage.styles';

const TagTestPage = () => {
  return (
    <Box sx={styles.wrapper}>
      <ul>
        <Tag variant="fill" color="primary" text="Tag" size="small"></Tag>
        <Tag
          variant="outline"
          color="success"
          text="Tag"
          size="medium"
          icon={<CustomCheck />}
        ></Tag>
      </ul>
    </Box>
  );
};

export default TagTestPage;
