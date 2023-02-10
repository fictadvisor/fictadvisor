import Select from "react-select";
import React, { ReactNode, useState } from "react";
import styles from "./Dropdown.module.scss";


const dropDownOptionHeight = 36; //px

export enum DropDownState {
  ERROR = "error",
  SUCCESS = "success",
  DISABLED = "disabled",
}

type DropDownOption = {
  value: string;
  label: string;
};

interface DropdownProps {
  options: DropDownOption[];
  label: string;
  className?: DropDownState;
  icon?: ReactNode;
  placeholder?: string;
  noOptionsText?: string;
  disabledPlaceholder?: string;
  numberOfOptions?: number;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  label,
  className,
  icon,
  placeholder = className === DropDownState.DISABLED
    ? "Недоступно..."
    : "Тиць...",
  noOptionsText = "Опції відсутні",
  numberOfOptions = 4,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDisabled = className === "disabled";

  return (
    <div className={styles["dropdown"]}>
      <span className={className ? styles[`dropdown-${className}-label`] : ""}>
        {label}
      </span>
      {icon && <div className={styles["dropdown-icon-container"]}>{icon}</div>}

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
              ? styles["dropdown-control"] + " " + styles["dropdown-control-iconed"]
              : styles["dropdown-control"],
          container: (state) =>
            `${styles["dropdown-container"]} ${styles[`dropdown-container-${className}`]}`,
        //   input: (state) => "dropdown-input",
          menu: (state) => styles["dropdown-menu"],
          menuList: (state) => styles["dropdown-menu-list"],
          option: (state) =>
            state.isSelected
              ? styles["dropdown-option"] + " " + styles["dropdown-option-selected"]
              : styles["dropdown-option"],
          placeholder: (state) => state.isDisabled? styles['dropdown-placeholder-disabled']: styles['dropdown-placeholder'],
          singleValue: (state) => styles["dropdown-single-value"],
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

export default Dropdown;