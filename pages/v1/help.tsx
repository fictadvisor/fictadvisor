import PageLayout from "../../components/v1/layout/PageLayout";
import CollapsePanel from "../../components/v1/ui/CollapsePanel";
import config from "../../config";

const HelpPage = () => {
  return (
    <PageLayout
      title="Допомога"
    >
      <p>
        Відповіді на поширені запитання можна знайти нижче. 
        У разі, якщо тебе цікавить щось інше або виникли проблеми при роботі з сайтом, звертайся до нас через бота зворотного зв'язку: <a href={`https://t.me/${config.contacts.feedbackBot}`} target="_blank">@{config.contacts.feedbackBot}</a>.
      </p>
      <p className="title">Поширені запитання</p>
      <div className="faq">
        <CollapsePanel title="Як виправити або додати інформацію до сайту?">
          <p style={{ margin: '0' }}>
            Якщо ти бачиш помилку в інформації, що розміщена на сайті, або хочеш щось додати, напиши нам через бота зворотного зв'язку: <a href={`https://t.me/${config.contacts.feedbackBot}`} target="_blank">@{config.contacts.feedbackBot}</a>.
          </p>
        </CollapsePanel>
        <CollapsePanel title="Як залишити відгук?">
          <p style={{ margin: '0' }}>
            Щоб залишити відгук, необхідно перейти на сторінку викладача і предмета, про який хочеш написати. 
            Там ти побачиш кнопку “Додати відгук”, тицьни на неї. 
            <br/><br/>
            Опиши у відгуку свій досвід, розкажи про те, як цей курс викладається, відношення викладача до студентів, корисність інформації тощо.
            Намагайся утриматись від образ та ненормативної лексики. Ми залишаємо за собою право відхилити публікацію подібних відгуків.
            <br/><br/>
            Мінімальна довжина відгуку - 100 символів, а максимальна - 4096 символів.
          </p>
        </CollapsePanel>
        <CollapsePanel title="Що ви робите з моєю особистою інформацією?">
          <p style={{ margin: '0' }}>
            Твоя особиста інформація використовується лише в межах авторизації та ідентифікації нашої системи. Усі відгуки залишаються анонімно.
            <br/><br/>
            Наш проект знаходиться у <a href={config.source}>вільному</a> доступі, тому ти можеш перевірити власноруч те, як твої дані зберігаються та відображаються.
          </p>
        </CollapsePanel>
        <CollapsePanel title="Що робити, якщо викладач порушує мої права?">
          <p style={{ margin: '0' }}>
            Якщо твої права порушують, обов'язково звертайся до студради {config.faculty}. 
            <br/><br/>
            Бот зворотного зв'язку: <a href={`https://t.me/${config.contacts.feedbackBot}`} target="_blank">@{config.contacts.feedbackBot}</a>
            <br/> 
            Голова студради {config.faculty}: <a href={`https://t.me/${config.contacts.scHead}`} target="_blank">@{config.contacts.scHead}</a> 
          </p>
        </CollapsePanel>
        <CollapsePanel title="Як вступити до студради?">
          <p style={{ margin: '0' }}>
            Інформація про вступ до студради {config.faculty} та КПІ публікується на студентських каналах Telegram приблизно на початку навчального року. 
            <br/><br/>
            Якщо у тебе є певні ідеї та мотивація, то чекати набору не обов'язково. Просто зв'яжись зі студрадою {config.faculty} та розкажи про свій задум.
            <br/><br/>
            Бот зворотного зв'язку: <a href={`https://t.me/${config.contacts.feedbackBot}`} target="_blank">@{config.contacts.feedbackBot}</a>
          </p>
        </CollapsePanel>
      </div>
    </PageLayout>
  );
};

export default HelpPage;
