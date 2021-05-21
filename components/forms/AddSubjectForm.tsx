import Link from "next/link";
import { useState } from "react";
import { useMutation } from "react-query";
import api from "../../lib/api";
import { CreateSubjectBody } from "../../lib/api/subjects";
import { useAuthentication } from "../../lib/context/AuthenticationContext";
import { validateGroup } from "../../lib/validation";
import Button from "../ui/Button";
import Disclaimer from "../ui/Disclaimer";
import ErrorMessage from "../ui/ErrorMessage";
import Input from "../ui/Input";

export type AddCourseFormProperties = {
  authentication: ReturnType<typeof useAuthentication>;
  onBack: () => any;
};

const AddSubjectForm = ({ authentication, onBack }: AddCourseFormProperties) => {
  const { data, error, isLoading, mutate, isSuccess } = useMutation((data: CreateSubjectBody) => api.subjects.create(authentication.getToken(), data));
  const [validationErrors, setValidationErrors] = useState(null);
  const [subjectName, setSubjectName] = useState('');

  const onSubmit = () => {
    const errors = validateGroup(['subjectName', subjectName]);

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    } else {
      setValidationErrors(null);
    }

    mutate({ name: subjectName });
  };

  if (isSuccess) {
    return (
      <div>
        <Disclaimer>Дякуємо, твоя заявка була відправлена на перевірку</Disclaimer>
        <div className="d-flex m-t">
          <Button onClick={() => onBack()}>Назад</Button>
          <Link href={`/subjects/${data.link}`}>
              <a className="w-full m-l">
                <Button className="w-full">Перейти на сторінку предмета</Button>
              </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="form-block">
      <div className="block">
        <div className="m-b">
          <Input
            placeholder="Назва предмету"
            className="m-b"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
          />
        </div>
        <div className="d-flex">
          <Button loading={isLoading} onClick={() => onBack()}>Назад</Button>
          <Button loading={isLoading} className="d-flex-grow" style={{ marginLeft: '10px' }} onClick={() => onSubmit()}>Відправити</Button>
        </div>
      </div>
      {
          validationErrors && validationErrors.length > 0 
            ? validationErrors.map((e, i) => <Disclaimer key={i} className="alert m-t">{e}</Disclaimer>)
            :
              (error && !isLoading) &&
              <ErrorMessage className="m-t" text={(error as any)?.response?.status === 409 ? 'Предмет вже наявний у списку' : null} error={error} />
        }
    </div>
  )
};

export default AddSubjectForm;
