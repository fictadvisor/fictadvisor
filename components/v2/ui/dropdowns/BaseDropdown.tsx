export interface DropdownOption {
    id: string;
    [prop: string]: string;
}


export const BaseDropdown: React.FC<{ options: DropdownOption[], size: string }> = ({ options, size }) => {
    return (




        <div className={`dropdown ${size}-dropdown`}>
            <input readOnly={true} placeholder='Виберіть...' type="text" />
            <div className="dropdown-menu">
                {options.map((option) =>
                    <div key={option.id}>
                        {option?.name}
                    </div>)}
            </div>





        </div>
    )



}