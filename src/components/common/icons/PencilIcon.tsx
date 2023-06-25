import { FC } from 'react';

const PencilIcon: FC<{ onClick?: () => void }> = props => {
  return (
    <svg
      {...props}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.232 5.23209L18.768 8.76809M16.732 3.73209C17.2009 3.26318 17.8369 2.99976 18.5 2.99976C19.1631 2.99976 19.7991 3.26318 20.268 3.73209C20.7369 4.20099 21.0003 4.83696 21.0003 5.50009C21.0003 6.16321 20.7369 6.79918 20.268 7.26809L6.5 21.0361H3V17.4641L16.732 3.73209Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PencilIcon;
