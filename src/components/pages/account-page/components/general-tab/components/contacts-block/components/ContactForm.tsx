import React, { FC, useCallback } from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import { CustomCheck } from '@/components/common/icons/CustomCheck';
import Button from '@/components/common/ui/button';
import {
  ButtonColor,
  ButtonSize,
} from '@/components/common/ui/button-mui/types';
import { Input, InputSize } from '@/components/common/ui/form';
import FormikDropdown from '@/components/common/ui/form/with-formik/dropdown';
import styles from '@/components/pages/account-page/components/general-tab/GeneralTab.module.scss';
import useAuthentication from '@/hooks/use-authentication';
import useToast from '@/hooks/use-toast';
import { AddContactBody } from '@/lib/api/user/types/AddContactBody';
import UserAPI from '@/lib/api/user/UserAPI';
import { ContactType } from '@/types/contact';

interface ContactFormProps {
  refetchContacts: () => Promise<void>;
}

const ContactForm: FC<ContactFormProps> = ({ refetchContacts }) => {
  const { user } = useAuthentication();
  const toast = useToast();
  const options = Object.values(ContactType).map(contact => ({
    label: contact,
    id: contact,
  }));

  const handleSubmit = useCallback(
    async (data: AddContactBody) => {
      try {
        await UserAPI.addContact(user.id, data);
        void refetchContacts();
      } catch (e) {
        toast.error('Здається ти ввів неправильні значення!');
      }
    },
    [refetchContacts, toast, user.id],
  );

  return (
    <div className={styles['add-social-links-container']}>
      <Formik
        enableReinitialize
        // TODO: move to constants folder
        validationSchema={yup.object().shape({
          displayName: yup.string().required(`Обов'язкове поле`),
          link: yup.string().required(`Обов'язкове поле`),
          name: yup.string().required(`Обов'язкове поле`),
        })}
        // TODO: move to constants folder
        initialValues={{
          name: ContactType.TELEGRAM,
          link: '',
          displayName: '',
        }}
        validateOnChange
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <FormikDropdown
              options={options}
              name="name"
              label="Соціальна мережа"
              placeholder="Введіть назву соц. мережі"
            />
            <Input
              label="Посилання"
              size={InputSize.LARGE}
              name="link"
              placeholder="Введіть посилання"
            />
            <Input
              label="Відображуване ім'я"
              size={InputSize.LARGE}
              name="displayName"
              placeholder="Введіть відображуване ім'я"
            />
            <Button
              text="Додати"
              color={ButtonColor.SECONDARY}
              startIcon={<CustomCheck />}
              size={ButtonSize.SMALL}
              type="submit"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
