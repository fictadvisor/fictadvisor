import { useState } from "react";
import { useQuery } from "react-query";
import Contact from "../Contact";
import AddContactForm from "../forms/AddContactForm";
import Button from "../ui/Button";
import Disclaimer from "../ui/Disclaimer";
import Loader from "../ui/Loader";
import {useAuthentication} from "../../../lib/v1/context/AuthenticationContext";
import api from "../../../lib/v1/api";

export type ContactBlockProperties = {
  link: string;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const ContactList = ({ data }) => {
  if (data.items.length === 0) {
    return (
      <Disclaimer className="m-b m-t">
        На жаль, у нас немає інформації про контакти цього викладача
      </Disclaimer>
    );
  }

  return (
    <>
      <div className="contact-group m-t">
        {
          data.items.map((c, i) => <Contact key={i} {...c} />)
        }
      </div>
    </>
  );
};

const ContactBlock = ({ link }: ContactBlockProperties) => {
  const { data, isLoading, error } = useQuery(
    ['teacher-contacts', link], 
    () => api.teachers.getContacts(link), 
    { keepPreviousData: true }
  );

  const authentication = useAuthentication();
  const [formMode, setFormMode] = useState(false);

  return (
    <div>
      {
        formMode 
          ? <AddContactForm link={link} authentication={authentication} onBack={() => setFormMode(false)} />
          : <Button 
              className="w-full" 
              onClick={() => {
                if (!authentication.user) {
                  authentication.login();
                  return;
                }

                setFormMode(true);
              }}
            >
              Додати контакт
            </Button>
      }
      {
        isLoading || error
          ? <Loader.Catchable error={error} />
          : <ContactList data={data} />
      }
    </div>
  );
};

export default ContactBlock;