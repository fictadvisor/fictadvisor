import { FC } from 'react';

export const AlertXMark: FC<{ onClick: () => void }> = ({ onClick }) => (
  <svg
    onClick={onClick}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4 12L12 4L4 12ZM4 4L12 12Z" fill="#737373" />
    <path
      d="M4 4L12 12M4 12L12 4L4 12Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
