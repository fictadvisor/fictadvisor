import { SmallDropdown } from "../components/v2/ui/dropdowns/SmallDropdown";
import { MediumDropdown } from "../components/v2/ui/dropdowns/MediumDropdown";
import { LargeDropdown } from "../components/v2/ui/dropdowns/LargeDropdown";

import GroupIcon from "../components/v2/ui/icons/GroupIcon";
interface OwnProps { }

type Props = OwnProps;

function dropdownsTest() {

    const test = [{ id: 'id1', name: 'test1' },
    { id: 'id2', name: 'test2' },
    { id: 'id3', name: 'test3' },
    { id:'id4', name: 'test4' },
    { id: 'id5', name: 'test5' },
    { id: 'id6', name: 'test6' }]

    return (
        <div id="container">
            <SmallDropdown options={test} label={'Test Small'}/>
            <MediumDropdown options={test} label={'Test Medium'}/>
            <LargeDropdown options={test} label={'Test Large'}/>
            <SmallDropdown options={test} label={'Test Small'} icon={GroupIcon}/>
            <MediumDropdown options={test} label={'Test Medium'}  icon={GroupIcon}/>
            <LargeDropdown options={test} label={'Test Large'}  icon={GroupIcon}/>
            <SmallDropdown options={test} label={'Test Small'} className='success'/>
            <MediumDropdown options={test} label={'Test Medium'} className='success'/>
            <LargeDropdown options={test} label={'Test Large'} className='success'/>
            <SmallDropdown options={test} label={'Test Small'} className='error'/>
            <MediumDropdown options={test} label={'Test Medium'} className='error'/>
            <LargeDropdown options={test} label={'Test Large'} className='error'/>
        </div>
    );
}

export default dropdownsTest;
