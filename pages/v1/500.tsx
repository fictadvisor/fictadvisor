import PageLayout from "../../components/v1/layout/PageLayout";
import Link from "next/link";

const InternalErrorPage = () => {
  return (
    <PageLayout meta={{ title: 'Щось пішло не так' }}>
      <div className="page-error">
        <div className="page-error-description">
          <p className="page-error-title">Щось пішло не так...</p>
          <p>
            Під час обробки твого запиту виникла помилка.
            <br />
            Пропонуємо повернутись на <Link href="/">головну сторінку</Link>.
          </p>
        </div>
        <div style={{ margin: '30px auto 0 auto', opacity: '0.5', textAlign: 'center' }}>
          <img width="400px" src="/assets/500.gif" />
        </div>
      </div>
    </PageLayout>
  );
};

export default InternalErrorPage;
