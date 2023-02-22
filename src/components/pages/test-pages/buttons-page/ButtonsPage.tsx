import React from 'react';
import { AcademicCapIcon } from '@heroicons/react/24/outline';

import Button from '@/components/common/ui/button';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button/Button';

import styles from '../test-pages.module.scss';

const ButtonsPage = () => (
  <div className={styles['test-page-wrap']}>
    <div className={styles['test-page-content']}>
      <Button
        text="Primary Filled"
        disabled={false}
        size={ButtonSize.LARGE}
        color={ButtonColor.PRIMARY}
        variant={ButtonVariant.FILLED}
      />
      <Button
        text="Primary Filled"
        disabled={false}
        size={ButtonSize.LARGE}
        color={ButtonColor.PRIMARY}
        variant={ButtonVariant.FILLED}
        startIcon={<AcademicCapIcon className="icon" />}
      />
      <Button
        text="Primary Filled"
        disabled={false}
        size={ButtonSize.LARGE}
        color={ButtonColor.PRIMARY}
        variant={ButtonVariant.FILLED}
        endIcon={<AcademicCapIcon className="icon" />}
      />
      <Button
        text="Primary Filled"
        disabled={false}
        size={ButtonSize.MEDIUM}
        color={ButtonColor.PRIMARY}
        variant={ButtonVariant.FILLED}
        startIcon={<AcademicCapIcon className="icon" />}
      />
      <Button
        text="Primary Filled"
        disabled={false}
        size={ButtonSize.SMALL}
        color={ButtonColor.PRIMARY}
        variant={ButtonVariant.FILLED}
        startIcon={<AcademicCapIcon className="icon" />}
      />
      <Button
        text="Primary Outline"
        disabled={false}
        size={ButtonSize.LARGE}
        color={ButtonColor.PRIMARY}
        variant={ButtonVariant.OUTLINE}
        startIcon={<AcademicCapIcon className="icon" />}
      />
      <Button
        text="Primary Outline"
        disabled={false}
        size={ButtonSize.MEDIUM}
        color={ButtonColor.PRIMARY}
        variant={ButtonVariant.OUTLINE}
        startIcon={<AcademicCapIcon className="icon" />}
      />
      <Button
        text="Primary Outline"
        disabled={false}
        size={ButtonSize.SMALL}
        color={ButtonColor.PRIMARY}
        variant={ButtonVariant.OUTLINE}
        startIcon={<AcademicCapIcon className="icon" />}
      />
      <Button
        text="Text"
        disabled={false}
        size={ButtonSize.LARGE}
        color={ButtonColor.PRIMARY}
        variant={ButtonVariant.TEXT}
        startIcon={<AcademicCapIcon className="icon" />}
      />
      <Button
        text="Text"
        disabled={false}
        size={ButtonSize.MEDIUM}
        color={ButtonColor.PRIMARY}
        variant={ButtonVariant.TEXT}
        startIcon={<AcademicCapIcon className="icon" />}
      />
      <Button
        text="Text"
        disabled={false}
        size={ButtonSize.SMALL}
        color={ButtonColor.PRIMARY}
        variant={ButtonVariant.TEXT}
        startIcon={<AcademicCapIcon className="icon" />}
      />
      <Button
        text="Primary Filled"
        disabled={true}
        size={ButtonSize.LARGE}
        color={ButtonColor.PRIMARY}
        variant={ButtonVariant.FILLED}
        startIcon={<AcademicCapIcon className="icon" />}
      />

      <Button
        text="Primary Outline"
        disabled={true}
        size={ButtonSize.LARGE}
        color={ButtonColor.PRIMARY}
        variant={ButtonVariant.OUTLINE}
        startIcon={<AcademicCapIcon className="icon" />}
      />
      <Button
        text="Text"
        disabled={true}
        size={ButtonSize.LARGE}
        color={ButtonColor.PRIMARY}
        variant={ButtonVariant.TEXT}
        startIcon={<AcademicCapIcon className="icon" />}
      />
      <Button
        text="Secondary Filled"
        disabled={false}
        size={ButtonSize.LARGE}
        color={ButtonColor.SECONDARY}
        variant={ButtonVariant.FILLED}
        startIcon={<AcademicCapIcon className="icon" />}
      />
      <Button
        text="Secondary Filled"
        disabled={false}
        size={ButtonSize.MEDIUM}
        color={ButtonColor.SECONDARY}
        variant={ButtonVariant.FILLED}
        startIcon={<AcademicCapIcon className="icon" />}
      />
      <Button
        text="Secondary Filled"
        disabled={false}
        size={ButtonSize.SMALL}
        color={ButtonColor.SECONDARY}
        variant={ButtonVariant.FILLED}
        startIcon={<AcademicCapIcon className="icon" />}
      />
      <Button
        text="Secondary Outline"
        disabled={false}
        size={ButtonSize.LARGE}
        color={ButtonColor.SECONDARY}
        variant={ButtonVariant.OUTLINE}
        startIcon={<AcademicCapIcon className="icon" />}
      />
      <Button
        text="Secondary Outline"
        disabled={false}
        size={ButtonSize.MEDIUM}
        color={ButtonColor.SECONDARY}
        variant={ButtonVariant.OUTLINE}
        startIcon={<AcademicCapIcon className="icon" />}
      />
      <Button
        text="Secondary Outline"
        disabled={false}
        size={ButtonSize.SMALL}
        color={ButtonColor.SECONDARY}
        variant={ButtonVariant.OUTLINE}
        startIcon={<AcademicCapIcon className="icon" />}
      />
      <Button
        text="Secondary Filled"
        disabled={true}
        size={ButtonSize.LARGE}
        color={ButtonColor.SECONDARY}
        variant={ButtonVariant.FILLED}
        startIcon={<AcademicCapIcon className="icon" />}
      />

      <Button
        text="Secondary Outline"
        disabled={true}
        size={ButtonSize.LARGE}
        color={ButtonColor.SECONDARY}
        variant={ButtonVariant.OUTLINE}
        startIcon={<AcademicCapIcon className="icon" />}
      />
    </div>
  </div>
);

export default ButtonsPage;
