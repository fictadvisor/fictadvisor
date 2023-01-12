import { useState } from "react";
import { useMutation } from "react-query";
import api from "../../lib/v1/api";
import { CreateSuperheroBody } from "../../lib/v1/api/superheroes";
import { useAuthentication } from "../../lib/v1/context/AuthenticationContext";
import { validateGroup } from "../../lib/v1/validation";
import Button from "../ui/Button";
import Disclaimer from "../ui/Disclaimer";
import Dropdown from "../ui/Dropdown";
import ErrorMessage from "../ui/ErrorMessage";
import Input from "../ui/Input";

export type SuperheroFormProperties = {
  authentication: ReturnType<typeof useAuthentication>;
  onBack?: () => any;
};

const PROPERTIES = {
  years: [
    { text: "1 курсі" },
    { text: "2 курсі" },
    { text: "3 курсі" },
    { text: "4 курсі" },
    { text: "Магістратурі" },
  ],
  dorm: [
    { text: "Я не живу в гуртожитку", data: false },
    { text: "Я живу в гуртожитку", data: true },
  ],
};

const SuperheroForm = ({ authentication, onBack }: SuperheroFormProperties) => {
  const { error, isLoading, mutate, isSuccess } = useMutation(
    (data: CreateSuperheroBody) =>
      api.superheroes.createSuperhero(authentication.getToken(), data)
  );
  const [validationErrors, setValidationErrors] = useState(null);
  const [year, setYear] = useState(0);
  const [dorm, setDorm] = useState(0);
  const [name, setName] = useState(
    authentication.user.last_name
      ? `${authentication.user.first_name} ${authentication.user.last_name}`
      : authentication.user.first_name
  );
  const [username, setUsername] = useState(
    authentication.user.username ? `@${authentication.user.username}` : ""
  );

  const onSubmit = () => {
    const errors = validateGroup(["name", name], ["username", username]);

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    } else {
      setValidationErrors(null);
    }

    mutate({
      name,
      username,
      year: year + 1,
      dorm: PROPERTIES.dorm[dorm].data,
    });
  };

  if (isSuccess) {
    return (
      <div>
        <Disclaimer>
          Дякуємо, твоя заявка була відправлена на перевірку
        </Disclaimer>
        {onBack && (
          <Button className="w-full m-t" onClick={() => onBack()}>
            Назад
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="form-block">
      <Disclaimer>
        <span className="f-medium">Важливо:</span> твоя інформація буде у
        вільному доступі на сторінці супергероїв
      </Disclaimer>
      <div className="m-b m-t">
        <div className="d-flex adaptive-input-container">
          <Dropdown
            className="d-flex-grow"
            text="Я навчаюсь на "
            options={PROPERTIES.years}
            onChange={(i) => setYear(i)}
            active={year}
          />
          <Dropdown
            className="d-flex-grow"
            options={PROPERTIES.dorm}
            onChange={(i) => setDorm(i)}
            active={dorm}
          />
        </div>
        <Input
          className="m-t"
          placeholder="Юзернейм у Telegram"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          className="m-t"
          placeholder="Ім'я"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="d-flex">
        {onBack && (
          <Button loading={isLoading} onClick={() => onBack()}>
            Назад
          </Button>
        )}
        <Button
          loading={isLoading}
          className="d-flex-grow"
          style={{ marginLeft: "10px" }}
          onClick={() => onSubmit()}
        >
          Відправити
        </Button>
      </div>
      {validationErrors && validationErrors.length > 0
        ? validationErrors.map((e, i) => (
            <Disclaimer key={i} className="alert m-t">
              {e}
            </Disclaimer>
          ))
        : error && !isLoading && <ErrorMessage className="m-t" error={error} />}
    </div>
  );
};

export default SuperheroForm;
