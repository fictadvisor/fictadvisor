import { useEffect, useState } from 'react';
import { ArrowUpIcon, PlusIcon } from '@heroicons/react/24/solid';
import { Box } from '@mui/material';

import ButtonIcon from '@/components/common/ui/icon-button-mui/IconButton';
import useAuthentication from '@/hooks/use-authentication';
import { useSchedule } from '@/store/schedule/useSchedule';
import { UserGroupRole } from '@/types/user';

import * as styles from './buttonIcons.styles';

export const ButtonIcons = () => {
  const [displayScrollBtn, setDisplayScrollBtn] = useState(true);
  const { user } = useAuthentication();
  const { groupId } = useSchedule(state => ({ groupId: state.groupId }));

  useEffect(() => {
    const scrollEventListener = () => {
      if (
        document.documentElement.scrollTop >
        document.documentElement.clientHeight - 300
      )
        setDisplayScrollBtn(true);
      else setDisplayScrollBtn(false);
    };

    window.addEventListener('scroll', scrollEventListener);

    return () => window.removeEventListener('scroll', scrollEventListener);
  }, []);

  return (
    <Box sx={styles.buttonIcons}>
      {user &&
        user.group?.role !== UserGroupRole.STUDENT &&
        user.group?.id === groupId && (
          <ButtonIcon
            icon={<PlusIcon />}
            onClick={() =>
              useSchedule.setState(state => ({
                isNewEventAdded: true,
                openedEvent: undefined,
              }))
            }
          />
        )}

      {displayScrollBtn && (
        <ButtonIcon
          icon={<ArrowUpIcon />}
          onClick={() => {
            window.scroll({
              top: 0,
              left: 0,
              behavior: 'smooth',
            });
          }}
        />
      )}
    </Box>
  );
};
