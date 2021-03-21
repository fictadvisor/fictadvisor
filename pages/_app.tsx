import 'normalize.css/normalize.css';
import '../styles/globals.css';
import '../styles/util.css';
import '../styles/input.css';
import '../styles/layout/header.css';
import '../styles/components/teacher.css';
import '../styles/components/subject.css';
import '../styles/components/review.css';
import '../styles/components/loader.css';
import '../styles/components/statistics.css';
import '../styles/components/contact.css';

export default function Application({ Component, pageProps }) {
  return <Component {...pageProps} />;
};
