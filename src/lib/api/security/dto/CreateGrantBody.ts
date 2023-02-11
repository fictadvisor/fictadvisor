export type CreateGrantBody = {
  grants: [
    {
      permission: string;
      set?: boolean;
    },
  ];
};
