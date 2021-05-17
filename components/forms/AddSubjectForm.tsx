import { useState } from "react";
import { useMutation } from "react-query";
import api from "../../lib/api";
import { CreateCourseBody } from "../../lib/api/courses";
import { useAuthentication } from "../../lib/context/AuthenticationContext";
import { validateGroup } from "../../lib/validation";
import TeacherItem from "../TeacherItem";
import TeacherSearch from "../TeacherSelect";
import Button from "../ui/Button";
import Disclaimer from "../ui/Disclaimer";
import ErrorMessage from "../ui/ErrorMessage";
import Input from "../ui/Input";

export type AddCourseFormProperties = {
  authentication: ReturnType<typeof useAuthentication>;
  onBack: () => any;
};

const AddSubjectForm = ({ authentication, onBack }: AddCourseFormProperties) => {
  const { error, isLoading, mutate, isSuccess } = useMutation((data: CreateCourseBody) => api.courses.create(authentication.getToken(), data));
  const [validationErrors, setValidationErrors] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [subjectName, setSubjectName] = useState('');

  const onSubmit = () => {
    const errors = validateGroup(['subjectName', subjectName]);

    if (selectedTeacher == null) {
      errors.push('Необхідно обрати викладача, що веде цей предмет');
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    } else {
      setValidationErrors(null);
    }

    mutate(null);
  };

  if (isSuccess) {
    return (
      <div>
        <Disclaimer>Дякуємо, твоя заявка була відправлена на перевірку</Disclaimer>
         {
            onBack &&
            <Button className="w-full m-t" onClick={() => onBack()}>Назад</Button>
          }
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
          <TeacherSearch onSelect={({ data }) => setSelectedTeacher(data)} />
          {
            selectedTeacher &&
            <TeacherItem 
              className="m-t"
              key={selectedTeacher.id}
              link={selectedTeacher.link} 
              firstName={selectedTeacher.first_name} 
              lastName={selectedTeacher.last_name} 
              middleName={selectedTeacher.middle_name}
              rating={selectedTeacher.rating} 
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
              <ErrorMessage className="m-t" error={error} />
        }
    </div>
  )
};

export default AddSubjectForm;
