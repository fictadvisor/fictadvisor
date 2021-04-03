import { useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import Button from "../components/ui/Button";
import Disclaimer from "../components/ui/Disclaimer";
import Input from "../components/ui/Input";
import { validateGroup } from "../lib/validation";

const LoginPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState([]);

  const onSubmit = () => {
    const errors = validateGroup(
      ['firstName', firstName],
      ['lastName', lastName],
      ['username', username]
    );

    setErrors(errors);

    if (errors.length > 0) {
      return;
    }

    const payload = Buffer.from(JSON.stringify({ firstName, lastName, username })).toString('base64');
    window.location.href = `https://t.me/fictadvisor_bot?start=${payload}`;
  };

  return (
    <PageLayout
      meta={{ title: 'Реєстрація' }}
      title="Реєстрація"
    >
      <div className="block">
        <Disclaimer className="space-b">Авторизація працює через Telegram</Disclaimer>
        <Disclaimer className="space-b">Твоя інформація буде використовуватись лиже в межах цього сервісу</Disclaimer>
        <div style={{ display: 'flex', width: '100%' }}>
          <Input placeholder="Ім'я" value={firstName} onChange={e => setFirstName(e.target.value)} className="flex-grow" style={{ marginRight: '5px' }} />
          <Input placeholder="Прізвище (необов'язково)" value={lastName} onChange={e => setLastName(e.target.value)} className="flex-grow" style={{ marginLeft: '5px' }} />
        </div>
        <Input placeholder="Юзернейм" value={username} onChange={e => setUsername(e.target.value)} className="flex-grow space-b space-t"  />
        <Button disabled={!firstName || !username} className="full-width" onClick={() => onSubmit()}>Зареєструватись</Button>
        {
          errors.length > 0 &&
          errors.map((e, i) => 
            <Disclaimer className={`alert space-t`}>
              {e}
            </Disclaimer>
          )
        }
      </div>
    </PageLayout>
  );
};

export default LoginPage;