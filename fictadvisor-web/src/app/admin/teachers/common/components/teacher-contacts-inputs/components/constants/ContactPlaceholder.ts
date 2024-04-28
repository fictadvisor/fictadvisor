import { ContactType } from '@/types/contact';

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
