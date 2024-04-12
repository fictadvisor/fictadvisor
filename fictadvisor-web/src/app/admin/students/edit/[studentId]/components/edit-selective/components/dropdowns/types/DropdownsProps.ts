import { UserRemainingSelective } from '@/types/user';

export interface DropdownsProps {
  currentSelective:
    | {
        semester: 1 | 2;
        year: number;
        selective: Array<{ id: string; name: string }>;
      }
    | undefined;
  remainingSelective: {
    availableSelectiveAmount: number;
    year: number;
    semester: 1 | 2;
    remainingSelective: UserRemainingSelective[];
  };
  setDisconnectedSelective: React.Dispatch<React.SetStateAction<string[]>>;
  setConnectedSelective: React.Dispatch<React.SetStateAction<string[]>>;
  connectedSelective: string[];
}
