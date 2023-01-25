const saveToken = (accessToken: string, refreshToken: string) => {
  if (!process.browser) {
    return;
  }

  localStorage.setItem('oauth.access_token', accessToken);
  localStorage.setItem('oauth.refresh_token', refreshToken);
};

const getToken = () => {
  if (!process.browser) {
    return null;
  }

  const accessToken = localStorage.getItem('oauth.access_token');
  const refreshToken = localStorage.getItem('oauth.refresh_token');

  return accessToken && refreshToken ? { accessToken, refreshToken } : null;
};

const logout = () => {
  if (!process.browser) {
    return;
  }
  
  localStorage.removeItem('oauth.access_token');
  localStorage.removeItem('oauth.refresh_token');
};

const oauth = {
  saveToken,
  getToken,
  logout,
};

export default oauth;