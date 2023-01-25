import Select from 'react-select';
import React, { useState } from 'react';

const leftInputPadding = 26; //in px
const hoveredOption = '#404040';
const themeColor = '#1E1E1E';
const dropDownOptionHeight = 36; //px
const padding=8; // px

export enum DropDownClasses{
    ERROR='error',
    SUCCESS='success',
    DISABLED='disabled'
}

export type DropDownOption = {
    value: string,
    label: string
}

export interface BaseDropdownProps {
    options: DropDownOption[],
    label: string,
    className?: 'error' | 'success' | 'disabled',
    icon?: React.FC,
    placeholder?: string,
    noOptionsText?: string,
    disabledPlaceholder?: string,
    size?: 'small' | 'medium' | 'large',
    numberOfOptions?:number
}

export const BaseDropdown: React.FC<BaseDropdownProps> = (
    { options,
        size,
        label,
        className,
        icon,
        placeholder = className===DropDownClasses.DISABLED?'Недоступно...':'Тиць...',
        noOptionsText = 'Опції відсутні',
        numberOfOptions=4
    }) => {

    const [selectedOption, setSelectedOption] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isDisabled = className === 'disabled';

    return (<div className='dropdown'>

        <span className={`${className ? `dropdown-${className}-label` : ''}`}>{label}</span>
        {icon && <div className='dropdown-icon-container'>
            {icon({})}
        </div>}
        <Select
            noOptionsMessage={() => noOptionsText}
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
            className={` dropdown-container-${size} ${className ? `dropdown-${className}` : ''}`}
            styles={
                {
                    dropdownIndicator(baseStyles, _) {
                        return {
                            ...baseStyles,
                            transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform .2s linear',
                            cursor: 'pointer',
                        }
                    },
                    control(baseStyles, _) {
                        return {
                            ...baseStyles,
                            paddingLeft: icon ? `${leftInputPadding + 15}px` : `${leftInputPadding}px`
                        }

                    },
                    option(baseStyles, state) {
                        return {
                            ...baseStyles,
                            backgroundColor: state.isSelected ? hoveredOption : themeColor
                        }
                    },


                }
            }
            onMenuOpen={() => setIsMenuOpen(true)}
            onMenuClose={() => setIsMenuOpen(false)}
            classNamePrefix={`dropdown`}
            isSearchable={true}
            isClearable={false}
            placeholder={placeholder}
            maxMenuHeight={dropDownOptionHeight*numberOfOptions+padding*2}
            minMenuHeight={dropDownOptionHeight}
            unstyled={true}
            openMenuOnClick={true}
            blurInputOnSelect={true}
            isDisabled={isDisabled}
        />
    </div>

    )

}