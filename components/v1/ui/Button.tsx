import React, { useState } from "react";
import { useAuthentication } from "../../../lib/context/AuthenticationContext";
import AuthenticationModal from "../AuthenticationModal";

export type ButtonProperties = {
  authenticated?: boolean;
  active?: boolean;
  loading?: boolean;
  innerRef?: any;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const ButtonLoader = () => <div className="ld ld-ring ld-spin"></div>;

const Button = ({ authenticated, className, disabled, active, loading, children, innerRef, onClick: _onClick, ...props }: ButtonProperties) => {
  const [modalOpen, setModalOpen] = useState(false);

  let onClick = _onClick;

  if (authenticated) {
    const { user } = useAuthentication();

    onClick = (...args) => {
      if (user) {
        return _onClick ? _onClick(...args) : null;
      }

      setModalOpen(true);

      console.log('no-no');
    };
  }

  return (
    <>
      {
        authenticated && modalOpen &&
        <AuthenticationModal />
      }
      <button ref={innerRef} onClick={onClick} disabled={disabled || loading} className={`${className ?? ''} ${active ? 'active' : ''}`} {...props} >
        {
          loading 
            ? <ButtonLoader />
            : children
        }
      </button>
    </>
  );
};

export default Button;
