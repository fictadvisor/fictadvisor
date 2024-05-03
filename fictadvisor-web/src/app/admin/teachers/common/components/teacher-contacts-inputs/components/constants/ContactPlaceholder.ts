import { ContactType } from '@/app/(main)/discipline/contacts';

export const ContactPlaceholder: Record<ContactType, string> = {
  [ContactType.MAIL]: 'Пошта',
  [ContactType.DISCORD]: 'Discord',
  [ContactType.GITHUB]: 'GitHub',
  [ContactType.INSTAGRAM]: 'Instagram',
  [ContactType.TELEGRAM]: 'Telegram',
  [ContactType.TWITTER]: 'Twitter',
  [ContactType.YOUTUBE]: 'YouTube',
  [ContactType.FACEBOOK]: 'Facebook',
};
