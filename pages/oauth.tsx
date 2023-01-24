import { useRouter } from "next/router";
import { useEffect } from "react";
import PageLayout from "../components/v1/layout/PageLayout";
import Loader from "../components/v1/ui/Loader";
import { useAuthentication } from '../lib/v1/context/AuthenticationContext';
import oauth from "../lib/v1/oauth";

const OAuthPage = () => {
  const router = useRouter();
  const authentication = useAuthentication();

  useEffect(() => {
    if (router.isReady) {
      const { access_token, refresh_token, logout } = router.query;

      if (logout) { 
        oauth.logout(); 
        authentication.update();
      } else {
        oauth.saveToken(
          typeof(access_token) === 'object' ? access_token[0] : access_token, 
          typeof(refresh_token) === 'object' ? refresh_token[0] : refresh_token
        );
      }

      router.push('/');
    }
  }, [router.isReady]);

  return (
    <PageLayout
      meta={{ title: 'Авторизація' }}
      title=""
    >
      <div className="title"></div>
      <Loader />
    </PageLayout>
  );
};

export default OAuthPage;
