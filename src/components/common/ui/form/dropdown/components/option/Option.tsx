import { FC, HTMLProps } from 'react';

import { DropDownOption } from '../../types';

interface OptionProps extends HTMLProps<HTMLLIElement> {
  option: DropDownOption;
}

import Tag from '@/components/common/ui/tag-mui';

const Option: FC<OptionProps> = ({ option, ...props }) => {
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

export default Option;
