import { GroupIcon } from "../../components/v2/icons/GroupIcon";

import {
  DropDownClass,
  DropDownSize,
  Dropdown,
} from "../../components/v2/Dropdown";

function dropdowns() {
  const options = [
    { value: "chocolate", label: "Сидоренко" },
    { value: "strawberry", label: "Поршенко" },
    { value: "vanilla2", label: "Гайчик" },
    { value: "chocolate2", label: "Смітюх" },
    { value: "strawberry2", label: "Сагайда" },
    { value: "vanilla3", label: "Войчук" },
    { value: "chocolate", label: "Братко" },
    { value: "strawberry3", label: "Вакарчук" },
    { value: "vanilla4", label: "Гіга" },
    { value: "chocolate3", label: "Пидоренко" },
    { value: "strawberry4", label: "Муха" },
    { value: "vanilla5", label: "Вєчєрковська" },
  ];

  return (
    <div className="test-page-wrap">
      <form action="pages">
        <div className="App">
        <Dropdown
            options={options}
            label="large"
            icon={GroupIcon}
            className={DropDownClass.DISABLED}
            size={DropDownSize.LARGE}
          />
        <Dropdown
            options={options}
            label="medium"
            icon={GroupIcon}
            className={DropDownClass.DISABLED}
            size={DropDownSize.MEDIUM}
          />
        <Dropdown
            options={options}
            label="small"
            icon={GroupIcon}
            className={DropDownClass.DISABLED}
            size={DropDownSize.SMALL}
        />
               <Dropdown
            options={options}
            label="large"
            icon={GroupIcon}
            className={DropDownClass.SUCCES}
            size={DropDownSize.LARGE}
          />
        <Dropdown
            options={options}
            label="medium"
            icon={GroupIcon}
            className={DropDownClass.SUCCES}
            size={DropDownSize.MEDIUM}
          />
        <Dropdown
            options={options}
            label="small"
            icon={GroupIcon}
            className={DropDownClass.SUCCES}
            size={DropDownSize.SMALL}
        />
                     <Dropdown
            options={options}
            label="large"
            icon={GroupIcon}
            className={DropDownClass.ERROR}
            size={DropDownSize.LARGE}
          />
        <Dropdown
            options={options}
            label="medium"
            icon={GroupIcon}
            className={DropDownClass.ERROR}
            size={DropDownSize.MEDIUM}
          />
        <Dropdown
            options={options}
            label="small"
            icon={GroupIcon}
            className={DropDownClass.ERROR}
            size={DropDownSize.SMALL}
        />
        </div>
      </form>
    </div>
  );
}

export default dropdowns;
