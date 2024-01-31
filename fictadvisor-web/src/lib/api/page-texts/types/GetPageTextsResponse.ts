export interface PageText {
  key: string;
  value: string;
  link: string;
  isShown: boolean;
}

export interface GetPageTextsResponse {
  pageTexts: PageText[];
}
