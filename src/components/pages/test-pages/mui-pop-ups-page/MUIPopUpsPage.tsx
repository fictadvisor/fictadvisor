import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

import Button from '@/components/common/ui/button-mui';
import Popup from '@/components/common/ui/pop-ups-mui/Popup';

import * as styles from './MUIPopUpsPage.styles';
const PopUpsPage = () => {
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleClickOpen3 = () => {
    setOpen3(true);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const handleClickOpen4 = () => {
    setOpen4(true);
  };

  const handleClose4 = () => {
    setOpen4(false);
  };

  return (
    <>
      <div>
        <Button
          text="Open form dialog 1"
          size="large"
          onClick={handleClickOpen1}
        />
        <Popup
          icon={<CheckCircleIcon />}
          open={open1}
          onClose={handleClose1}
          firstButton={
            <Button
              text="Post"
              size="small"
              variant={'outline'}
              onClick={handleClose1}
            />
          }
          secondButton={
            <Button
              text="Post"
              size="small"
              onClick={handleClose1}
              sx={styles.leftButton}
            />
          }
          text="This will remove all data relating to Alex. This action cannot be reversed. Deleted data can not be recovered."
          title="Application Received"
        />
      </div>

      <div>
        <Button
          text="Open form dialog2"
          size="large"
          onClick={handleClickOpen2}
        />
        <Popup
          icon={<CheckCircleIcon />}
          open={open2}
          onClose={handleClose2}
          firstButton={
            <Button text="Post" size="small" onClick={handleClose2} />
          }
          text="This will remove all data relating to Alex. This action cannot be reversed. Deleted data can not be recovered."
          title="Application Received"
        />
      </div>

      <div>
        <Button
          text="Open form dialog 3"
          size="large"
          onClick={handleClickOpen3}
        />
        <Popup
          icon={<CheckCircleIcon />}
          hasCross={true}
          open={open3}
          onClose={handleClose3}
          firstButton={
            <Button
              text="Post"
              size="small"
              variant={'outline'}
              onClick={handleClose3}
            />
          }
          secondButton={
            <Button
              text="Post"
              size="small"
              onClick={handleClose1}
              sx={styles.leftButton}
            />
          }
          text="This will remove all data relating to Alex. This action cannot be reversed. Deleted data can not be recovered."
          title="Application Received"
        />
      </div>

      <div>
        <Button
          text="Open form dialog 4"
          size="large"
          onClick={handleClickOpen4}
        />
        <Popup
          hasCross={true}
          contentLeft={true}
          open={open4}
          onClose={handleClose4}
          firstButton={
            <Button
              text="Cancel"
              size="small"
              variant={'outline'}
              onClick={handleClose4}
              sx={styles.maxButton}
            />
          }
          secondButton={
            <Button
              text="Delete"
              size="small"
              onClick={handleClose4}
              sx={styles.maxLeftButton}
            />
          }
          text="This will remove all data relating to Alex. This action cannot be reversed. Deleted data can not be recovered."
          title="Application Received"
        />
      </div>
    </>
  );
};

export default PopUpsPage;
