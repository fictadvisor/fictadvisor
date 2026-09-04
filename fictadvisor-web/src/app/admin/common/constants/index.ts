export const useQueryAdminOptions = {
  staleTime: 1500,
  gcTime: 1500,
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
};

// Admin tables have to survive opening a record and coming back: the cached rows
// are rendered again at once, so the restored page and scroll offset land on a
// table of the right height, and a refetch behind them picks up whatever was
// just edited.
export const adminListQueryOptions = {
  staleTime: 0,
  gcTime: 5 * 60 * 1000,
  refetchOnMount: true,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
};
