import React, { ReactNode, useState } from 'react';
import Select from 'react-select';
import { useField } from 'formik';
import mergeClassNames from 'merge-class-names';

import {
  FieldSize,
  FieldState,
} from '@/components/common/ui/form/common/types';

import styles from './Dropdown.module.scss';

const dropDownOptionHeight = 36; //px

export enum DropDownSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

interface DropDownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropDownOption[];
  label?: string;
  name: string;
  isDisabled?: boolean;
  icon?: ReactNode;
  placeholder?: string;
  noOptionsText?: string;
  disabledPlaceholder?: string;
  numberOfOptions?: number;
  isSuccessOnDefault?: boolean;
  defaultRemark?: string;
  showRemark?: boolean;
  size?: string;
  className?: string;
  onChange?: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  label,
  name,
  icon,
  isDisabled = false,
  defaultRemark,
  placeholder = isDisabled ? 'Недоступно...' : 'Тиць...',
  noOptionsText = 'Опції відсутні',
  numberOfOptions = 4,
  isSuccessOnDefault = false,
  showRemark = true,
  size = FieldSize.MEDIUM,
  className = '',
  onChange,
}) => {
  const [{}, { touched, error }, { setTouched, setValue }] = useField(name);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let state;
  if (isDisabled) state = FieldState.DISABLED;
  else if (touched && error) state = FieldState.ERROR;
  else if (touched && isSuccessOnDefault) state = FieldState.SUCCESS;

  const handleChange = option => {
    setTouched(true);
    setValue(option?.value ? option.value : '');
    if (onChange) onChange();
  };

  return (
    <div className={mergeClassNames(styles['dropdown'], className)}>
      <span className={state ? styles[`dropdown-${state}-label`] : ''}>
        {label}
      </span>

      {icon && <div className={styles['dropdown-icon-container']}>{icon}</div>}

      <Select
        instanceId={name}
        onChange={handleChange}
        name={name}
        placeholder={placeholder}
        noOptionsMessage={() => noOptionsText}
        unstyled={true}
        options={options}
        openMenuOnClick={true}
        blurInputOnSelect={true}
        isClearable
        isDisabled={isDisabled}
        onMenuOpen={() => setIsMenuOpen(true)}
        onMenuClose={() => {
          setIsMenuOpen(false);
          setTimeout(() => setTouched(true), 20);
        }}
        maxMenuHeight={dropDownOptionHeight * numberOfOptions}
        classNames={{
          control: () => {
            const control = mergeClassNames(
              styles[`dropdown-control`],
              styles[`dropdown-control-${size}`],
              styles[`dropdown-control-${state}`],
            );
            return icon
              ? control + ' ' + styles['dropdown-control-iconed']
              : control;
          },
          container: () => `${styles['dropdown-container']}`,
          input: () => 'dropdown-input',
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
              : state.isFocused
              ? mergeClassNames(
                  styles['dropdown-placeholder-disabled'],
                  styles['dropdown-placeholder'],
                )
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
          dropdownIndicator(baseStyles) {
            return {
              ...baseStyles,
              transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform .2s linear',
              cursor: 'pointer',
            };
          },
          container() {
            return {
              cursor: 'pointer',
            };
          },
        }}
      />
      {showRemark && (
        // && !isMenuOpen
        <p className={styles['remark-' + state]}>
          {touched && error ? error : defaultRemark}
        </p>
      )}
    </div>
  );
};

export default Dropdown;
