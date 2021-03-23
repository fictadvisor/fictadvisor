
type ButtonProperties = {
  active?: boolean;
  loading?: boolean;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const ButtonLoader = () => <div className="ld ld-ring ld-spin"></div>;

export default function Button({ className, disabled, active, loading, children, ...props }: ButtonProperties) {
  return (
    <button disabled={disabled || loading} className={`${className ?? ''} ${active ? 'active' : ''}`} {...props} >
      {
        loading 
          ? <ButtonLoader />
          : children
      }
    </button>
  );
};
