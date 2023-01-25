import { GroupIcon } from "../../../components/v2/icons/GroupIcon";
import { SmallDropdown } from "../../../components/v2/dropdowns/SmallDropdown";
import { MediumDropdown } from "../../../components/v2/dropdowns/MediumDropdown";
import { LargeDropdown } from "../../../components/v2/dropdowns/LargeDropdown";
import { DropDownClasses } from "../../../components/v2/dropdowns/BaseDropdown";

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
      <form action="pages/v1">
        <div className="App">
          <SmallDropdown
            options={options}
            label="Вчителі"
            numberOfOptions={6}
          />
          <MediumDropdown
            options={options}
            label="Вчителі"
            numberOfOptions={6}
          />
          <LargeDropdown
            options={options}
            label="Вчителі"
            numberOfOptions={6}
          />
          <SmallDropdown options={options} label="Вчителі" />
          <MediumDropdown options={options} label="Вчителі" />
          <LargeDropdown options={options} label="Вчителі" />
          <SmallDropdown options={options} label="small" icon={GroupIcon} />
          <MediumDropdown options={options} label="medium" icon={GroupIcon} />
          <LargeDropdown options={options} label="large" icon={GroupIcon} />
          <SmallDropdown
            options={options}
            label="Вчителі"
            className={DropDownClasses.SUCCESS}
          />
          <MediumDropdown
            options={options}
            label="medium"
            className={DropDownClasses.SUCCESS}
          />
          <LargeDropdown
            options={options}
            label="large"
            className={DropDownClasses.SUCCESS}
          />
          <SmallDropdown
            options={options}
            label="small"
            icon={GroupIcon}
            className={DropDownClasses.ERROR}
          />
          <MediumDropdown
            options={options}
            label="medium"
            icon={GroupIcon}
            className={DropDownClasses.ERROR}
          />
          <LargeDropdown
            options={options}
            label="large"
            icon={GroupIcon}
            className={DropDownClasses.ERROR}
          />
          <SmallDropdown
            options={options}
            label="small"
            icon={GroupIcon}
            className={DropDownClasses.DISABLED}
          />
          <MediumDropdown
            options={options}
            label="medium"
            icon={GroupIcon}
            className={DropDownClasses.DISABLED}
          />
          <LargeDropdown
            options={options}
            label="large"
            icon={GroupIcon}
            className={DropDownClasses.DISABLED}
          />
        </div>
      </form>
    </div>
  );
}

export default dropdowns;
