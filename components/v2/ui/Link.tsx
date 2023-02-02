import Link from "next/dist/client/link";
import { LinkProps } from "next/link";
import {ArrowLeftIcon} from "@heroicons/react/24/outline";
import styles from "styles/v2/local/elements/Link.module.scss";
import React from "react";

export enum LinkColor {
  WHITE = "white-link",
  BLUE = "blue-link",
}

type CustomLinkProps = {
  text: string;
  color?: LinkColor.WHITE | LinkColor.BLUE;
  arrow?: boolean;
} & LinkProps;

export const CustomLink: React.FC<CustomLinkProps> = ({
  arrow,
  text,
  color = LinkColor.WHITE,
  ...rest
}) => {
  if (arrow)
    return (
      <span className={styles[color]}>
        <Link {...rest}>
            <ArrowLeftIcon className="icon"/>
          <span>{text}</span>
        </Link>
      </span>
    );

  return (
    <span className={styles[color]}>
      <Link {...rest}>
        <span>{text}</span>
      </Link>
    </span>
  );
};
