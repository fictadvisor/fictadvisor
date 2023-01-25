import Link from "next/dist/client/link";
import { LinkProps } from "next/link";
import { LeftArrowIcon } from "./svg-icons/LeftArrowIcon";

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
      <span className={color}>
        <Link {...rest}>
          <span>
            <LeftArrowIcon />
            {text}
          </span>
        </Link>
      </span>
    );

  return (
    <span className={color}>
      <Link {...rest}>
        <span>{text}</span>
      </Link>
    </span>
  );
};
