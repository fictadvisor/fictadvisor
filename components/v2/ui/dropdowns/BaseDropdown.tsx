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
    className?:'success'|'error';
    icon?:React.FC; 
}

export const BaseDropdown: React.FC<DropDownProps> = ({ options, size,label,icon,className }) => {
    
    const isOptionChosen=useRef<boolean>(false)
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
        console.log(option)
        setInputValue(option?.name);
    }

    return (
        <div className={`dropdown ${size}-dropdown`}>
            <div className={`dropdown-header dropdown-${className}`}>

                {icon&&<div className='dropdown-icon-container'>
                   {icon({})}
                </div>}

                <input
                    value={inputValue}
                    placeholder='Виберіть...'
                    type="text"
                    onChange={inputChangeHandler}
                    onFocus={()=>setIsOpen(true)}
                    onBlur={()=>setTimeout(()=>setIsOpen(false),200)}
                    />
                <span>{label}</span>

                <div 
                className='dropdown-toggle-icon-container'
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