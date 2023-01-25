import {GetServerSideProps} from "next";
import {LargeButton, MediumButton} from "../../components/v2/Button";
import {Input, InputState} from "../../components/v2/Input";
import PageLayout from "../../components/v2/PageLayout";

function LoginPage() {

    return (
        <PageLayout description={"Сторінка для авторизації"}>
            <div className="login-page">
                <div className="login-page__content">
                <div className="left-block" >
                    <div className="left-block__content">
                        <img className="login-circle" src={'/assets/login-page/login-circle.svg'} alt="red circle icon"/>

                        <div className="blur-block">
                            <img className="login-logo" src={"/assets/logo.png"}/>
                            <h3 className="register-text">Ти ще не знами?<br/>Приєднуйся!</h3>
                            <MediumButton text='Зарeєструватися' onClick={() => {}} isDisabled={false}/>
                        </div>
                    </div>

                </div>
                <div className="right-block">
                    <div className="right-block__content">
                        <h3 className="h3--semi-bold register-header">З поверненням!</h3>
                        <LargeButton text="Увійти за допомогою Telegram" onClick={() => {}} isDisabled={false}/>

                        <div className="splitter">
                            <hr/>
                            <div>
                                <p> або </p>
                            </div>
                        </div>
                        <Input label={"Пошта або юзернейм"} placeholder={"placeholder"} isHiddable={false} state={InputState.DEFAULT}/>
                        <Input label={"Пароль"} placeholder={"placeholder"} isHiddable={true} state={InputState.DEFAULT}/>
                        <div className="one-line">
                            <div className="checkbox-container">
                                <input type="checkbox" className="register-checkbox"/>
                                <p>
                                    Запам’ятати дані
                                </p>
                            </div>
                            <div className="white-link-underlined">
                                <a className="link-container" href="pages/v1">Забув пароль?</a>
                            </div>
                        </div>
                        <LargeButton text="Увійти" onClick={() => {}} isDisabled={true}/>

                    </div>
                </div>
                </div>
            </div>

        </PageLayout>

    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    return {props: {

        }};
};

export default LoginPage;