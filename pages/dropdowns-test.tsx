

import GroupIcon from "../components/v2/ui/icons/GroupIcon";
import { BaseDropdown } from "../components/v2/ui/dropdowns/BaseDropdown";
interface OwnProps { }

type Props = OwnProps;

function dropdownsTest() {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla2', label: 'Vanilla' },
        { value: 'chocolate2', label: 'Chocolate' },
        { value: 'strawberry2', label: 'Strawberry' },
        { value: 'vanilla3', label: 'Vanilla' },{ value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry3', label: 'Strawberry' },
        { value: 'vanilla4', label: 'Vanilla' },
        { value: 'chocolate3', label: 'Chocolate' },
        { value: 'strawberry4', label: 'Strawberry' },
        { value: 'vanilla5', label: 'Vanilla' }
      ];
   

      const size='small';

    return (
        <div id="container">
            <form action="">
                 <div className="App">
                    <BaseDropdown options={options} size='small' label="small"/>
                    <BaseDropdown options={options} size='medium' label="medium"/>
                    <BaseDropdown options={options} size='large' label="large"/>
                    <BaseDropdown options={options} size='small' label="small" icon={GroupIcon}/>
                    <BaseDropdown options={options} size='medium' label="medium" icon={GroupIcon}/>
                    <BaseDropdown options={options} size='large' label="large" icon={GroupIcon}/>
                 </div>
            </form>
        </div>
    );
}

export default dropdownsTest;
