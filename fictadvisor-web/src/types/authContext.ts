import { User } from '@/types/user';

export type AuthenticationContextType = {
  user: User | null;
  isLoading: boolean;
};
