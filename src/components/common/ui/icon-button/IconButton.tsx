import React from "react";
import {BarsArrowDownIcon, BarsArrowUpIcon, TrashIcon} from "@heroicons/react/24/outline";
import styles from "./IconButton.module.scss";

type IconButtonProps = {
  size: "normal" | "large";
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export enum SortButtonOrder {
  ASCENDING = "ascending",
  DESCENDING = "descending",
}

export enum IconButtonSize {
  NORMAL = "normal",
  LARGE = "large",
}

export const SortButton: React.FC<
  IconButtonProps & {
    order: SortButtonOrder.ASCENDING | SortButtonOrder.DESCENDING;
  }
> = ({ size, order, ...rest }) => {
  return (
    <button className={styles[`square-button-icon-${size}`]} {...rest}>
      {order === SortButtonOrder.ASCENDING ? (
        <BarsArrowUpIcon className="icon" />
      ) : (
          <BarsArrowDownIcon className="icon" />
      )}
    </button>
  );
}

export const TrashBucketButton: React.FC<IconButtonProps> = ({
  size,
  ...rest
}) => {
  return (
    <button className={styles[`round-button-icon-${size}`]} {...rest}>
      <TrashIcon className="icon"/>
    </button>
  );
}
