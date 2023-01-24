import Link from "next/link";
import { useState } from "react";
import { useMutation } from "react-query";
import api from "../../../lib/api";
import { CreateCourseBody } from "../../../lib/api/courses";
import { useAuthentication } from "../../../lib/context/AuthenticationContext";
import TeacherItem from "../TeacherItem";
import TeacherSelect from "../TeacherSelect";
import Button from "../ui/Button";
import Disclaimer from "../ui/Disclaimer";
import ErrorMessage from "../ui/ErrorMessage";

export type AddCourseFormProperties = {
  authentication: ReturnType<typeof useAuthentication>;
  subject: string;
  onBack: () => any;
};

const AddCourseForm = ({ authentication, subject, onBack }: AddCourseFormProperties) => {
  const { data, error, isLoading, mutate, isSuccess } = useMutation((data: CreateCourseBody) => api.courses.create(authentication.getToken(), data));
  const [validationErrors, setValidationErrors] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const onSubmit = () => {
    if (selectedTeacher == null) {
      setValidationErrors(['Необхідно обрати викладача, що веде цей предмет']);
      return;
    }

    mutate({ teacher_id: selectedTeacher.id, subject_id: subject });
  };

  if (isSuccess) {
    return (
      <div>
        <Disclaimer>Дякуємо, твоя заявка була відправлена на перевірку</Disclaimer>
        <div className="d-flex m-t">
          <Button onClick={() => onBack()}>Назад</Button>
          <Link href={`/courses/${data.link}`} className="w-full m-l" legacyBehavior>

            <Button className="w-full">Перейти на сторінку викладача</Button>

          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="form-block">
      <div className="block">
        <div className="m-b">
          <TeacherSelect onSelect={({ data }) => setSelectedTeacher(data)} />
          {
            selectedTeacher &&
            <TeacherItem 
              className="m-t"
              key={selectedTeacher.id}
              link={selectedTeacher.link} 
              firstName={selectedTeacher.first_name} 
              lastName={selectedTeacher.last_name} 
              middleName={selectedTeacher.middle_name}
              rating={0} 
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
              <ErrorMessage className="m-t" text={(error as any)?.response?.status === 409 ? 'Викладач вже наявний у списку' : null} error={error} />
        }
    </div>
  )
};

export default AddCourseForm;
