export interface CreateGrantBody {
  grants: [
    {
      permission: string;
      set?: boolean;
    },
  ];
}
