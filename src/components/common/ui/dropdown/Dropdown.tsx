import React, { ReactNode, useState } from 'react';
import Select from 'react-select';
import { useField } from 'formik';

import styles from './Dropdown.module.scss';

const dropDownOptionHeight = 36; //px

export enum DropDownState {
  ERROR = 'error',
  SUCCESS = 'success',
  DISABLED = 'disabled',
}

type DropDownOption = {
  value: string;
  label: string;
};

interface DropdownProps {
  options: DropDownOption[];
  label: string;
  name: string;
  isDisabled?: boolean;
  icon?: ReactNode;
  placeholder?: string;
  noOptionsText?: string;
  disabledPlaceholder?: string;
  numberOfOptions?: number;
  isSuccessOnDefault?: boolean;
  showRemarkOnDefault?: boolean;
  hasRemark?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  label,
  name,
  isDisabled = false,
  icon,
  placeholder = isDisabled ? 'Недоступно...' : 'Тиць...',
  noOptionsText = 'Опції відсутні',
  numberOfOptions = 4,
  showRemarkOnDefault = false,
  isSuccessOnDefault = false,
  hasRemark = true,
}) => {
  const [field, meta, helpers] = useField(name);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let state;
  if (isDisabled) state = DropDownState.DISABLED;
  else if (meta.touched && meta.error) state = DropDownState.ERROR;
  else if (meta.touched && isSuccessOnDefault) state = DropDownState.SUCCESS;
  else state = null;

  return (
    <div className={styles['dropdown']}>
      <span className={state ? styles[`dropdown-${state}-label`] : ''}>
        {label}
      </span>
      {icon && <div className={styles['dropdown-icon-container']}>{icon}</div>}

      <Select
        value={meta.value}
        instanceId={name}
        onChange={option => helpers.setValue(option.value)}
        name={name}
        placeholder={placeholder}
        noOptionsMessage={() => noOptionsText}
        unstyled={true}
        options={options}
        openMenuOnClick={true}
        blurInputOnSelect={true}
        isDisabled={isDisabled}
        onMenuOpen={() => setIsMenuOpen(true)}
        onMenuClose={() => setIsMenuOpen(false)}
        maxMenuHeight={dropDownOptionHeight * numberOfOptions}
        classNames={{
          control: () =>
            icon
              ? styles['dropdown-control'] +
                ' ' +
                styles['dropdown-control-iconed']
              : styles['dropdown-control'],
          container: () =>
            `${styles['dropdown-container']} ${
              styles[`dropdown-container-${state}`]
            }`,
          //   input: (state) => "dropdown-input",
          menu: () => styles['dropdown-menu'],
          menuList: () => styles['dropdown-menu-list'],
          option: state =>
            state.isSelected
              ? styles['dropdown-option'] +
                ' ' +
                styles['dropdown-option-selected']
              : styles['dropdown-option'],
          placeholder: state =>
            state.isDisabled
              ? styles['dropdown-placeholder-disabled']
              : styles['dropdown-placeholder'],
          singleValue: () => styles['dropdown-single-value'],
        }}
        styles={{
          control(baseStyles, state) {
            return {
              ...baseStyles,
              cursor: state.isDisabled ? 'not-allowed' : 'pointer',
            };
          },
          dropdownIndicator(baseStyles, _) {
            return {
              ...baseStyles,
              transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform .2s linear',
              cursor: 'pointer',
            };
          },
          container(baseStyles, _) {
            return {
              cursor: 'pointer',
            };
          },
        }}
      />
      {hasRemark && (
        <p>
          {(meta.touched && meta.error) || showRemarkOnDefault
            ? meta.error
            : ''}
        </p>
      )}
    </div>
  );
};

export default Dropdown;
