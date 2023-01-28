import Select from "react-select";
import React, { ReactNode, useState } from "react";


const dropDownOptionHeight = 36; //px

export enum DropDownClass {
  ERROR = "error",
  SUCCESS = "success",
  DISABLED = "disabled",
}

export type DropDownOption = {
  value: string;
  label: string;
};

export interface DropdownProps {
  options: DropDownOption[];
  label: string;
  className?: "error" | "success" | "disabled";
  icon?: ReactNode;
  placeholder?: string;
  noOptionsText?: string;
  disabledPlaceholder?: string;
  numberOfOptions?: number;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  label,
  className,
  icon,
  placeholder = className === DropDownClass.DISABLED
    ? "Недоступно..."
    : "Тиць...",
  noOptionsText = "Опції відсутні",
  numberOfOptions = 4,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDisabled = className === "disabled";

  return (
    <div className="dropdown">
      <span className={`${className ? `dropdown-${className}-label` : ""}`}>
        {label}
      </span>
      {icon && <div className="dropdown-icon-container">{icon}</div>}

      <Select
        placeholder={placeholder}
        noOptionsMessage={() => noOptionsText}
        onChange={setSelectedOption}
        unstyled={true}
        options={options}
        openMenuOnClick={true}
        blurInputOnSelect={true}
        isDisabled={isDisabled}
        onMenuOpen={() => setIsMenuOpen(true)}
        onMenuClose={() => setIsMenuOpen(false)}
        maxMenuHeight={dropDownOptionHeight * numberOfOptions}
        classNames={{
          control: (state) =>
            icon
              ? "dropdown-control dropdown-control-iconed"
              : "dropdown-control",
          container: (state) =>
            `dropdown-container dropdown-container-${className}`,
        //   input: (state) => "dropdown-input",
          menu: (state) => "dropdown-menu",
          menuList: (state) => "dropdown-menu-list",
          option: (state) =>
            state.isSelected
              ? "dropdown-option dropdown-option-selected"
              : "dropdown-option",
          placeholder: (state) => state.isDisabled? 'dropdown-placeholder-disabled':'dropdown-placeholder',
          singleValue: (state) => "dropdown-single-value",
        }}
        styles={
                {
                    control(baseStyles, state){
                        return {
                            ...baseStyles,
                            cursor:state.isDisabled?'not-allowed':'pointer'
                        }
                    },
                    dropdownIndicator(baseStyles, _) {
                        return {
                            ...baseStyles,
                            transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform .2s linear',
                            cursor: 'pointer',
                        }
                    },
                    container(baseStyles, _){
                        return {
                            cursor: 'pointer',
                        }
                    }
                }
            }
        />
    </div>
  );
};
