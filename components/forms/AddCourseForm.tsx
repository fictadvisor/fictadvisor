import { useState } from "react";
import { useMutation } from "react-query";
import api from "../../lib/api";
import { CreateCourseBody } from "../../lib/api/courses";
import { useAuthentication } from "../../lib/context/AuthenticationContext";
import TeacherItem from "../TeacherItem";
import TeacherSearch from "../TeacherSelect";
import Button from "../ui/Button";
import Disclaimer from "../ui/Disclaimer";
import ErrorMessage from "../ui/ErrorMessage";

export type AddCourseFormProperties = {
  authentication: ReturnType<typeof useAuthentication>;
  subject: string;
  onBack?: () => any;
};

const AddCourseForm = ({ authentication, subject, onBack }: AddCourseFormProperties) => {
  const { error, isLoading, mutate, isSuccess } = useMutation((data: CreateCourseBody) => api.courses.create(authentication.getToken(), data));
  const [validationErrors, setValidationErrors] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const onSubmit = () => {
    if (selectedTeacher == null) {
      setValidationErrors(['Спочатку необхідно обрати викладача, що веде цей предмет']);
      return;
    }

    mutate({ teacher_id: selectedTeacher.id, subject_id: subject });
  };

  if (isSuccess) {
    return (
      <div>
        <Disclaimer>Дякуємо, твоя заявка була відправлена на перевірку</Disclaimer>
         {
            onBack &&
            <Button className="full-width space-t" onClick={() => onBack()}>Назад</Button>
          }
      </div>
    );
  }

  return (
    <div className="form-block">
      <div className="space-b">
        <TeacherSearch onSelect={({ data }) => setSelectedTeacher(data)} />
        {
          selectedTeacher &&
          <TeacherItem 
            className="space-t"
            key={selectedTeacher.id}
            link={selectedTeacher.link} 
            firstName={selectedTeacher.first_name} 
            lastName={selectedTeacher.last_name} 
            middleName={selectedTeacher.middle_name}
            rating={selectedTeacher.rating} 
          />
        }
      </div>
      <div style={{ display: 'flex' }}>
        {
          onBack &&
          <Button loading={isLoading} onClick={() => onBack()}>Назад</Button>
        }
        <Button loading={isLoading} className="flex-grow" style={{ marginLeft: '10px' }} onClick={() => onSubmit()}>Відправити</Button>
      </div>
      {
          validationErrors && validationErrors.length > 0 
            ? validationErrors.map((e, i) => <Disclaimer key={i} className="alert space-t">{e}</Disclaimer>)
            :
              (error && !isLoading) &&
              <ErrorMessage className="space-t" error={error} />
        }
    </div>
  )
};

export default AddCourseForm;
