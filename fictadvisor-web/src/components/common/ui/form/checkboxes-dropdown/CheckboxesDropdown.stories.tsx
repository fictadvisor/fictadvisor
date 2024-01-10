// import React from 'react';
// import { action } from '@storybook/addon-actions';
// import type { Meta, Story } from '@storybook/react';
//
// const options = [
//   { label: 'Option 1', value: 'option1', checked: false },
//   { label: 'Option 2', value: 'option2', checked: true },
// ];
//
// const actions = {
//   updateCheckboxes: action('updateCheckboxes'),
// };
//
// const meta: Meta = {
//   title: 'Ui Kit/Components/Form/CheckboxesDropdown',
//   component: CheckboxesDropdown,
//   parameters: {
//     layout: 'centered',
//   },
//   argTypes: {
//     options: { control: 'object' },
//     updateCheckboxes: { action: 'updateCheckboxes' },
//   },
//   tags: ['autodocs'],
// };
//
// export default meta;
//
// type CheckboxesDropdownProps = React.ComponentProps<typeof CheckboxesDropdown>;
//
// const Template: Story<CheckboxesDropdownProps> = args => (
//   <CheckboxesDropdown {...args} />
// );
//
// export const Base = Template.bind({});
// Base.args = {
//   options,
//   updateCheckboxes: actions.updateCheckboxes,
// };
//
// export const WithCustomPlaceholder = Template.bind({});
// WithCustomPlaceholder.args = {
//   options,
//   updateCheckboxes: actions.updateCheckboxes,
//   placeholder: 'Custom Placeholder',
// };
//
// export const WithDisabledClearable = Template.bind({});
// WithDisabledClearable.args = {
//   options,
//   updateCheckboxes: actions.updateCheckboxes,
//   disableClearable: true,
// };
