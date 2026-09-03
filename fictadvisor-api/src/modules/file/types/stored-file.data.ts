export interface StoredFile {
  /** Path of the object relative to the prefix it was listed under. */
  name: string;
  size: number;
  updatedAt: Date;
}
