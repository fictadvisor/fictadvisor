import { useRouter } from "next/router";
import { useEffect } from "react";
import PageLayout from "../components/layout/PageLayout";
import Loader from "../components/ui/Loader";
import { useAuthentication } from '../lib/context/AuthenticationContext';
import oauth from "../lib/oauth";

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
