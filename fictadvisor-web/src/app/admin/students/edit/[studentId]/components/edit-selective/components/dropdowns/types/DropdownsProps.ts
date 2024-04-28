import {
  RemainingSelectivesResponse,
  SelectiveDisciplinesResponse,
} from '@fictadvisor/utils/responses';

export interface DropdownsProps {
  currentSelective?: SelectiveDisciplinesResponse;
  remainingSelective: RemainingSelectivesResponse;
  setDisconnectedSelectives: React.Dispatch<React.SetStateAction<string[]>>;
  setConnectedSelectives: React.Dispatch<React.SetStateAction<string[]>>;
  connectedSelectives: string[];
}
