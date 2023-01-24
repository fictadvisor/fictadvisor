import { useState } from "react";
import ArrowIcon from "./icons/ArrowIcon";
import {mergeClassName} from "../../../lib/v1/component";

export type CollapsePanelProperties = {
  title: string;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const CollapsePanel = ({ title, children, className, ...props }: CollapsePanelProperties) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={mergeClassName(`dropdowns ${open ? 'active' : ''}`, className)} {...props}>
      <button className="dropdown" onClick={() => setOpen(!open)}>
        <div className="d-flex">
          <span className="f-medium">{title}</span>
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
