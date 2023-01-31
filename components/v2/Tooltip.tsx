
export enum TooltipDirection {
  TOP = "top",
  BOTTOM = "bottom",
  LEFT = "left",
  RIGHT = "right",
}

type TooltipProps={
  text: string;
  direction?: "top" | "bottom" | "left" | "right";
} &  React.DetailedHTMLProps<
React.HTMLAttributes<HTMLDivElement>,
HTMLDivElement
>;

export const Tooltip: React.FC<TooltipProps> = ({ direction, text, ...props }) => {
  if (direction) {
    return (
      <div className="tooltip-body" {...props}>
        <span className="tooltip-text" id={`tooltip-text-${direction}`}>
          {text}
        </span>
      </div>
    );
  }

  return (
    <div className="tooltip-body" {...props}>
      <span>{text}</span>
    </div>
  );
};
