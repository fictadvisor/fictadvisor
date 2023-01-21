import ChevronUpIcon from '../icons/ChevronUpIcon';
import ChevronDownIcon from '../icons/ChevronDownIcon';

import React, { useEffect, useRef,useState } from 'react';

export interface DropdownOption {
    id: string;
    [prop: string]: string;
}

export interface DropDownProps{
    options: DropdownOption[];
    size?: string;
    label:string;
    className?:'success'|'error'|'disabled';
    icon?:React.FC; 
}

export const BaseDropdown: React.FC<DropDownProps> = ({ options, size,label,icon,className }) => {
    
    const [option,setOption]=useState<DropdownOption|null>(null);
    const [isOpen,setIsOpen]=useState<boolean>(false);
    const [sortedOptions,setSortedOptions]=useState<DropdownOption[]>(options);
    const [inputValue,setInputValue]=useState<string>('');


    useEffect(()=>{
        if(inputValue.trim().length!=0){
        setSortedOptions((_)=>{
            const filtered=options.filter((option)=>{    
                return option.name.includes(inputValue)
            });
            return filtered;
            })
        }else{
            setSortedOptions(options);
        }
    },[inputValue]);

    const inputChangeHandler=(event)=>{
        setInputValue(event.target.value);
    }

    const chooseOptionHadler=(option)=>{
        setIsOpen(false);
        setInputValue(option.name);
        setOption(option);
    }

    const focusHandler=()=>{
        setIsOpen(true);
        setInputValue('');
    }

    return (
        <div className={`dropdown ${size}-dropdown`}>
            <div className={`dropdown-header dropdown-${className}`}>

                {icon&&<div className='dropdown-icon-container'>
                   {icon({})}
                </div>}

                <input type="hidden" name="id" required value={option?.id}/>

                <input
                    value={inputValue}
                    placeholder='Тиць...'
                    type="text"
                    onChange={inputChangeHandler}
                    onFocus={focusHandler}
                    />
                <span>{label}</span>

                <div 
                className={`dropdown-toggle-icon-container ${isOpen?'rotated':''}`}
                onClick={()=>setIsOpen(prev=>!prev)}
                >
                    {isOpen&&<ChevronUpIcon/>}
                    {!isOpen&&<ChevronDownIcon/>}
                </div>
            </div>
            
            <div className="dropdown-menu" hidden={isOpen?false:true}>
                {sortedOptions.length>0&&sortedOptions.map((option) =>
                    <div
                     key={option.id}
                     onClick={chooseOptionHadler.bind(null,option)}
                     className='dropdown-menu-option'
                    >
                        {option?.name}
                    </div>)}
                {
                    !sortedOptions.length&&<div className='dropdown-menu-mistake'>Інформація відсутня</div>
                }
            </div>
        </div>
    )
}