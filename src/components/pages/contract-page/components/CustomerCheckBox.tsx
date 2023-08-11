import React, { FC } from 'react';

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
        label={'Обрати іншого замовника (**)'}
        onClick={() => setHasCustomer(!prevCheckBoxState)}
      />
    </div>
  );
};
