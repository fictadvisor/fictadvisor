import { useQuery } from "react-query";
import api from "../../lib/api";
import Contact, { ContactProperties } from "../Contact";
import Disclaimer from "../ui/Disclaimer";
import Loader from "../ui/Loader";

export type ContactBlockProperties = {
  link: string;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const ContactList = ({ data }) => {
  if (data.items.length === 0) {
    return (
      <Disclaimer className="space-b">
        На жаль, у нас немає інформації про контакти цього викладача
      </Disclaimer>
    );
  }

  return (
    <>
      <Disclaimer className="space-b">
        Натисніть на контакт, щоб скопіювати його до буфера обміну
      </Disclaimer>
      <div className="contact-group">
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

  return (
    <div>
      {
        isLoading || error
          ? <Loader.Catchable error={error} />
          : <ContactList data={data} />
      }
    </div>
  );
};

export default ContactBlock;