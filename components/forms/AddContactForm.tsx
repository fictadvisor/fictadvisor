import { useState } from "react";
import { useMutation } from "react-query";
import api from "../../lib/v1/api";
import { CreateContactBody } from "../../lib/v1/api/teachers";
import { useAuthentication } from "../../lib/v1/context/AuthenticationContext";
import { validateGroup } from "../../lib/v1/validation";
import Button from "../ui/Button";
import Disclaimer from "../ui/Disclaimer";
import ErrorMessage from "../ui/ErrorMessage";
import Input from "../ui/Input";

export type AddContactFormProperties = {
  link: string;
  authentication: ReturnType<typeof useAuthentication>;
  onBack: () => any;
};

const AddContactForm = ({
  authentication,
  link,
  onBack,
}: AddContactFormProperties) => {
  const { error, isLoading, mutate, isSuccess } = useMutation(
    (data: CreateContactBody) =>
      api.teachers.createContact(authentication.getToken(), link, data)
  );
  const [validationErrors, setValidationErrors] = useState(null);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  const onSubmit = () => {
    const errors = validateGroup(
      ["contactName", name],
      ["contactValue", value]
    );

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    } else {
      setValidationErrors(null);
    }

    mutate({ name, value });
  };

  if (isSuccess) {
    return (
      <div>
        <Disclaimer>
          Дякуємо, твоя заявка була відправлена на перевірку
        </Disclaimer>
        <Button className="w-full m-t" onClick={() => onBack()}>
          Назад
        </Button>
      </div>
    );
  }

  return (
    <div className="form-block">
      <div className="block">
        <div className="m-b space">
          <Input
            className=""
            placeholder="Назва контакту"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            className="m-t"
            placeholder="Контакт"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="d-flex">
          <Button loading={isLoading} onClick={() => onBack()}>
            Назад
          </Button>
          <Button
            loading={isLoading}
            className="d-flex-grow w-full m-l"
            onClick={() => onSubmit()}
          >
            Відправити
          </Button>
        </div>
      </div>
      {validationErrors && validationErrors.length > 0
        ? validationErrors.map((e, i) => (
            <Disclaimer key={i} className="alert m-t">
              {e}
            </Disclaimer>
          ))
        : error &&
          !isLoading && (
            <ErrorMessage
              className="m-t"
              text={
                (error as any)?.response?.status === 409
                  ? "Контакт вже наявний у списку"
                  : null
              }
              error={error}
            />
          )}
    </div>
  );
};

export default AddContactForm;
