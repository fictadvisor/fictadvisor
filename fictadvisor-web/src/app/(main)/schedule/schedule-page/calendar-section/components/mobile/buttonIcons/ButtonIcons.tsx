import { useEffect, useState } from 'react';
import { GroupRoles } from '@fictadvisor/utils/enums';
import { ArrowUpIcon, PlusIcon } from '@heroicons/react/24/solid';
import { Box } from '@mui/material';

import ButtonIcon from '@/components/common/ui/icon-button-mui/IconButton';
import { useAuthentication } from '@/hooks/use-authentication/useAuthentication';
import { useSchedule } from '@/store/schedule/useSchedule';

import * as styles from './buttonIcons.styles';

export const ButtonIcons = () => {
  const [displayScrollBtn, setDisplayScrollBtn] = useState(false);
  const { user } = useAuthentication();
  const { groupId } = useSchedule(state => ({ groupId: state.groupId }));

  const validPrivilege =
    user &&
    (user.group?.role === GroupRoles.CAPTAIN ||
      user.group?.role === GroupRoles.MODERATOR);

  const showButton = validPrivilege && user.group?.id === groupId;

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
      {showButton && (
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
