import Select, { components, DropdownIndicatorProps } from 'react-select';
import React, { useState, useRef } from 'react';

const leftInputPadding=26; //in px
const hoveredOption='#404040';
const themeColor='#1E1E1E';

interface BaseDropdownProps {
    options: {
        value: string,
        label: string
    }[],
    label:string,
    size: 'small' | 'medium' | 'large',
    icon?:React.FC,
    placeholder?: string,
}


export const BaseDropdown: React.FC<BaseDropdownProps> = ({ options, size,label,icon,placeholder = 'тиць...' }) => {
 

    const [selectedOption, setSelectedOption] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (<div className='_dropdown'>

        <span>{label}</span>
        {icon&&<div className='dropdown-icon-container'>
            {icon({})}
        </div>}
        <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
            className={`_dropdown-container-${size}`}
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
                            paddingLeft:icon?`${leftInputPadding+20}px`:`${leftInputPadding}px`
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
            classNamePrefix={`_dropdown`}
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