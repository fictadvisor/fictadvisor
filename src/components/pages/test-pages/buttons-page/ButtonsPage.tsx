import React from 'react';
import { AcademicCapIcon } from '@heroicons/react/24/outline';

import Button from '@/components/common/ui/button';
import {
  ButtonIconPosition,
  ButtonSize,
  ButtonType,
} from '@/components/common/ui/button/Button';

import styles from '../test-pages.module.scss';

const ButtonsPage = () => (
  <div className={styles['test-page-wrap']}>
    <div className={styles['test-page-content']}>
      <Button
        text="Primary Red"
        isDisabled={false}
        size={ButtonSize.LARGE}
        type={ButtonType.PRIMARY_RED}
      />
      <Button
        text="Primary Red"
        isDisabled={false}
        size={ButtonSize.LARGE}
        type={ButtonType.PRIMARY_RED}
      />
      <Button
        text="Primary Red"
        isDisabled={false}
        size={ButtonSize.MEDIUM}
        type={ButtonType.PRIMARY_RED}
      />
      <Button
        text="Primary Red"
        isDisabled={false}
        size={ButtonSize.SMALL}
        type={ButtonType.PRIMARY_RED}
      />

      <Button
        text="Primary Red"
        icon={<AcademicCapIcon />}
        iconPosition={ButtonIconPosition.LEFT}
        isDisabled={false}
        size={ButtonSize.LARGE}
        type={ButtonType.PRIMARY_RED}
      />
      <Button
        text="Primary Red"
        icon={<AcademicCapIcon />}
        iconPosition={ButtonIconPosition.LEFT}
        isDisabled={false}
        size={ButtonSize.MEDIUM}
        type={ButtonType.PRIMARY_RED}
      />
      <Button
        text="Primary Red"
        icon={<AcademicCapIcon />}
        iconPosition={ButtonIconPosition.LEFT}
        isDisabled={false}
        size={ButtonSize.SMALL}
        type={ButtonType.PRIMARY_RED}
      />

      <Button
        text="Primary Red"
        icon={<AcademicCapIcon />}
        iconPosition={ButtonIconPosition.RIGHT}
        isDisabled={false}
        size={ButtonSize.LARGE}
        type={ButtonType.PRIMARY_RED}
      />
      <Button
        text="Primary Red"
        icon={<AcademicCapIcon />}
        iconPosition={ButtonIconPosition.RIGHT}
        isDisabled={false}
        size={ButtonSize.MEDIUM}
        type={ButtonType.PRIMARY_RED}
      />
      <Button
        text="Primary Red"
        icon={<AcademicCapIcon />}
        iconPosition={ButtonIconPosition.RIGHT}
        isDisabled={false}
        size={ButtonSize.SMALL}
        type={ButtonType.PRIMARY_RED}
      />

      <Button
        text="Primary Gray"
        isDisabled={false}
        size={ButtonSize.LARGE}
        type={ButtonType.PRIMARY_GRAY}
      />
      <Button
        text="Primary Gray"
        isDisabled={false}
        size={ButtonSize.MEDIUM}
        type={ButtonType.PRIMARY_GRAY}
      />
      <Button
        text="Primary Gray"
        isDisabled={false}
        size={ButtonSize.SMALL}
        type={ButtonType.PRIMARY_GRAY}
      />

      <Button
        text="Primary Gray"
        icon={<AcademicCapIcon />}
        iconPosition={ButtonIconPosition.LEFT}
        isDisabled={false}
        size={ButtonSize.LARGE}
        type={ButtonType.PRIMARY_GRAY}
      />
      <Button
        text="Primary Gray"
        icon={<AcademicCapIcon />}
        iconPosition={ButtonIconPosition.LEFT}
        isDisabled={false}
        size={ButtonSize.MEDIUM}
        type={ButtonType.PRIMARY_GRAY}
      />
      <Button
        text="Primary Gray"
        icon={<AcademicCapIcon />}
        iconPosition={ButtonIconPosition.LEFT}
        isDisabled={false}
        size={ButtonSize.SMALL}
        type={ButtonType.PRIMARY_GRAY}
      />

      <Button
        text="Primary Gray"
        icon={<AcademicCapIcon />}
        iconPosition={ButtonIconPosition.RIGHT}
        isDisabled={false}
        size={ButtonSize.LARGE}
        type={ButtonType.PRIMARY_GRAY}
      />
      <Button
        text="Primary Gray"
        icon={<AcademicCapIcon />}
        iconPosition={ButtonIconPosition.RIGHT}
        isDisabled={false}
        size={ButtonSize.MEDIUM}
        type={ButtonType.PRIMARY_GRAY}
      />
      <Button
        text="Primary Gray"
        icon={<AcademicCapIcon />}
        iconPosition={ButtonIconPosition.RIGHT}
        isDisabled={false}
        size={ButtonSize.SMALL}
        type={ButtonType.PRIMARY_GRAY}
      />

      <Button
        text="Secondary Red"
        isDisabled={false}
        size={ButtonSize.LARGE}
        type={ButtonType.SECONDARY_RED}
      />
      <Button
        text="Secondary Red"
        isDisabled={false}
        size={ButtonSize.MEDIUM}
        type={ButtonType.SECONDARY_RED}
      />
      <Button
        text="Secondary Red"
        isDisabled={false}
        size={ButtonSize.SMALL}
        type={ButtonType.SECONDARY_RED}
      />

      <Button
        text="Secondary Red"
        icon={<AcademicCapIcon />}
        iconPosition={ButtonIconPosition.LEFT}
        isDisabled={false}
        size={ButtonSize.LARGE}
        type={ButtonType.SECONDARY_RED}
      />
      <Button
        text="Secondary Red"
        icon={<AcademicCapIcon />}
        iconPosition={ButtonIconPosition.LEFT}
        isDisabled={false}
        size={ButtonSize.MEDIUM}
        type={ButtonType.SECONDARY_RED}
      />
      <Button
        text="Secondary Red"
        icon={<AcademicCapIcon />}
        iconPosition={ButtonIconPosition.LEFT}
        isDisabled={false}
        size={ButtonSize.SMALL}
        type={ButtonType.SECONDARY_RED}
      />

      <Button
        text="Secondary Red"
        icon={<AcademicCapIcon />}
        iconPosition={ButtonIconPosition.RIGHT}
        isDisabled={false}
        size={ButtonSize.LARGE}
        type={ButtonType.SECONDARY_RED}
      />
      <Button
        text="Secondary Red"
        icon={<AcademicCapIcon />}
        iconPosition={ButtonIconPosition.RIGHT}
        isDisabled={false}
        size={ButtonSize.MEDIUM}
        type={ButtonType.SECONDARY_RED}
      />
      <Button
        text="Secondary Red"
        icon={<AcademicCapIcon />}
        iconPosition={ButtonIconPosition.RIGHT}
        isDisabled={false}
        size={ButtonSize.SMALL}
        type={ButtonType.SECONDARY_RED}
      />

      <Button
        text="Secondary Gray"
        isDisabled={false}
        size={ButtonSize.LARGE}
        type={ButtonType.SECONDARY_GRAY}
      />
      <Button
        text="Secondary Gray"
        isDisabled={false}
        size={ButtonSize.MEDIUM}
        type={ButtonType.SECONDARY_GRAY}
      />
      <Button
        text="Secondary Gray"
        isDisabled={false}
        size={ButtonSize.SMALL}
        type={ButtonType.SECONDARY_GRAY}
      />

      <Button
        text="Secondary Gray"
        icon={<AcademicCapIcon />}
        iconPosition={ButtonIconPosition.LEFT}
        isDisabled={false}
        size={ButtonSize.LARGE}
        type={ButtonType.SECONDARY_GRAY}
      />
      <Button
        text="Secondary Gray"
        icon={<AcademicCapIcon />}
        iconPosition={ButtonIconPosition.LEFT}
        isDisabled={false}
        size={ButtonSize.MEDIUM}
        type={ButtonType.SECONDARY_GRAY}
      />
      <Button
        text="Secondary Gray"
        icon={<AcademicCapIcon />}
        iconPosition={ButtonIconPosition.LEFT}
        isDisabled={false}
        size={ButtonSize.SMALL}
        type={ButtonType.SECONDARY_GRAY}
      />

      <Button
        text="Secondary Gray"
        icon={<AcademicCapIcon />}
        iconPosition={ButtonIconPosition.RIGHT}
        isDisabled={false}
        size={ButtonSize.LARGE}
        type={ButtonType.SECONDARY_GRAY}
      />
      <Button
        text="Secondary Gray"
        icon={<AcademicCapIcon />}
        iconPosition={ButtonIconPosition.RIGHT}
        isDisabled={false}
        size={ButtonSize.MEDIUM}
        type={ButtonType.SECONDARY_GRAY}
      />
      <Button
        text="Secondary Gray"
        icon={<AcademicCapIcon />}
        iconPosition={ButtonIconPosition.RIGHT}
        isDisabled={false}
        size={ButtonSize.SMALL}
        type={ButtonType.SECONDARY_GRAY}
      />

      <Button
        text="Tertiary"
        isDisabled={false}
        size={ButtonSize.LARGE}
        type={ButtonType.TERTIARY}
      />
      <Button
        text="Tertiary"
        isDisabled={false}
        size={ButtonSize.MEDIUM}
        type={ButtonType.TERTIARY}
      />
      <Button
        text="Tertiary"
        isDisabled={false}
        size={ButtonSize.SMALL}
        type={ButtonType.TERTIARY}
      />

      <Button
        text="Tertiary"
        icon={<AcademicCapIcon />}
        iconPosition={ButtonIconPosition.LEFT}
        isDisabled={false}
        size={ButtonSize.LARGE}
        type={ButtonType.TERTIARY}
      />
      <Button
        text="Tertiary"
        icon={<AcademicCapIcon />}
        iconPosition={ButtonIconPosition.LEFT}
        isDisabled={false}
        size={ButtonSize.MEDIUM}
        type={ButtonType.TERTIARY}
      />
      <Button
        text="Tertiary"
        icon={<AcademicCapIcon />}
        iconPosition={ButtonIconPosition.LEFT}
        isDisabled={false}
        size={ButtonSize.SMALL}
        type={ButtonType.TERTIARY}
      />

      <Button
        text="Tertiary"
        icon={<AcademicCapIcon />}
        iconPosition={ButtonIconPosition.RIGHT}
        isDisabled={false}
        size={ButtonSize.LARGE}
        type={ButtonType.TERTIARY}
      />
      <Button
        text="Tertiary"
        icon={<AcademicCapIcon />}
        iconPosition={ButtonIconPosition.RIGHT}
        isDisabled={false}
        size={ButtonSize.MEDIUM}
        type={ButtonType.TERTIARY}
      />
      <Button
        text="Tertiary"
        icon={<AcademicCapIcon />}
        iconPosition={ButtonIconPosition.RIGHT}
        isDisabled={false}
        size={ButtonSize.SMALL}
        type={ButtonType.TERTIARY}
      />
    </div>
  </div>
);

export default ButtonsPage;
