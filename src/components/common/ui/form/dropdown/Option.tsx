import { FC, HTMLAttributes } from 'react';

import type { DropDownOption } from './Dropdown';

interface OptionProps {
  option: DropDownOption;
  props: HTMLAttributes<HTMLLIElement>;
}
import Tag from '../../tag-mui/Tag';

export const Option: FC<OptionProps> = ({ option, props }) => {
  if ('text' in option) {
    return (
      <span {...props}>
        <Tag {...option} />
      </span>
    );
  } else {
    return <span {...props}>{option.label}</span>;
  }
};
