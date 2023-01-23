

import GroupIcon from "../components/v2/ui/icons/GroupIcon";
import { BaseDropdown } from "../components/v2/ui/dropdowns/BaseDropdown";
import { SmallDropdown } from "../components/v2/ui/dropdowns/SmallDropdown";
import { MediumDropdown } from "../components/v2/ui/dropdowns/MediumDropdown";
import { LargeDropdown } from "../components/v2/ui/dropdowns/LargeDropdown";


interface OwnProps { }

type Props = OwnProps;

function dropdownsTest() {

    const options = [
        { value: 'chocolate', label: 'Сидоренко' },
        { value: 'strawberry', label: 'Поршенко' },
        { value: 'vanilla2', label: 'Гайчик' },
        { value: 'chocolate2', label: 'Смітюх' },
        { value: 'strawberry2', label: 'Сагайда' },
        { value: 'vanilla3', label: 'Войчук' },
        { value: 'chocolate', label: 'Братко' },
        { value: 'strawberry3', label: 'Вакарчук' },
        { value: 'vanilla4', label: 'Гіга' },
        { value: 'chocolate3', label: 'Пидоренко' },
        { value: 'strawberry4', label: 'Муха' },
        { value: 'vanilla5', label: 'Вєчєрковська' }
    ];



    return (
        <div id="container">
            <form action="">
                <div className="App">
                    <SmallDropdown options={options} label="Вчителі"/>
                    <MediumDropdown options={options}  label="medium" />
                    <LargeDropdown options={options} label="large" />
                    <SmallDropdown options={options} label="small" icon={GroupIcon} />
                    <MediumDropdown options={options}  label="medium" icon={GroupIcon} />
                    <LargeDropdown options={options} label="large" icon={GroupIcon} />
                    <SmallDropdown options={options} label="Вчителі" className='success' />
                    <MediumDropdown options={options}  label="medium" className='success' />
                    <LargeDropdown options={options} label="large" className='success' />
                    <SmallDropdown options={options} label="small" icon={GroupIcon} className='error' />
                    <MediumDropdown options={options}  label="medium" icon={GroupIcon} className='error' />
                    <LargeDropdown options={options} label="large" icon={GroupIcon} className='error' />
                    <SmallDropdown options={options} label="small" icon={GroupIcon} className='disabled' />
                    <MediumDropdown options={options}  label="medium" icon={GroupIcon} className='disabled' />
                    <LargeDropdown options={options} label="large" icon={GroupIcon} className='disabled' />
                </div>
            </form>
        </div>
    );
}

export default dropdownsTest;
