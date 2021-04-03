import Contact, { ContactProperties } from "../Contact";
import Disclaimer from "../ui/Disclaimer";

export type ContactBlockProperties = {
  contacts: ContactProperties[];
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const ContactBlock = ({ contacts }: ContactBlockProperties) => {
  return (
    <div>
      <Disclaimer className="space-b">
        Натисніть на контакт, щоб скопіювати його до буфера обміну
      </Disclaimer>
      <div className="contact-group">
        {
          contacts.map((c, i) => <Contact key={i} {...c} />)
        }
      </div>
    </div>
  );
};

export default ContactBlock;