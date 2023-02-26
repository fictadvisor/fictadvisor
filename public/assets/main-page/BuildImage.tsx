import React, { useState } from 'react';

import ImageHover from './ImageHover';
import ImageNohover from './ImageNohover';

export const BuildImage = () => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      {isHovering ? <ImageHover /> : <ImageNohover />}
    </div>
  );
};
