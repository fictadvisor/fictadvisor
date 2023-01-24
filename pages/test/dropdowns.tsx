import GroupIcon from "../../components/v2/icons/GroupIcon";
import { SmallDropdown } from "../../components/v2/dropdowns/SmallDropdown";
import { MediumDropdown } from "../../components/v2/dropdowns/MediumDropdown";
import { LargeDropdown } from "../../components/v2/dropdowns/LargeDropdown";


function dropdowns() {

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
        <div className="test-page-wrap">
            <form action="pages">
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

export default dropdowns;
