export {};
// import React, { useRef, useState } from 'react';
// import mergeClassNames from 'merge-class-names';

// import styles from '@/components/common/composite/cards/Cards.module.scss';
// import Button, { ButtonSize, ButtonType } from '@/components/common/ui/button';
// import Rating from '@/components/common/ui/rating';
// import Tag, { TagState } from '@/components/common/ui/tag';
// import Tooltip from '@/components/common/ui/tooltip';

// import {
//   CheckIcon,
//   DoubleCheckIcon,
// } from '../../custom-svg/card-icons/CheckIcon';

// type DivProps = React.DetailedHTMLProps<
//   React.HTMLAttributes<HTMLDivElement>,
//   HTMLDivElement
// >;

// type HeaderCardProps = {
//   name: string;
//   groupName: string;
//   position: string;
//   url?: string;
// } & DivProps;

// type LecturerHeaderCardProps = {
//   name: string;
//   description: string;
//   url?: string;
// } & DivProps;

// type LecturerPollCardProps = {
//   name: string;
//   description: string;
//   roles: string[];
//   url?: string;
// } & DivProps;

// type PollCard = {
//   questionNumber: number;
//   question: string;
//   numberOfAnswered: number;
//   numberOfQuestions: number;
// } & DivProps;

// type RatingCardProps = {
//   name: string;
//   rating?: number;
//   roles?: string[];
//   url?: string;
// } & DivProps;

// type SimpleCardProps = {
//   name: string;
//   details?: string;
//   rating?: number;
//   disabled?:boolean;
// } & DivProps;

// const useToolTip = (element: HTMLDivElement, toolTipWidth: number): any => {
//   //to find out if the div element is truncated
//   let isTruncated;

//   let offsetX, offsetY, toolTipDirection;

//   if (element) {
//     const props = element.getBoundingClientRect();
//     isTruncated = element.scrollHeight - 1 > props.height;
//     offsetY = window.scrollY + props.top;

//     if (props.right + toolTipWidth > window.innerWidth) {
//       //tooltip is over the screen

//       offsetX = { left: props.left - toolTipWidth };
//       toolTipDirection = 'right';
//     } else {
//       //tooltip is within the screen

//       // console.log("here");
//       offsetX = { left: props.right };
//       toolTipDirection = 'left';
//     }
//   }
//   return { offsetX, isTruncated, offsetY, toolTipDirection };
// };

// export const HeaderCard: React.FC<HeaderCardProps> = ({
//   name,
//   groupName,
//   position,
//   url = '/assets/icons/frog36.png',
//   ...rest
// }) => {
//   return (
//     <div className={mergeClassNames(styles[`header-card-container`])} {...rest}>
//       <div className={styles[`header-card-info`]}>
//         <h4 className={styles[`card-name`]}>{name}</h4>
//         <div>
//           <span className={styles['header-card-postition']}>{position}</span>
//           <span className={styles['header-card-group-name']}>{groupName}</span>
//         </div>
//       </div>
//       <img src={url} alt="Картинка профілю" />
//     </div>
//   );
// };

// export const LecturerHeaderCard: React.FC<LecturerHeaderCardProps> = ({
//   name,
//   description,
//   url = '/assets/icons/lecturer60.png',
//   ...rest
// }) => {
//   const [showToolTip, setShowToolTip] = useState<boolean>(false);
//   const ref = useRef<HTMLParagraphElement>(null);
//   const { offsetX, offsetY, isTruncated, toolTipDirection } = useToolTip(
//     ref.current,
//     300,
//   );

//   return (
//     <div
//       className={mergeClassNames(
//         styles['card'],
//         styles['header-lecturer-card-container'],
//       )}
//       {...rest}
//     >
//       <img src={url} alt="картинка викладача" />
//       <div className={styles['header-lecturer-card-info']}>
//         <h4 className={styles['card-name']}>{name}</h4>
//         <div
//           ref={ref}
//           className={styles['lecturer-description']}
//           onMouseEnter={() => setShowToolTip(true)}
//           onMouseLeave={() => setShowToolTip(false)}
//         >
//           {description}

//           {showToolTip && isTruncated && (
//             <Tooltip
//               text={description}
//               style={{
//                 position: 'absolute',
//                 ...offsetX,
//                 width: '300px',
//                 fontSize: '11px',
//                 top: offsetY,
//               }}
//               direction={toolTipDirection}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export const LecturerPollCard: React.FC<LecturerPollCardProps> = ({
//   name,
//   description,
//   roles,
//   url = '/assets/icons/lecturer60.png',
//   ...rest
// }) => {
//   const [showToolTip, setShowToolTip] = useState<boolean>(false);
//   const ref = useRef<HTMLParagraphElement>(null);
//   const { offsetX, offsetY, isTruncated, toolTipDirection } = useToolTip(
//     ref.current,
//     300,
//   );

//   return (
//     <article
//       className={mergeClassNames(
//         styles['card'],
//         styles['card-effect'],
//         styles['lecturer-poll-card-container'],
//       )}
//       {...rest}
//     >
//       <img className={styles['card-avatar']} src={url} alt="викладач" />
//       <br />
//       <CardRoles roles={roles} />
//       <h4 className={styles['card-name']}>{name}</h4>
//       <div
//         ref={ref}
//         className={styles['lecturer-description']}
//         onMouseEnter={() => setShowToolTip(true)}
//         onMouseLeave={() => setShowToolTip(false)}
//       >
//         {description}
//         {showToolTip && isTruncated && (
//           <Tooltip
//             text={description}
//             direction={toolTipDirection}
//             style={{
//               position: 'absolute',
//               ...offsetX,
//               width: '300px',
//               fontSize: '11px',
//               top: offsetY,
//             }}
//           />
//         )}
//       </div>

//       <Button
//         type={ButtonType.SECONDARY_RED}
//         size={ButtonSize.SMALL}
//         text={'Пройти опитування'}
//       ></Button>
//     </article>
//   );
// };

// export const PollCard: React.FC<PollCard> = ({
//   questionNumber,
//   question,
//   numberOfAnswered,
//   numberOfQuestions,
//   ...rest
// }) => {
//   let isDoubleCheckIcon,
//     showIcon = true;
//   if (numberOfAnswered >= 1 && numberOfAnswered !== numberOfQuestions) {
//     isDoubleCheckIcon = false;
//   } else if (numberOfAnswered === numberOfQuestions) {
//     isDoubleCheckIcon = true;
//   } else if (numberOfAnswered === 0) showIcon = false;

//   return (
//     <div
//       className={mergeClassNames(styles['card'], styles['poll-card-container'])}
//       {...rest}
//     >
//       <div>
//         <b>{questionNumber}. Рейтингова система</b>
//         <p>{`${numberOfAnswered}/${numberOfQuestions} запитання`}</p>
//       </div>
//       <div className="icon">
//         {showIcon && (isDoubleCheckIcon ? <DoubleCheckIcon /> : <CheckIcon />)}
//       </div>
//     </div>
//   );
// };

// export const RatingCard: React.FC<RatingCardProps> = ({
//   rating,
//   name,
//   roles,
//   url = '/assets/icons/lecturer60.png',
//   ...rest
// }) => {
//   return (
//     <article
//       className={mergeClassNames(
//         styles['card'],
//         styles['card-effect'],
//         styles['rating-card-container'],
//       )}
//       {...rest}
//     >
//       <img className={styles['card-avatar']} src={url} alt="викладач" />

//       {rating && <Rating rating={rating} />}
//       {!rating && <br />}
//       {roles && <CardRoles roles={roles} />}
//       <h4 className={styles['card-name']}>{name}</h4>
//     </article>
//   );
// };

// export const SimpleCard: React.FC<SimpleCardProps> = ({
//   name,
//   details,
//   rating,
//   disabled
// }) => {
//   const [showToolTip, setShowToolTip] = useState<boolean>(false);
//   const ref = useRef<HTMLParagraphElement>(null);
//   const { offsetX, offsetY, isTruncated, toolTipDirection } = useToolTip(
//     ref.current,
//     300,
//   );

//   return (
//     <article
//       className={mergeClassNames(
//         (disabled&&styles['card-disabled']),
//         styles['card'],
//         styles['card-effect'],
//         styles['simple-card-container'],
//       )}
//     >
//       <div
//         ref={ref}
//         className={mergeClassNames(
//           styles['card-name '],
//           styles['simple-card-name'],
//         )}
//         onMouseEnter={() => setShowToolTip(true)}
//         onMouseLeave={() => setShowToolTip(false)}
//       >
//         {name}
//         {showToolTip && isTruncated && (
//           <Tooltip
//             text={name}
//             direction={toolTipDirection}
//             style={{
//               position: 'absolute',
//               ...offsetX,
//               width: '300px',
//               fontSize: '11px',
//               top: offsetY,
//             }}
//           />
//         )}
//       </div>

//       {details && <p>{details}</p>}
//       {rating && (
//         <Rating rating={rating} style={{ justifyContent: 'flex-start' }} />
//       )}
//     </article>
//   );
// };

// const CardRoles: React.FC<{ roles: string[] }> = ({ roles }) => {
//   return (
//     <div className={styles['card-roles']}>
//       {roles.map(role => {
//         switch (role) {
//           case 'лаборант':
//             return (
//               <Tag
//                 state={TagState.SMALL}
//                 text="Лаборант"
//                 className={'mint-first'}
//                 key={Math.random()}
//               />
//             );
//           case 'лектор':
//             return (
//               <Tag
//                 state={TagState.SMALL}
//                 text="Лектор"
//                 className={'violet-first'}
//                 key={Math.random()}
//               />
//             );
//           case 'практик':
//             return (
//               <Tag
//                 state={TagState.SMALL}
//                 text="Практик"
//                 className={'orange-first'}
//                 key={Math.random()}
//               />
//             );
//         }
//       })}
//     </div>
//   );
// };
