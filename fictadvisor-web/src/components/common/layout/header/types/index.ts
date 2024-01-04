export interface TransformedUser {
  name: string;
  groupName: string | null;
  position: string | null;
  avatar?: string;
}

export type HeaderCardProps = TransformedUser;
