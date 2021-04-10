import React from "react";

export type ButtonProperties = {
  active?: boolean;
  loading?: boolean;
  innerRef?: any;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const ButtonLoader = () => <div className="ld ld-ring ld-spin"></div>;

const Button = ({ className, disabled, active, loading, children, innerRef, ...props }: ButtonProperties) => {
  return (
    <button ref={innerRef} disabled={disabled || loading} className={`${className ?? ''} ${active ? 'active' : ''}`} {...props} >
      {
        loading 
          ? <ButtonLoader />
          : children
      }
    </button>
  );
};

export default Button;
