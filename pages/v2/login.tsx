import {GetServerSideProps} from "next";
import {Input, InputState} from "../../components/v2/Input";
import PageLayout from "../../components/v2/PageLayout";
import Button, {ButtonSize} from "../../components/v2/Button";
import Divider from "../../components/v2/Divider";
import {CustomLink} from "../../components/v2/Link";

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
                            <div className="login-button-container">
                                <Button text='Зарeєструватися' onClick={() => {}} isDisabled={false} size={ButtonSize.MEDIUM}/>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="right-block">
                    <div className="right-block__content">
                        <h3 className="h3--semi-bold register-header">З поверненням!</h3>
                        <Button iconPath="/assets/icons/heart.svg" text="Увійти за допомогою Telegram" onClick={() => {}} isDisabled={false} size={ButtonSize.LARGE}/>
                        <Divider text="або" className="login-divider"/>
                        <Input label={"Пошта або юзернейм"} placeholder={"placeholder"} isHiddable={false} state={InputState.DEFAULT}/>
                        <Input label={"Пароль"} placeholder={"placeholder"} isHiddable={true} state={InputState.DEFAULT}/>
                        <div className="one-line">
                            <div className="checkbox-container">
                                <input type="checkbox" className="register-checkbox"/>
                                <p className="body-primary">
                                    Запам’ятати дані
                                </p>
                            </div>
                            <CustomLink text="Забув пароль?" href={"#"}/>

                        </div>
                        <Button text="Увійти" onClick={() => {}} isDisabled={true} size={ButtonSize.LARGE}/>

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