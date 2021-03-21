
type ButtonProperties = {
  active?: boolean;
  loading?: boolean;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export default function Button({ className, active, ...props }: ButtonProperties) {
  return (
    <button className={`${className ?? ''} ${active ? 'active' : null}`} {...props} />
  );
};
