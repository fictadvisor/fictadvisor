import { StarIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';

import {
  IconButton,
  IconButtonColor,
  IconButtonShape,
  IconButtonSize,
  SortButtonOrder,
} from '@/components/common/ui/icon-button/IconButton';
import {
  CloseButton,
  SortButton,
  StarButton,
  TrashBucketButton,
} from '@/components/common/ui/icon-button/variants';

import styles from '../test-pages.module.scss';

const IconButtonsPage = () => (
  <div className={styles['test-page-wrap']}>
    <div className={styles['test-page-content']}>
      <SortButton
        size={IconButtonSize.LARGE}
        order={SortButtonOrder.ASCENDING}
        color={IconButtonColor.ERROR}
        shape={IconButtonShape.SQUARE}
      />
      <SortButton
        size={IconButtonSize.LARGE}
        order={SortButtonOrder.DESCENDING}
        color={IconButtonColor.ERROR}
        shape={IconButtonShape.SQUARE}
      />
      <SortButton
        size={IconButtonSize.NORMAL}
        order={SortButtonOrder.ASCENDING}
        color={IconButtonColor.ERROR}
        shape={IconButtonShape.SQUARE}
      />
      <SortButton
        size={IconButtonSize.NORMAL}
        order={SortButtonOrder.DESCENDING}
        color={IconButtonColor.ERROR}
        shape={IconButtonShape.SQUARE}
      />
      <SortButton
        size={IconButtonSize.LARGE}
        order={SortButtonOrder.ASCENDING}
        color={IconButtonColor.ERROR}
        shape={IconButtonShape.SQUARE}
        disabled={true}
      />
      <SortButton
        size={IconButtonSize.LARGE}
        order={SortButtonOrder.DESCENDING}
        color={IconButtonColor.ERROR}
        shape={IconButtonShape.SQUARE}
        disabled={true}
      />
      <SortButton
        size={IconButtonSize.NORMAL}
        order={SortButtonOrder.ASCENDING}
        color={IconButtonColor.ERROR}
        shape={IconButtonShape.SQUARE}
        disabled={true}
      />
      <SortButton
        size={IconButtonSize.NORMAL}
        order={SortButtonOrder.DESCENDING}
        color={IconButtonColor.ERROR}
        shape={IconButtonShape.SQUARE}
        disabled={true}
      />
      <SortButton
        size={IconButtonSize.LARGE}
        order={SortButtonOrder.ASCENDING}
        color={IconButtonColor.PRIMARY}
        shape={IconButtonShape.SQUARE}
      />
      <SortButton
        size={IconButtonSize.LARGE}
        order={SortButtonOrder.DESCENDING}
        color={IconButtonColor.PRIMARY}
        shape={IconButtonShape.SQUARE}
      />
      <SortButton
        size={IconButtonSize.NORMAL}
        order={SortButtonOrder.ASCENDING}
        color={IconButtonColor.PRIMARY}
        shape={IconButtonShape.SQUARE}
      />
      <SortButton
        size={IconButtonSize.NORMAL}
        order={SortButtonOrder.DESCENDING}
        color={IconButtonColor.PRIMARY}
        shape={IconButtonShape.SQUARE}
      />
      <SortButton
        size={IconButtonSize.LARGE}
        order={SortButtonOrder.ASCENDING}
        color={IconButtonColor.PRIMARY}
        shape={IconButtonShape.SQUARE}
        disabled={true}
      />
      <SortButton
        size={IconButtonSize.LARGE}
        order={SortButtonOrder.DESCENDING}
        color={IconButtonColor.PRIMARY}
        shape={IconButtonShape.SQUARE}
        disabled={true}
      />
      <SortButton
        size={IconButtonSize.NORMAL}
        order={SortButtonOrder.ASCENDING}
        color={IconButtonColor.PRIMARY}
        shape={IconButtonShape.SQUARE}
        disabled={true}
      />
      <SortButton
        size={IconButtonSize.NORMAL}
        order={SortButtonOrder.DESCENDING}
        color={IconButtonColor.PRIMARY}
        shape={IconButtonShape.SQUARE}
        disabled={true}
      />

      <StarButton
        size={IconButtonSize.LARGE}
        shape={IconButtonShape.CIRCLE}
        color={IconButtonColor.ERROR}
      />
      <StarButton
        size={IconButtonSize.NORMAL}
        shape={IconButtonShape.CIRCLE}
        color={IconButtonColor.ERROR}
      />
      <StarButton
        size={IconButtonSize.LARGE}
        shape={IconButtonShape.CIRCLE}
        disabled={true}
        color={IconButtonColor.ERROR}
      />
      <StarButton
        size={IconButtonSize.NORMAL}
        shape={IconButtonShape.CIRCLE}
        disabled={true}
        color={IconButtonColor.ERROR}
      />

      <TrashBucketButton
        size={IconButtonSize.LARGE}
        shape={IconButtonShape.CIRCLE}
        color={IconButtonColor.SECONDARY}
      />
      <TrashBucketButton
        size={IconButtonSize.NORMAL}
        shape={IconButtonShape.CIRCLE}
        color={IconButtonColor.SECONDARY}
      />
      <TrashBucketButton
        size={IconButtonSize.LARGE}
        shape={IconButtonShape.CIRCLE}
        disabled={true}
        color={IconButtonColor.SECONDARY}
      />
      <TrashBucketButton
        size={IconButtonSize.NORMAL}
        shape={IconButtonShape.CIRCLE}
        disabled={true}
        color={IconButtonColor.SECONDARY}
      />

      <StarButton
        size={IconButtonSize.LARGE}
        shape={IconButtonShape.CIRCLE}
        color={IconButtonColor.SUCCESS}
      />
      <StarButton
        size={IconButtonSize.NORMAL}
        shape={IconButtonShape.CIRCLE}
        color={IconButtonColor.SUCCESS}
      />
      <StarButton
        size={IconButtonSize.LARGE}
        shape={IconButtonShape.CIRCLE}
        disabled={true}
        color={IconButtonColor.SUCCESS}
      />
      <StarButton
        size={IconButtonSize.NORMAL}
        shape={IconButtonShape.CIRCLE}
        disabled={true}
        color={IconButtonColor.SUCCESS}
      />

      <CloseButton
        size={IconButtonSize.LARGE}
        shape={IconButtonShape.CIRCLE}
        color={IconButtonColor.TRANSPARENT}
      />
      <CloseButton
        size={IconButtonSize.NORMAL}
        shape={IconButtonShape.CIRCLE}
        color={IconButtonColor.TRANSPARENT}
      />
      <CloseButton
        size={IconButtonSize.LARGE}
        shape={IconButtonShape.CIRCLE}
        disabled={true}
        color={IconButtonColor.TRANSPARENT}
      />
      <CloseButton
        size={IconButtonSize.NORMAL}
        shape={IconButtonShape.CIRCLE}
        disabled={true}
        color={IconButtonColor.TRANSPARENT}
      />

      <IconButton
        icon={<XMarkIcon />}
        color={IconButtonColor.SUCCESS}
        size={IconButtonSize.LARGE}
        shape={IconButtonShape.CIRCLE}
      />

      <IconButton icon={<StarIcon />} color={IconButtonColor.ERROR} />
      <IconButton icon={<TrashIcon />} color={IconButtonColor.SECONDARY} />
      <SortButton />
    </div>
  </div>
);

export default IconButtonsPage;
