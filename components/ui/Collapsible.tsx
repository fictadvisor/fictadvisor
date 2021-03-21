import { useEffect, useRef, useState } from "react";

type CollapsibleProperties = {
  collapsed?: boolean;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;


export function Collapsible({ collapsed, className, ...props }: CollapsibleProperties) {
  const [height, setHeight] = useState(400);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || collapsed || ref.current.clientHeight < 10) {
      return;
    }

    setHeight(ref.current.clientHeight);
  }, [collapsed]);

  return (
    <div ref={ref} className={`collapsible ${collapsed ? 'collapsed' : ''} ${className ?? ''}`} style={{ maxHeight: height ? `${height}px` : null }} {...props} >

    </div>
  );
};