import { useState } from "react";
import useComponentVisible from "../../lib/component";
import ArrowIcon from "./icons/ArrowIcon";

type DropdownOption = {
  text: string;
  data?: any;
};

type DropdownProperties = {
  active: number;
  onChange?: (index: number, option: DropdownOption) => void;
  options: DropdownOption[];
};

export default function Dropdown({ active, onChange, options, ...props }: DropdownProperties) {
  const { ref, isComponentVisible: open, setIsComponentVisible: setOpen } = useComponentVisible(false);

  return (
    <div ref={ref} className={`dropdown ${open ? 'active' : ''}`} {...props}>
      <button className="dropdown" onClick={() => setOpen(!open)}>
        <div className="flex">
          <span><span className="font-medium">Сортування по:</span> {options[active].text.toLowerCase()}</span>
          <span className="arrow"><ArrowIcon /></span>
        </div>
      </button>
      <div className="dropdown-content">
        <div>
          {
            options.map(
              (o, index) => 
                <a 
                  key={o.text}
                  onClick={() => { 
                    setOpen(false); 

                    if (onChange) { onChange(index, o); }
                  }}
                >
                  {
                    index == active 
                    ? <span className="font-medium">{o.text}</span>
                    : <>{o.text}</>
                  }
                </a>
              )
          }
        </div>
      </div>
    </div>
  );
};