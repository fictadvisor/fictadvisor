import {GetServerSideProps} from "next";
import {Input, InputState} from "../../components/v2/Input";
import PageLayout from "../../components/v2/PageLayout";
import Button, {ButtonSize, ButtonType} from "../../components/v2/Button";
import Divider from "../../components/v2/Divider";
import {CustomLink} from "../../components/v2/Link";
import {Check, CheckState} from "../../components/v2/Check";

function LoginPage() {

    return (
        <PageLayout description={"Сторінка для авторизації"}>
            <div className="login-page">
                    <div className="login-page__content">

                        <div className="left-block" >
                            <div className="left-block__content">
                                <img className="login-logo" src={"/assets/login-page/new_logo.png"} alt="fict advisor logo"/>
                                <h3 className="register-text">Ти ще не знами?<br/>Приєднуйся!</h3>
                                <div className="login-button-container">
                                    <Button text='Зарeєструватися' onClick={() => {}} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.PRIMARY}/>
                                </div>
                            </div>

                        </div>

                        <hr/>

                        <div className="right-block">
                            <div className="right-block__content">
                                <h3 className="register-header">З поверненням!</h3>
                                <Button iconPath="/assets/icons/heart.svg" text="Увійти за допомогою Telegram" onClick={() => {}} isDisabled={false} size={ButtonSize.LARGE} type={ButtonType.PRIMARY}/>
                                <Divider text="або" className="login-divider"/>
                                <Input className="login-input" label={"Пошта або юзернейм"} placeholder={"placeholder"} isHiddable={false} state={InputState.DEFAULT}/>
                                <Input label={"Пароль"} placeholder={"placeholder"} isHiddable={true} state={InputState.DEFAULT}
                                remark="Пароль повинен місити 8 символів та обов’язкові знаки"/>
                                <div className="one-line">
                                    <div className="checkbox-container">
                                        <Check state={CheckState.DEFAULT}/>
                                        <p className="body-primary">
                                            Запам’ятати дані
                                        </p>
                                    </div>
                                    <CustomLink text="Забув пароль?" href={"#"}/>
                                </div>
                                <Button text="Увійти" onClick={() => {}} isDisabled={true} size={ButtonSize.LARGE} type={ButtonType.PRIMARY}/>
                                <div className="placeholder"></div>
                                <Button iconPath="/assets/login-page/arrow-left.svg" text="Повернутись до головної" onClick={() => {}} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.TERTIARY}/>
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