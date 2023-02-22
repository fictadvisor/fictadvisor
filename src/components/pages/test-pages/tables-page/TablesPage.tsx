import { XMarkIcon } from '@heroicons/react/24/outline';

import Table from '@/components/common/composite/table/Table';
import { CustomCheck } from '@/components/common/custom-svg/CustomCheck';
import AlertButton, {
  AlertButtonIconPosition,
  AlertButtonType,
} from '@/components/common/ui/alert-button/AlertButton';
import Checkbox, { CheckboxState } from '@/components/common/ui/checkbox';
import { IconButtonSize } from '@/components/common/ui/icon-button/IconButton';
import { TrashBucketButton } from '@/components/common/ui/icon-button/variants';
import Tag, {
  TagColor,
  TagSize,
  TagVariant,
} from '@/components/common/ui/tag/Tag';

import styles from '../test-pages.module.scss';

const TablesPage = () => {
  const fields = [
    {
      avatar: 'avatar.png',
      email: 'elizabeth.yarmolenko@gmail.com',
      fullName: 'Ярмоленко Єлизавета Миколаївна',
      tag: (
        <Tag
          size={TagSize.SMALL}
          text="Зам. староста"
          variant={TagVariant.DARKER}
          color={TagColor.PRIMARY}
        />
      ),
      checkbox: <Checkbox state={CheckboxState.DEFAULT} text="Зам. староста" />,
      //action={<AlertButton text="Прийняти" icon={<CustomCheck/>} iconPosition={AlertButtonIconPosition.RIGHT} onClick={() => {}} isDisabled={false} type={AlertButtonType.SUCCESS}/>}
      secondButton: <TrashBucketButton size={IconButtonSize.NORMAL} />,
    },
    {
      avatar: 'stars-full.svg',
      email: 'elizabeth.yarmolenko@gmail.com',
      fullName: 'Ярмоленко Єлизавета Миколаївна',
      //tag: <Tag state={TagState.SMALL} text="Зам. староста" className="primary-second" />,
      //checkbox: <Check state={CheckboxState.DEFAULT} text="Зам. староста" />,
      firstButton: (
        <AlertButton
          text="Прийняти"
          icon={<CustomCheck />}
          iconPosition={AlertButtonIconPosition.RIGHT}
          isDisabled={false}
          type={AlertButtonType.SUCCESS}
        />
      ),
      secondButton: (
        <AlertButton
          icon={<XMarkIcon className="icon" />}
          iconPosition={AlertButtonIconPosition.RIGHT}
          isDisabled={false}
          type={AlertButtonType.ERROR_SECONDARY}
        />
      ),
    },
    {
      avatar: 'stars-empty.svg',
      email: 'elizabeth.yarmolenko@gmail.com',
      fullName: 'Ярмоленко Єлизавета Миколаївна',
      tag: (
        <Tag
          size={TagSize.SMALL}
          text="Зам. староста"
          variant={TagVariant.DARKER}
          color={TagColor.PRIMARY}
        />
      ),
      checkbox: <Checkbox state={CheckboxState.DEFAULT} text="Зам. староста" />,
      //action={<AlertButton text="Прийняти" icon={<CustomCheck/>} iconPosition={AlertButtonIconPosition.RIGHT} onClick={() => {}} isDisabled={false} type={AlertButtonType.SUCCESS}/>}
      secondButton: <TrashBucketButton size={IconButtonSize.NORMAL} />,
    },

    {
      email: 'elizabeth.yarmolenko@gmail.com',
      fullName: 'Ярмоленко Єлизавета Миколаївна',
      tag: (
        <Tag
          size={TagSize.SMALL}
          text="Зам. староста"
          variant={TagVariant.DARKER}
          color={TagColor.PRIMARY}
        />
      ),
      checkbox: <Checkbox state={CheckboxState.DEFAULT} text="Зам. староста" />,
      firstButton: (
        <AlertButton
          text="Прийняти"
          icon={<CustomCheck />}
          iconPosition={AlertButtonIconPosition.RIGHT}
          isDisabled={false}
          type={AlertButtonType.SUCCESS}
        />
      ),
      secondButton: <TrashBucketButton size={IconButtonSize.NORMAL} />,
    },
    {
      email: 'elizabeth.yarmolenko@gmail.com',
      fullName: 'Ярмоленко Єлизавета Миколаївна',
      tag: (
        <Tag
          size={TagSize.SMALL}
          text="Зам. староста"
          variant={TagVariant.DARKER}
          color={TagColor.PRIMARY}
        />
      ),
      checkbox: <Checkbox state={CheckboxState.DEFAULT} text="Зам. староста" />,
      firstButton: (
        <AlertButton
          text="Прийняти"
          icon={<CustomCheck />}
          iconPosition={AlertButtonIconPosition.RIGHT}
          isDisabled={false}
          type={AlertButtonType.SUCCESS}
        />
      ),
      secondButton: <TrashBucketButton size={IconButtonSize.NORMAL} />,
    },
    {
      email: 'elizabeth.yarmolenko@gmail.com',
      fullName: 'Ярмоленко Єлизавета Миколаївна',
      //tag: <Tag state={TagState.SMALL} text="Зам. староста" className="primary-second" />,
      checkbox: <Checkbox state={CheckboxState.DEFAULT} text="Зам. староста" />,
      firstButton: (
        <AlertButton
          text="Прийняти"
          icon={<CustomCheck />}
          iconPosition={AlertButtonIconPosition.RIGHT}
          isDisabled={false}
          type={AlertButtonType.SUCCESS}
        />
      ),
      secondButton: (
        <AlertButton
          className="custom-x"
          icon={<XMarkIcon className="icon" />}
          iconPosition={AlertButtonIconPosition.RIGHT}
          isDisabled={false}
          type={AlertButtonType.ERROR_SECONDARY}
        />
      ),
    },
    {
      email: 'elizabeth.yarmolenko@gmail.com',
      fullName: 'Ярмоленко Єлизавета Миколаївна',
      tag: (
        <Tag
          size={TagSize.SMALL}
          text="Зам. староста"
          variant={TagVariant.DARKER}
          color={TagColor.PRIMARY}
        />
      ),
    },
    {
      email: 'elizabeth.yarmolenko@gmail.com',
      fullName: 'Ярмоленко Єлизавета Миколаївна',
      tag: (
        <Tag
          size={TagSize.SMALL}
          text="Зам. староста"
          variant={TagVariant.DARKER}
          color={TagColor.PRIMARY}
        />
      ),
    },
  ];
  return (
    <div className={styles['test-page-wrap']}>
      <div className={styles['test-page-content']}>
        <Table fields={fields} />
      </div>
    </div>
  );
};

export default TablesPage;
