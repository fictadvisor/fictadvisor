import { Dispatch, FC, SetStateAction } from 'react';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import Popup from '@/components/common/ui/pop-ups/Popup';

interface skipTeacherPopupProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  onTeacherSkip: () => void;
}

export const SkipTeacherPopup: FC<skipTeacherPopupProps> = ({
  setOpen,
  onTeacherSkip,
}) => {
  return (
    <Popup
      contentLeft={true}
      open={true}
      content="Чи дійсно ти бажаєш пропустити опитування про викладача? У разі схвальної відповіді, ти більше не зможеш зробити відгук. Пам'ятай, що твоя оцінка є важливою для наступних поколінь."
      title={'Пропустити опитування'}
      firstButton={
        <Button
          text={'Лишити'}
          size={ButtonSize.SMALL}
          variant={ButtonVariant.OUTLINE}
          onClick={() => setOpen(false)}
        />
      }
      hasCross={true}
      secondButton={
        <Button
          text="Пропустити"
          size={ButtonSize.SMALL}
          onClick={onTeacherSkip}
        />
      }
      onClose={() => setOpen(false)}
    />
  );
};
