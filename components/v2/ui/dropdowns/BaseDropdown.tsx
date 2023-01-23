import Select, { components, DropdownIndicatorProps } from 'react-select';
import React, { useState, useRef } from 'react';

const leftInputPadding=26; //in px
const hoveredOption='#404040';
const themeColor='#1E1E1E';

export type DropDownOption={
    value: string,
    label: string
}

export interface BaseDropdownProps {
    options: DropDownOption[],
    label:string,
    className?: 'error' | 'success' | 'disabled',
    icon?:React.FC,
    placeholder?: string,
    noOptionsText?:string
    size?: 'small' | 'medium' | 'large',
}


export const BaseDropdown: React.FC<BaseDropdownProps> = ({ options, size,label, className,icon,placeholder = 'Тиць...',noOptionsText='Опції відсутні',}) => {
 

    const [selectedOption, setSelectedOption] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (<div className='dropdown'>

        <span className={`${className?`dropdown-${className}-label`:''}`}>{label}</span>
        {icon&&<div className='dropdown-icon-container'>
            {icon({})}
        </div>}
        <Select
            noOptionsMessage={({inputValue}) => noOptionsText}
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
            className={` dropdown-container-${size} ${className?`dropdown-${className}`:''}`}
            styles={
                {
                    dropdownIndicator(baseStyles, _) {
                        return {
                            ...baseStyles,
                            transform: isMenuOpen?'rotate(180deg)':'rotate(0deg)',
                            transition: 'transform .2s linear',
                            cursor:'pointer',
                        }
                    },
                    control(baseStyles, _) {
                        return{
                            ...baseStyles,
                            paddingLeft:icon?`${leftInputPadding+15}px`:`${leftInputPadding}px`
                        }
                        
                    },
                    option(baseStyles, state) {
                        return{
                            ...baseStyles,
                            backgroundColor:state.isSelected?hoveredOption:themeColor
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
            maxMenuHeight={150}
            minMenuHeight={150}
            unstyled={true}
  
        />
    </div>

    )

}