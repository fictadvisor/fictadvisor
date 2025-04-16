import { CreateContactDTO } from '@fictadvisor/utils/requests';

import { ContactType } from '@/types/contact';

export const createContacts = (contacts: CreateContactDTO[]) => {
  const allContacts = [
    {
      id: '',
      name: ContactType.MAIL,
      displayName: '',
      link: 'mailto:',
    },
    {
      id: '',
      name: ContactType.TELEGRAM,
      displayName: '',
      link: 'https://t.me/',
    },
    {
      id: '',
      name: ContactType.YOUTUBE,
      displayName: '',
      link: 'https://www.youtube.com/',
    },
    {
      id: '',
      name: ContactType.TWITTER,
      displayName: '',
      link: 'https://twitter.com/',
    },
    {
      id: '',
      name: ContactType.GITHUB,
      displayName: '',
      link: 'https://github.com/',
    },
    {
      id: '',
      name: ContactType.INSTAGRAM,
      displayName: '',
      link: 'https://www.instagram.com/',
    },
    {
      id: '',
      name: ContactType.FACEBOOK,
      displayName: '',
      link: 'https://www.facebook.com/',
    },
    {
      id: '',
      name: ContactType.DISCORD,
      displayName: '',
      link: 'https://discord.gg/',
    },
  ];
  return allContacts.map(contact => {
    const matchedContact = contacts.find(c => c.name === contact.name);
    if (matchedContact) {
      return {
        ...contact,
        ...matchedContact,
      };
    } else return contact;
  });
};
