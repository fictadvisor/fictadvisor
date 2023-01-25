import { mergeClassName, useComponentVisible } from "../../../lib/v1/component";
import ArrowIcon from "./icons/ArrowIcon";

export type DropdownOption = {
  text: string;
  data?: any;
};

export type DropdownProperties = {
  text?: string;
  active: number;
  onChange?: (index: number, option: DropdownOption) => void;
  options: DropdownOption[];
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Dropdown = ({ text, active, onChange, options, className, ...props }: DropdownProperties) => {
  const { ref, isComponentVisible: open, setIsComponentVisible: setOpen } = useComponentVisible(false);

  return (
    <div ref={ref} className={mergeClassName(`dropdowns ${open ? 'active' : ''}`, className)} {...props}>
      <button className="dropdown" onClick={() => setOpen(!open)}>
        <div className="d-flex">
          <span>
            {
              text 
                ? 
                  <>
                    <span className="f-medium">{text} </span>
                    {options[active].text.toLowerCase()}
                  </>
                : <span className="f-medium">{options[active].text}</span>
            }
          </span>
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
                    ? <span className="f-medium">{o.text}</span>
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

export default Dropdown;
