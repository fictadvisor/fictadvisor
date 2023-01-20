import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "react-query";
import api from "../../../lib/api";
import { CreateTeacherBody } from "../../../lib/api/teachers";
import { useAuthentication } from "../../../lib/context/AuthenticationContext";
import { validateGroup } from "../../../lib/validation";
import Button from "../ui/Button";
import Disclaimer from "../ui/Disclaimer";
import ErrorMessage from "../ui/ErrorMessage";
import Input from "../ui/Input";

export type AddTeacherFormProperties = {
  authentication: ReturnType<typeof useAuthentication>;
  onBack: () => any;
};

const AddTeacherForm = ({ authentication, onBack }: AddTeacherFormProperties) => {
  const { data, error, isLoading, mutate, isSuccess } = useMutation((data: CreateTeacherBody) => api.teachers.create(authentication.getToken(), data));
  const [validationErrors, setValidationErrors] = useState(null);
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');

  const onSubmit = () => {
    const errors = validateGroup(['lastName', lastName], ['firstName', firstName], ['middleName', middleName]);

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    } else {
      setValidationErrors(null);
    }

    mutate({ first_name: firstName, middle_name: middleName, last_name: lastName });
  };

  if (isSuccess) {
    return (
      <div>
        <Disclaimer>Дякуємо, твоя заявка була відправлена на перевірку</Disclaimer>
        <div className="m-t d-flex">
          <Button onClick={() => onBack()}>Назад</Button>
          <Link href={`/teachers/${data.link}`}>
            <a className="w-full m-l">
              <Button className="w-full">
                Перейти на сторінку викладача
              </Button>
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="form-block">
      <div className="block">
        <div className="m-b space">
          <Input 
            className=""
            placeholder="Прізвище"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input 
            className="m-t"
            placeholder="Ім'я"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input 
            className="m-t"
            placeholder="Ім'я по батькові"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />
        </div>
        <div className="d-flex">
          <Button loading={isLoading} onClick={() => onBack()}>Назад</Button>
          <Button loading={isLoading} className="d-flex-grow w-full m-l" onClick={() => onSubmit()}>Відправити</Button>
        </div>
      </div>
      {
          validationErrors && validationErrors.length > 0 
            ? validationErrors.map((e, i) => <Disclaimer key={i} className="alert m-t">{e}</Disclaimer>)
            :
              (error && !isLoading) &&
              <ErrorMessage className="m-t" text={(error as any)?.response?.status === 409 ? 'Викладач вже наявний у списку' : null} error={error} />
        }
    </div>
  )
};

export default AddTeacherForm;
