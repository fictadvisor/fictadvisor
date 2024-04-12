import { ContactType } from '@/app/discipline/contacts';
import { Contact } from '@/types/contact';

export const createContacts = (contacts: Contact[]) => {
  const allContacts = [
    {
      name: ContactType.MAIL,
      displayName: '',
      link: 'mailto:',
    },
    {
      name: ContactType.TELEGRAM,
      displayName: '',
      link: 'https://t.me/',
    },
    {
      name: ContactType.YOUTUBE,
      displayName: '',
      link: 'https://www.youtube.com/',
    },
    {
      name: ContactType.TWITTER,
      displayName: '',
      link: 'https://twitter.com/',
    },
    {
      name: ContactType.GITHUB,
      displayName: '',
      link: 'https://github.com/',
    },
    {
      name: ContactType.INSTAGRAM,
      displayName: '',
      link: 'https://www.instagram.com/',
    },
    {
      name: ContactType.FACEBOOK,
      displayName: '',
      link: 'https://www.facebook.com/',
    },
    {
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
        link: matchedContact.link,
        name: matchedContact.name,
        displayName: matchedContact.displayName,
      };
    } else return contact;
  });
};
