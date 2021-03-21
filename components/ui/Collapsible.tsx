import { useEffect, useRef, useState } from "react";

type CollapsibleProperties = {
  collapsed?: boolean;
  minHeight?: number;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;


export function Collapsible({ collapsed, minHeight = 0, className, ...props }: CollapsibleProperties) {
  const [height, setHeight] = useState(400);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || collapsed || ref.current.clientHeight <= minHeight) {
      return;
    }

    setHeight(ref.current.clientHeight);
  }, []);

  const maxHeight = collapsed ? minHeight : (height ?? minHeight);

  return (
    <div ref={ref} className={`collapsible ${className ?? ''}`} style={{ maxHeight: `${maxHeight}px` }} {...props} >

    </div>
  );
};