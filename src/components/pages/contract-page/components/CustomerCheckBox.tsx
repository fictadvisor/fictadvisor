import React, { FC } from 'react';
import { Typography } from '@mui/material';

import { CheckBox } from '@/components/pages/contract-page/components/CheckBox';
interface CustomerCheckBoxProps {
  setHasCustomer: React.Dispatch<React.SetStateAction<boolean>>;
  /**
   * These are "kostili" because react for some reason rerenders twice
   * */
  prevCheckBoxState: boolean;
}
export const CustomerCheckBox: FC<CustomerCheckBoxProps> = ({
  setHasCustomer,
  prevCheckBoxState,
}) => {
  return (
    <div>
      <CheckBox
        name="helper.hasCustomer"
        label={'Обрати іншого замовника (*)'}
        onClick={() => setHasCustomer(!prevCheckBoxState)}
      />
      <Typography mt={'8px'} fontSize={'11px'}>
        *Замовник - особа, яка оплачує контракт. За замовчуванням замовник
        вважається вступником, якщо вступник неповнолітній - замовником вважають
        законного представника. За бажанням, можна змінити замовника
      </Typography>
    </div>
  );
};
