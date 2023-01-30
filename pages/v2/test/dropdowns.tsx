import { Dropdown, DropDownClass } from "../../../components/v2/Dropdown";
import React from "react";
import {UserGroupIcon} from "@heroicons/react/24/outline";

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
    // <div className="test-page-wrap">
    <form action="pages">
      <div className="App">
        <Dropdown
          options={options}
          label="large"
          icon={<UserGroupIcon className="icon"/>}
          numberOfOptions={8}
        />
        <Dropdown options={options} label="medium" icon={<UserGroupIcon className="icon"/>} />
        <Dropdown options={options} label="small" icon={<UserGroupIcon className="icon"/>} />
        <Dropdown
          options={options}
          label="large"
          icon={<UserGroupIcon className="icon"/>}
          className={DropDownClass.DISABLED}
        />
        <Dropdown
          options={options}
          label="medium"
          icon={<UserGroupIcon className="icon"/>}
          className={DropDownClass.DISABLED}
          numberOfOptions={8}
        />
        <Dropdown
          options={options}
          label="small"
          icon={<UserGroupIcon className="icon"/>}
          className={DropDownClass.DISABLED}
        />
        <Dropdown
          options={options}
          label="large"
          icon={<UserGroupIcon className="icon"/>}
          className={DropDownClass.SUCCESS}
        />
        <Dropdown
          options={options}
          label="medium"
          icon={<UserGroupIcon className="icon"/>}
          className={DropDownClass.SUCCESS}
        />
         <Dropdown
            options={options}
            label="small"
            icon={<UserGroupIcon className="icon"/>}
            className={DropDownClass.SUCCESS}
          />
          <Dropdown
            options={options}
            label="large"
            icon={<UserGroupIcon className="icon"/>}
            className={DropDownClass.ERROR}
          />
          <Dropdown
            options={options}
            label="medium"
            icon={<UserGroupIcon className="icon"/>}
            className={DropDownClass.ERROR}
          />
          <Dropdown
            options={options}
            label="small"
            icon={<UserGroupIcon className="icon"/>}
            className={DropDownClass.ERROR}
          />
        <div className="test-wrap-50">
        <Dropdown
          options={options}
          label="large"
          icon={<UserGroupIcon className="icon"/>}
          numberOfOptions={8}
        />
        <Dropdown options={options} label="medium" icon={<UserGroupIcon className="icon"/>} />
        <Dropdown options={options} label="small" icon={<UserGroupIcon className="icon"/>} />
        <Dropdown
          options={options}
          label="large"
          icon={<UserGroupIcon className="icon"/>}
          className={DropDownClass.DISABLED}
        />
        <Dropdown
          options={options}
          label="medium"
          icon={<UserGroupIcon className="icon"/>}
          className={DropDownClass.DISABLED}
          numberOfOptions={8}
        />
        <Dropdown
          options={options}
          label="small"
          icon={<UserGroupIcon className="icon"/>}
          className={DropDownClass.DISABLED}
        />
        <Dropdown
          options={options}
          label="large"
          icon={<UserGroupIcon className="icon"/>}
          className={DropDownClass.SUCCESS}
        />
        <Dropdown
          options={options}
          label="medium"
          icon={<UserGroupIcon className="icon"/>}
          className={DropDownClass.SUCCESS}
        />
         <Dropdown
            options={options}
            label="small"
            icon={<UserGroupIcon className="icon"/>}
            className={DropDownClass.SUCCESS}
          />
          <Dropdown
            options={options}
            label="large"
            icon={<UserGroupIcon className="icon"/>}
            className={DropDownClass.ERROR}
          />
          <Dropdown
            options={options}
            label="medium"
            icon={<UserGroupIcon className="icon"/>}
            className={DropDownClass.ERROR}
          />
          <Dropdown
            options={options}
            label="small"
            icon={<UserGroupIcon className="icon"/>}
            className={DropDownClass.ERROR}
          />
        </div>
        <div className="test-wrap-25">
          <Dropdown
          options={options}
          label="large"
          icon={<UserGroupIcon className="icon"/>}
          numberOfOptions={8}
        />
        <Dropdown options={options} label="medium" icon={<UserGroupIcon className="icon"/>} />
        <Dropdown options={options} label="small" icon={<UserGroupIcon className="icon"/>} />
        <Dropdown
          options={options}
          label="large"
          icon={<UserGroupIcon className="icon"/>}
          className={DropDownClass.DISABLED}
        />
        <Dropdown
          options={options}
          label="medium"
          icon={<UserGroupIcon className="icon"/>}
          className={DropDownClass.DISABLED}
          numberOfOptions={8}
        />
        <Dropdown
          options={options}
          label="small"
          icon={<UserGroupIcon className="icon"/>}
          className={DropDownClass.DISABLED}
        />
        <Dropdown
          options={options}
          label="large"
          icon={<UserGroupIcon className="icon"/>}
          className={DropDownClass.SUCCESS}
        />
        <Dropdown
          options={options}
          label="medium"
          icon={<UserGroupIcon className="icon"/>}
          className={DropDownClass.SUCCESS}
        />
         <Dropdown
            options={options}
            label="small"
            icon={<UserGroupIcon className="icon"/>}
            className={DropDownClass.SUCCESS}
          />
          <Dropdown
            options={options}
            label="large"
            icon={<UserGroupIcon className="icon"/>}
            className={DropDownClass.ERROR}
          />
          <Dropdown
            options={options}
            label="medium"
            icon={<UserGroupIcon className="icon"/>}
            className={DropDownClass.ERROR}
          />
          <Dropdown
            options={options}
            label="small"
            icon={<UserGroupIcon className="icon"/>}
            className={DropDownClass.ERROR}
          />
         </div>
      </div>
    </form>
    // </div>
  );
}

export default dropdowns;
