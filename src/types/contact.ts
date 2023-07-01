export enum ContactType {
  YOUTUBE = 'YOUTUBE',
  DISCORD = 'DISCORD',
  TELEGRAM = 'TELEGRAM',
  INSTAGRAM = 'INSTAGRAM',
  FACEBOOK = 'FACEBOOK',
  GITHUB = 'GITHUB',
  TWITTER = 'TWITTER',
  MAIL = 'MAIL',
}

export interface Contact {
  link: string;
  id: string;
  name: ContactType;
  displayName: string;
}
