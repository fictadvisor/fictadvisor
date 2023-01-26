import { TrashBucketIcon } from "./svg-icons/TrashBucketIcon";
import { SortAscendingIcon } from "./svg-icons/SortAscendingIcon";
import { SortDescendingIcon } from "./svg-icons/SortDescendingIcon";

type ButtonIconProps = {
  size: "normal" | "large";
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export enum SortButtonOrder {
  ASCENDING = "ascending",
  DESCENDING = "descending",
};

export enum ButtonIconSize {
  NORMAL = "normal",
  LARGE = "large",
};

export const SortButton: React.FC<
  ButtonIconProps & {
    order: SortButtonOrder.ASCENDING | SortButtonOrder.DESCENDING;
  }
> = ({ size, order, ...rest }) => {
  return (
    <button className={`square-button-icon-${size}`} {...rest}>
      {order === SortButtonOrder.ASCENDING ? (
        <SortAscendingIcon />
      ) : (
        <SortDescendingIcon />
      )}
    </button>
  );
};

export const TrashBucketButton: React.FC<ButtonIconProps> = ({
  size,
  ...rest
}) => {
  return (
    <button className={`round-button-icon-${size}`} {...rest}>
      <TrashBucketIcon />
    </button>
  );
};
