import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AlertVariant } from '@/components/common/ui/alert';
import AlertPopup from '@/components/common/ui/alert-popup';
import useAppSelector from '@/hooks/use-app-selector';
import { hideAlert, setNewTimeout } from '@/redux/reducers/alert.reducer';

const Toast: FC = () => {
  const { open, timeout, hasTimeout, ...rest } = useAppSelector(
    state => state.alert,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!hasTimeout && open) {
      clearTimeout(timeout);
      const newTimeout = setTimeout(() => {
        dispatch(hideAlert());
      }, 4000);
      dispatch(setNewTimeout({ timeout: newTimeout }));
    }
  }, [dispatch, hasTimeout, open, timeout]);

  const handleClose = () => {
    dispatch(hideAlert());
  };

  return (
    open && (
      <AlertPopup
        variant={AlertVariant.FILLED}
        closeFunction={handleClose}
        {...rest}
      />
    )
  );
};

export default Toast;
