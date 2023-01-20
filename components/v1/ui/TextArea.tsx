import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';

export type TextAreaProperties = {} & TextareaAutosizeProps;

const TextArea = ({ ...props }: TextAreaProperties) => {
  return (
    <TextareaAutosize {...props} />
  );
};

export default TextArea;