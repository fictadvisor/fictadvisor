import { useEffect, useRef, useState } from "react";

export type CollapsibleProperties = {
  collapsed?: boolean;
  minHeight?: number;
  onActiveChange?: (active: boolean) => void;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Collapsible = ({ onActiveChange, collapsed, minHeight = 0, className, ...props }: CollapsibleProperties) => {
  const [height, setHeight] = useState(400);
  const [active, setActive] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || collapsed || ref.current.clientHeight <= minHeight) {
      return;
    }

    const fullHeight = ref.current.clientHeight;
    const collapsible = fullHeight > (minHeight + 50);

    setHeight(fullHeight);
    setActive(collapsible);

    if (onActiveChange) {
      onActiveChange(collapsible);
    }
  }, []);

  const maxHeight = (collapsed && active) ? minHeight : (height ?? minHeight);

  return (
    <div ref={ref} className={`collapsible ${className ?? ''}`} style={{ maxHeight: `${maxHeight}px` }} {...props} >

    </div>
  );
};

export default Collapsible;
