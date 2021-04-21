import { useState } from "react";
import { mergeClassName } from "../../lib/component";
import ArrowIcon from "./icons/ArrowIcon";

export type CollapsePanelProperties = {
  title: string;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const CollapsePanel = ({ title, children, className, ...props }: CollapsePanelProperties) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={mergeClassName(`dropdown ${open ? 'active' : ''}`, className)} {...props}>
      <button className="dropdown" onClick={() => setOpen(!open)}>
        <div className="flex">
          <span className="font-medium">{title}</span>
          <span className="arrow"><ArrowIcon /></span>
        </div>
      </button>
      <div className="dropdown-content collapsible-panel">
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CollapsePanel;
