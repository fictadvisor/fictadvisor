import React, { FC, useState } from 'react';
import { PencilIcon } from '@heroicons/react/24/outline';
import { Avatar, Box, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';

import ChangeAvatarWindow from '@/app/(main)/account/components/general-tab/components/change-avatar-window';
import ContactsBlock from '@/app/(main)/account/components/general-tab/components/contacts-block/ContactsBlock';
import PersonalInfoBlock from '@/app/(main)/account/components/general-tab/components/personal-info';
import * as stylesMui from '@/app/(main)/account/components/general-tab/GeneralTab.styles';
import { TelegramForAccount } from '@/components/common/icons/TelegramForAccount';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import Divider from '@/components/common/ui/divider';
import { DividerTextAlign } from '@/components/common/ui/divider/types';
import useAuthentication from '@/hooks/use-authentication';
import useToast from '@/hooks/use-toast';
import AuthService from '@/lib/services/auth';
import theme from '@/styles/theme';

const GeneralTab: FC = () => {
  const { user } = useAuthentication();
  const router = useRouter();
  const toast = useToast();
  const isMobile = useMediaQuery(theme.breakpoints.down('desktopSemiMedium'));
  const buttonText = user.telegramId
    ? 'Telegram під’єднано'
    : "Під'єднати Telegram";
  const [popupOpen, setPopupOpen] = useState(false);

  const handleConnectTelegram = () => {
    void AuthService.redirectToRegisterBot(router);
  };

  return (
    <Box sx={stylesMui.container}>
      <Box sx={stylesMui.personalInfo}>
        <PersonalInfoBlock />
        <Divider
          sx={stylesMui.divider}
          textAlign={DividerTextAlign.LEFT}
          text="Посилання на соц. мережі"
        />
        <ContactsBlock />
      </Box>
      <Box sx={stylesMui.avatarAndTelegramInfo}>
        <Box
          onClick={() =>
            toast.warning('Зміна фото профілю тимчасово недоступно')
          }
          sx={stylesMui.avatar}
        >
          <Avatar src={user.avatar} alt="Фото профілю" sx={stylesMui.avatar} />
          <Box>
            <PencilIcon />
          </Box>
        </Box>
        <Button
          sx={stylesMui.telegramButton}
          text={buttonText}
          disabled={!!user.telegramId}
          size={isMobile ? ButtonSize.SMALL : ButtonSize.MEDIUM}
          startIcon={<TelegramForAccount />}
          variant={ButtonVariant.OUTLINE}
          onClick={handleConnectTelegram}
        />
      </Box>
      {popupOpen && (
        <ChangeAvatarWindow setPopupOpen={setPopupOpen} userId={user.id} />
      )}
    </Box>
  );
};

export default GeneralTab;
