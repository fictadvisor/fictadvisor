export enum Actions {
  PRIORITY = 'пріоритет',
  CONTRACT = 'договір',
  ENTRANT = 'вступник',
  ENTRANT_DATA = 'дані',
}

export interface DeleteEntrantDataBody {
  action: Actions;
  entrantId: string;
}
