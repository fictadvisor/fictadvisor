import StorageUtil from '@/lib/utils/StorageUtil';

export const getAuthorizationHeader = () => {
  return {
    headers: { Authorization: `Bearer ${StorageUtil.getAccessToken()}` },
  };
};
