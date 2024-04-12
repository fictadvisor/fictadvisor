export interface TextsProperties {
  key: string;
  value: string;
  link: string | null;
  isShown: boolean;
}

export interface NewPageTexts {
  [key: string]: TextsProperties;
}
