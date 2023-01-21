import { SmallDropdown } from "../components/v2/ui/dropdowns/SmallDropdown";
import { MediumDropdown } from "../components/v2/ui/dropdowns/MediumDropdown";
import { LargeDropdown } from "../components/v2/ui/dropdowns/LargeDropdown";

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
            <SmallDropdown options={test} />
            <MediumDropdown options={test} />
            <LargeDropdown options={test} />
        </div>
    );
}

export default dropdownsTest;
