import Button from './ui/Button';

const AuthenticationModal = () => {
  return (
    <div className="modal block">
      <div className="modal-title">Для цієї дії необхідно авторизуватись на сайті</div>
      <div className="modal-actions">
        <Button>Назад</Button>
        <Button className="flex-grow">Авторизуватись</Button>
      </div>
    </div>
  );
};

export default AuthenticationModal;
