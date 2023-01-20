import { mergeClassName } from "../../../lib/component";

export type InputProperties = {
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ style, className, ...props }: InputProperties) => {
  return (
    <div style={style} className={mergeClassName('input', className)}>
			<input {...props} type="text" />
		</div>
  );
};

export default Input;