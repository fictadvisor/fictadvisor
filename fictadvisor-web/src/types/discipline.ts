export interface Discipline {
  id: string;
  year: number;
  isSelective: boolean;
  semester: number;
  subject: {
    id: string;
    name: string;
  };
}
