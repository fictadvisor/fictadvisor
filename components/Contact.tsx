import { Loader } from "./ui/Loader";

function Contact({ name, value }) {
  return (
    <div title="Натисни, щоб копіювати" className="contact" onClick={() => navigator.clipboard.writeText(value)}>
      <div className="contact-name">{name}</div>
      <div>{value}</div>
    </div>
  );
};

export function ContactBlock() {
  return (
    <div className="contact-group">
      <Contact name="Телефон" value="+380 50 507 29 43" />
      <Contact name="Telegram" value="@lisovychenko" />
      <Contact name="Email" value="timur.shemsedinov@gmail.com" />
    </div>
  );
}