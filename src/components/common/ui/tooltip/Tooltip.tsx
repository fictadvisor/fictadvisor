import React, { useEffect, useReducer, useRef, useState } from 'react';
import mergeClassNames from 'merge-class-names';

import styles from './Tooltip.module.scss';

export enum TooltipPosition {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
}

type Position = 'top' | 'bottom' | 'left' | 'right';

type TooltipProps = {
  text?: string;
  position?: Position;
  hasArrow?: boolean;
  style?: React.CSSProperties;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

interface TooltipState {
  stylesObj: React.CSSProperties;
  position: Position;
}

const getInitialStylesObj = (position: Position) => {
  return {
    stylesObj: { transform: `translateX(0px)` },
    position,
  };
};

const reducer = (prev, action): TooltipState => {
  let { position } = prev;

  switch (position) {
    case 'right':
      if (
        action.divDimensions.right + action.toolTipDimensions.width >
        window.innerWidth
      )
        position = 'left';
      else
        return {
          position,
          stylesObj: {
            transform: `
          translateX(${action.divDimensions.width}px)
          translateY(${
            action.divDimensions.height / 2 -
            action.toolTipDimensions.height / 2
          }px)`,
          },
        };
    case 'left':
      return {
        position,
        stylesObj: {
          transform: `
          translateX(${-action.toolTipDimensions.width}px)
          translateY(${
            action.divDimensions.height / 2 -
            action.toolTipDimensions.height / 2
          }px)`,
        },
      };
    case 'bottom':
      return {
        position,
        stylesObj: {
          transform: `
            translateX(${
              action.divDimensions.width / 2 -
              action.toolTipDimensions.width / 2
            }px)
            translateY(${action.divDimensions.height}px)`,
        },
      };
    case 'top':
      return {
        position,
        stylesObj: {
          transform: `
             translateX(${
               action.divDimensions.width / 2 -
               action.toolTipDimensions.width / 2
             }px)
             translateY(${-action.toolTipDimensions.height}px)`,
        },
      };
  }
  return prev;
};

const Tooltip: React.FC<TooltipProps> = ({
  text,
  children,
  position = 'right',
  hasArrow = true,
  style,
  ...props
}) => {
  const [showToolTip, setShowToolTip] = useState<boolean>(false);
  const [tooltipState, dispatchstylesObj] = useReducer(
    reducer,
    getInitialStylesObj(position),
  );

  const toolTipRef = useRef<null | HTMLDivElement>(null);
  const divRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (showToolTip) {
      const divDimensions = divRef.current.getBoundingClientRect();
      const toolTipDimensions = toolTipRef.current?.getBoundingClientRect();
      dispatchstylesObj({ position, divDimensions, toolTipDimensions });
    }
  }, [showToolTip, position]);

  return (
    <div
      ref={divRef}
      className={styles['tooltip-wrapper']}
      onMouseEnter={() => setShowToolTip(true)}
      onMouseLeave={() => setShowToolTip(false)}
      {...props}
    >
      {showToolTip && (
        <div
          className={styles['tooltip-body']}
          style={{ ...tooltipState.stylesObj, ...style }}
          ref={toolTipRef}
        >
          <span
            className={mergeClassNames(
              styles['tooltip-text'],
              hasArrow && styles[`tooltip-text-${tooltipState.position}`],
            )}
          >
            {text}
          </span>
        </div>
      )}

      {children}
    </div>
  );
};

export default Tooltip;
