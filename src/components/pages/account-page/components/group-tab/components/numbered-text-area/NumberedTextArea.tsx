import { FC, UIEvent, useState } from 'react';
import { useField } from 'formik';

import styles from './NumberedTextArea.module.scss';

export enum NumberedTextAreaSize {
  LARGE = 'large',
  SMALL = 'small',
}

interface NumberedTextAreaProps {
  name: string;
  placeholder?: string;
  label?: string;
  size?: NumberedTextAreaSize;
  isDisabled?: boolean;
  className?: string;
}

const NumberedTextArea: FC<NumberedTextAreaProps> = ({
  name,
  placeholder,
  label,
  size = NumberedTextAreaSize.LARGE,
  isDisabled = false,
  className,
}) => {
  const [field] = useField(name);
  const [scrollTop, setScrollTop] = useState(0);

  const numbers = [];
  let numberOfLines = 0;
  const handlerScroll = (event: UIEvent<HTMLTextAreaElement>) => {
    setScrollTop((event.target as HTMLTextAreaElement).scrollTop);
  };

  const divClasses = [
    styles['textarea'],
    styles[size ? `${size}-area` : ''],
    className,
  ];

  if (field.value.includes(',') || field.value.includes(';')) {
    field.value = field.value
      .replace(/,/g, '\n')
      .replace(/;/g, '\n')
      .replace(/\s+/g, '\n')
      .replace(/\n\n/g, '\n');
  }
  field.value = field.value.replace(/\s+/g, '\n');
  field.value = field.value.replace(/\n\n/g, '\n');
  numberOfLines = field.value.split('\n').length;

  for (let i = 0; i < numberOfLines; i++) {
    numbers.push(<span key={i}></span>);
  }

  return (
    <div className={divClasses.join(' ')}>
      <div className={styles['divlines']}>
        <div className={styles['line-numbers']} style={{ top: -scrollTop }}>
          <>{numbers}</>
        </div>
      </div>
      {label && <label>{label}</label>}
      <textarea
        onScroll={handlerScroll}
        {...field}
        className={styles['textarea_input']}
        disabled={isDisabled}
        placeholder={placeholder}
      />
    </div>
  );
};

export default NumberedTextArea;
