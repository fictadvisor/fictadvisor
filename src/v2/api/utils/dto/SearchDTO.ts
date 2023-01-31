export interface SearchDTO {
  search?: string,
}

export interface Search<T> {
  OR: {
    [k in keyof T]: {
      contains: string,
      mode: 'default' | 'insensitive',
    }
  }[]
}