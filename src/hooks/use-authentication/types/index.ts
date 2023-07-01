import { User } from '@/types/user';

export interface AuthenticationContext {
  user: User;
  update: () => Promise<void>;
}

export interface UseAuthenticationReturn extends AuthenticationContext {
  isLoggedIn: boolean;
}
