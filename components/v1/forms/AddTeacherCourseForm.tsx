import Link from "next/link";
import { useState } from "react";
import { useMutation } from "react-query";
import api from "../../../lib/api";
import { CreateCourseBody } from "../../../lib/api/courses";
import { useAuthentication } from "../../../lib/context/AuthenticationContext";
import SubjectSelect from "../SubjectSelect";
import Button from "../ui/Button";
import Disclaimer from "../ui/Disclaimer";
import ErrorMessage from "../ui/ErrorMessage";
import SubjectItem from "../SubjectItem";

export type AddTeacherCourseFormProperties = {
  authentication: ReturnType<typeof useAuthentication>;
  teacher: string;
  onBack: () => any;
};

const AddTeacherCourseForm = ({ authentication, teacher, onBack }: AddTeacherCourseFormProperties) => {
  const { data, error, isLoading, mutate, isSuccess } = useMutation((data: CreateCourseBody) => api.courses.create(authentication.getToken(), data));
  const [validationErrors, setValidationErrors] = useState(null);
  const [selectedSubject, setSeletectedSubject] = useState(null);

  const onSubmit = () => {
    if (selectedSubject == null) {
      setValidationErrors(['Необхідно обрати предмет, що веде цей викладач']);
      return;
    }

    mutate({ subject_id: selectedSubject.id, teacher_id: teacher });
  };

  if (isSuccess) {
    return (
      <div>
        <Disclaimer>Дякуємо, твоя заявка була відправлена на перевірку</Disclaimer>
        <div className="d-flex m-t">
          <Button onClick={() => onBack()}>Назад</Button>
          <Link href={`/courses/${data.link}`} className="w-full m-l" legacyBehavior>

            <Button className="w-full">Перейти на сторінку предмета</Button>

          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="form-block">
      <div className="block">
        <div className="m-b">
          <SubjectSelect onSelect={({ data }) => setSeletectedSubject(data)} />
          {
            selectedSubject &&
            <SubjectItem 
              className="m-t"
              key={selectedSubject.id}
              name={selectedSubject.name}
              link={selectedSubject.link}
              teacherCount={0}
            />
          }
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

export default AddTeacherCourseForm;
