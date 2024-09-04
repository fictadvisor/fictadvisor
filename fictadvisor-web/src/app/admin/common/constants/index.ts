export const useQueryAdminOptions = {
  staleTime: 1500,
  gcTime: 1500,
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  placeholderData: (previousData, previousQuery) => previousData,
};
