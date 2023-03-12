export interface Contact {
  id: string;
  link: string;
  name: string;
  displayName: string;
}

export enum ContactType {
  YOUTUBE = 'Youtube',
  DISCORD = 'Discord',
  TELEGRAM = 'Telegram',
  INSTAGRAM = 'Instagram',
  FACEBOOK = 'Facebook',
  GITHUB = 'Github',
  TWITTER = 'Twitter',
  MAIL = 'Пошта',
}
