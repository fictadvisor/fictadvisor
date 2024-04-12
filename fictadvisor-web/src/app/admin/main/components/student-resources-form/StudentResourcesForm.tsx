import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Box } from '@mui/material';

import * as styles from '@/app/admin/main/components/student-resources-form/StudentResourcesForm.styles';
import Input from '@/components/common/ui/form/input-mui';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import StudentResourcesAPI from '@/lib/api/student-resources/StudentResourcesAPI';
import {
  GetStudentResourcesResponse,
  StudentResource,
} from '@/lib/api/student-resources/types/GetStudentResourcesResponse';

const StudentResourcesForm = forwardRef((props, ref) => {
  const formRef = useRef(null);
  const { displayError } = useToastError();
  const [studentResources, setStudentResources] = useState<StudentResource[]>(
    [],
  );
  const [changedStudentResources, setChangedStudentResources] = useState<{
    [key: string]: StudentResource;
  }>({});
  const getStudentResources = async () => {
    try {
      const data: GetStudentResourcesResponse =
        await StudentResourcesAPI.getAll();
      const studentResources: StudentResource[] = Object.values(data);
      setStudentResources(studentResources);
    } catch (error) {
      displayError(error);
    }
  };
  useEffect(() => {
    if (studentResources?.length) {
      const newStudentResources = studentResources.reduce(
        (acc: { [key: string]: StudentResource }, item: StudentResource) => {
          acc[item.id] = item;
          return acc;
        },
        {},
      );
      setChangedStudentResources(newStudentResources);
    }
  }, [studentResources]);
  useEffect(() => {
    getStudentResources();
  }, []);

  const handleInputChange = (id: string, field: string, value: string) => {
    setChangedStudentResources(prevState => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [field]: value,
      },
    }));
  };

  const studentResourceSubmit = async () => {
    try {
      const transformedStudentResources = Object.values(
        changedStudentResources,
      );
      await StudentResourcesAPI.editStudentResources(
        transformedStudentResources,
      );
      return transformedStudentResources;
    } catch (error) {
      throw error;
    }
  };
  useImperativeHandle(ref, () => ({
    studentResourceSubmit: studentResourceSubmit,
  }));

  return (
    <form ref={formRef}>
      <Box sx={styles.resourcesWrapper}>
        {studentResources?.map((el: StudentResource) => {
          return (
            <Box key={el.id} sx={styles.miniInputsWrapper}>
              <Input
                sx={styles.miniInput}
                label="Посилання на фото"
                name="resource_image_link"
                placeholder="https://"
                value={changedStudentResources[el.id]?.imageLink || ''}
                onChange={value => handleInputChange(el.id, 'imageLink', value)}
              />
              <Input
                sx={styles.miniInput}
                label="Назва ресурсу"
                name="resource_name"
                placeholder="https://"
                value={changedStudentResources[el.id]?.name || ''}
                onChange={value => handleInputChange(el.id, 'name', value)}
              />
              <Input
                sx={styles.miniInput}
                label="Посилання на ресурс"
                name="resource_link"
                placeholder="https://"
                value={changedStudentResources[el.id]?.link || ''}
                onChange={value => handleInputChange(el.id, 'link', value)}
              />
            </Box>
          );
        })}
      </Box>
    </form>
  );
});

export default StudentResourcesForm;
