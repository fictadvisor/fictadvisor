export interface SearchDTO {
  search?: string
}

export interface Search<T> {
  OR: Array<{
    [k in keyof T]: {
      contains: string
      mode: 'default' | 'insensitive'
    }
  }>
}
