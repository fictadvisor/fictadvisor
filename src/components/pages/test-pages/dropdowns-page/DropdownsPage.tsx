import React from 'react';
import { UserGroupIcon } from '@heroicons/react/24/outline';

import Dropdown from '@/components/common/ui/dropdown';
import { DropDownState } from '@/components/common/ui/dropdown/Dropdown';

import styles from '../test-pages.module.scss';

const DropdownsPage = () => {
  const options = [
    { value: 'chocolate', label: 'Сидоренко' },
    { value: 'strawberry', label: 'Поршенко' },
    { value: 'vanilla2', label: 'Гайчик' },
    { value: 'chocolate2', label: 'Смітюх' },
    { value: 'strawberry2', label: 'Сагайда' },
    { value: 'vanilla3', label: 'Войчук' },
    { value: 'chocolate', label: 'Братко' },
    { value: 'strawberry3', label: 'Вакарчук' },
    { value: 'vanilla4', label: 'Гіга' },
    { value: 'chocolate3', label: 'Пидоренко' },
    { value: 'strawberry4', label: 'Муха' },
    { value: 'vanilla5', label: 'Вєчєрковська' },
  ];

  return (
    <div className={styles['text-page-wrap']}>
      <div className={styles['text-page-content']}>
        <Dropdown
          options={options}
          label="large"
          icon={<UserGroupIcon className="icon" />}
          numberOfOptions={8}
        />
        <Dropdown
          options={options}
          label="medium"
          icon={<UserGroupIcon className="icon" />}
        />
        <Dropdown
          options={options}
          label="small"
          icon={<UserGroupIcon className="icon" />}
        />
        <Dropdown
          options={options}
          label="large"
          icon={<UserGroupIcon className="icon" />}
          className={DropDownState.DISABLED}
        />
        <Dropdown
          options={options}
          label="medium"
          icon={<UserGroupIcon className="icon" />}
          className={DropDownState.DISABLED}
          numberOfOptions={8}
        />
        <Dropdown
          options={options}
          label="small"
          icon={<UserGroupIcon className="icon" />}
          className={DropDownState.DISABLED}
        />
        <Dropdown
          options={options}
          label="large"
          icon={<UserGroupIcon className="icon" />}
          className={DropDownState.SUCCESS}
        />
        <Dropdown
          options={options}
          label="medium"
          icon={<UserGroupIcon className="icon" />}
          className={DropDownState.SUCCESS}
        />
        <Dropdown
          options={options}
          label="small"
          icon={<UserGroupIcon className="icon" />}
          className={DropDownState.SUCCESS}
        />
        <Dropdown
          options={options}
          label="large"
          icon={<UserGroupIcon className="icon" />}
          className={DropDownState.ERROR}
        />
        <Dropdown
          options={options}
          label="medium"
          icon={<UserGroupIcon className="icon" />}
          className={DropDownState.ERROR}
        />
        <Dropdown
          options={options}
          label="small"
          icon={<UserGroupIcon className="icon" />}
          className={DropDownState.ERROR}
        />
        <div className="test-wrap-50">
          <Dropdown
            options={options}
            label="large"
            icon={<UserGroupIcon className="icon" />}
            numberOfOptions={8}
          />
          <Dropdown
            options={options}
            label="medium"
            icon={<UserGroupIcon className="icon" />}
          />
          <Dropdown
            options={options}
            label="small"
            icon={<UserGroupIcon className="icon" />}
          />
          <Dropdown
            options={options}
            label="large"
            icon={<UserGroupIcon className="icon" />}
            className={DropDownState.DISABLED}
          />
          <Dropdown
            options={options}
            label="medium"
            icon={<UserGroupIcon className="icon" />}
            className={DropDownState.DISABLED}
            numberOfOptions={8}
          />
          <Dropdown
            options={options}
            label="small"
            icon={<UserGroupIcon className="icon" />}
            className={DropDownState.DISABLED}
          />
          <Dropdown
            options={options}
            label="large"
            icon={<UserGroupIcon className="icon" />}
            className={DropDownState.SUCCESS}
          />
          <Dropdown
            options={options}
            label="medium"
            icon={<UserGroupIcon className="icon" />}
            className={DropDownState.SUCCESS}
          />
          <Dropdown
            options={options}
            label="small"
            icon={<UserGroupIcon className="icon" />}
            className={DropDownState.SUCCESS}
          />
          <Dropdown
            options={options}
            label="large"
            icon={<UserGroupIcon className="icon" />}
            className={DropDownState.ERROR}
          />
          <Dropdown
            options={options}
            label="medium"
            icon={<UserGroupIcon className="icon" />}
            className={DropDownState.ERROR}
          />
          <Dropdown
            options={options}
            label="small"
            icon={<UserGroupIcon className="icon" />}
            className={DropDownState.ERROR}
          />
        </div>
        <div className="test-wrap-25">
          <Dropdown
            options={options}
            label="large"
            icon={<UserGroupIcon className="icon" />}
            numberOfOptions={8}
          />
          <Dropdown
            options={options}
            label="medium"
            icon={<UserGroupIcon className="icon" />}
          />
          <Dropdown
            options={options}
            label="small"
            icon={<UserGroupIcon className="icon" />}
          />
          <Dropdown
            options={options}
            label="large"
            icon={<UserGroupIcon className="icon" />}
            className={DropDownState.DISABLED}
          />
          <Dropdown
            options={options}
            label="medium"
            icon={<UserGroupIcon className="icon" />}
            className={DropDownState.DISABLED}
            numberOfOptions={8}
          />
          <Dropdown
            options={options}
            label="small"
            icon={<UserGroupIcon className="icon" />}
            className={DropDownState.DISABLED}
          />
          <Dropdown
            options={options}
            label="large"
            icon={<UserGroupIcon className="icon" />}
            className={DropDownState.SUCCESS}
          />
          <Dropdown
            options={options}
            label="medium"
            icon={<UserGroupIcon className="icon" />}
            className={DropDownState.SUCCESS}
          />
          <Dropdown
            options={options}
            label="small"
            icon={<UserGroupIcon className="icon" />}
            className={DropDownState.SUCCESS}
          />
          <Dropdown
            options={options}
            label="large"
            icon={<UserGroupIcon className="icon" />}
            className={DropDownState.ERROR}
          />
          <Dropdown
            options={options}
            label="medium"
            icon={<UserGroupIcon className="icon" />}
            className={DropDownState.ERROR}
          />
          <Dropdown
            options={options}
            label="small"
            icon={<UserGroupIcon className="icon" />}
            className={DropDownState.ERROR}
          />
        </div>
      </div>
    </div>
  );
};

export default DropdownsPage;
