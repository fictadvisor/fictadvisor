import { StarIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';

import {
  IconButton,
  IconButtonColor,
  IconButtonShape,
  IconButtonSize,
} from '@/components/common/ui/icon-button/IconButton';
import {
  CloseButton,
  SortButton,
  SortButtonOrder,
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
        color={IconButtonColor.PRIMARY}
        shape={IconButtonShape.SQUARE}
        className={styles['test']}
      />
      <SortButton
        size={IconButtonSize.LARGE}
        order={SortButtonOrder.DESCENDING}
        color={IconButtonColor.PRIMARY}
        shape={IconButtonShape.SQUARE}
      />
      <SortButton
        size={IconButtonSize.MEDIUM}
        order={SortButtonOrder.ASCENDING}
        color={IconButtonColor.PRIMARY}
        shape={IconButtonShape.SQUARE}
      />
      <SortButton
        size={IconButtonSize.MEDIUM}
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
        size={IconButtonSize.MEDIUM}
        order={SortButtonOrder.ASCENDING}
        color={IconButtonColor.PRIMARY}
        shape={IconButtonShape.SQUARE}
        disabled={true}
      />
      <SortButton
        size={IconButtonSize.MEDIUM}
        order={SortButtonOrder.DESCENDING}
        color={IconButtonColor.PRIMARY}
        shape={IconButtonShape.SQUARE}
        disabled={true}
      />
      <SortButton
        size={IconButtonSize.LARGE}
        order={SortButtonOrder.ASCENDING}
        color={IconButtonColor.SECONDARY}
        shape={IconButtonShape.SQUARE}
      />
      <SortButton
        size={IconButtonSize.LARGE}
        order={SortButtonOrder.DESCENDING}
        color={IconButtonColor.SECONDARY}
        shape={IconButtonShape.SQUARE}
      />
      <SortButton
        size={IconButtonSize.MEDIUM}
        order={SortButtonOrder.ASCENDING}
        color={IconButtonColor.SECONDARY}
        shape={IconButtonShape.SQUARE}
      />
      <SortButton
        size={IconButtonSize.MEDIUM}
        order={SortButtonOrder.DESCENDING}
        color={IconButtonColor.SECONDARY}
        shape={IconButtonShape.SQUARE}
      />
      <SortButton
        size={IconButtonSize.LARGE}
        order={SortButtonOrder.ASCENDING}
        color={IconButtonColor.SECONDARY}
        shape={IconButtonShape.SQUARE}
        disabled={true}
      />
      <SortButton
        size={IconButtonSize.LARGE}
        order={SortButtonOrder.DESCENDING}
        color={IconButtonColor.SECONDARY}
        shape={IconButtonShape.SQUARE}
        disabled={true}
      />
      <SortButton
        size={IconButtonSize.MEDIUM}
        order={SortButtonOrder.ASCENDING}
        color={IconButtonColor.SECONDARY}
        shape={IconButtonShape.SQUARE}
        disabled={true}
      />
      <SortButton
        size={IconButtonSize.MEDIUM}
        order={SortButtonOrder.DESCENDING}
        color={IconButtonColor.SECONDARY}
        shape={IconButtonShape.SQUARE}
        disabled={true}
      />

      <StarButton
        size={IconButtonSize.LARGE}
        shape={IconButtonShape.CIRCLE}
        color={IconButtonColor.PRIMARY}
      />
      <StarButton
        size={IconButtonSize.MEDIUM}
        shape={IconButtonShape.CIRCLE}
        color={IconButtonColor.PRIMARY}
      />
      <StarButton
        size={IconButtonSize.LARGE}
        shape={IconButtonShape.CIRCLE}
        disabled={true}
        color={IconButtonColor.PRIMARY}
      />
      <StarButton
        size={IconButtonSize.MEDIUM}
        shape={IconButtonShape.CIRCLE}
        disabled={true}
        color={IconButtonColor.PRIMARY}
      />

      <TrashBucketButton
        size={IconButtonSize.LARGE}
        shape={IconButtonShape.CIRCLE}
        color={IconButtonColor.ERROR}
      />
      <TrashBucketButton
        size={IconButtonSize.MEDIUM}
        shape={IconButtonShape.CIRCLE}
        color={IconButtonColor.ERROR}
      />
      <TrashBucketButton
        size={IconButtonSize.LARGE}
        shape={IconButtonShape.CIRCLE}
        disabled={true}
        color={IconButtonColor.ERROR}
      />
      <TrashBucketButton
        size={IconButtonSize.MEDIUM}
        shape={IconButtonShape.CIRCLE}
        disabled={true}
        color={IconButtonColor.ERROR}
      />

      <StarButton
        size={IconButtonSize.LARGE}
        shape={IconButtonShape.CIRCLE}
        color={IconButtonColor.SUCCESS}
      />
      <StarButton
        size={IconButtonSize.MEDIUM}
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
        size={IconButtonSize.MEDIUM}
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
        size={IconButtonSize.MEDIUM}
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
        size={IconButtonSize.MEDIUM}
        shape={IconButtonShape.CIRCLE}
        disabled={true}
        color={IconButtonColor.TRANSPARENT}
      />

      <IconButton icon={<StarIcon />} color={IconButtonColor.SUCCESS} />
      <IconButton icon={<TrashIcon />} color={IconButtonColor.ERROR} />
      <IconButton icon={<XMarkIcon />} color={IconButtonColor.SECONDARY} />

      <SortButton />
      <CloseButton />
      <StarButton />
      <TrashBucketButton />
    </div>
  </div>
);

export default IconButtonsPage;
