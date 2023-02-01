import {GetServerSideProps} from "next";
import Button, {ButtonIconPosition, ButtonSize, ButtonType} from "../../components/v2/Button";
import Divider from "../../components/v2/Divider";
import {CustomLink} from "../../components/v2/Link";
import {Check, CheckState} from "../../components/v2/Check";
import PageLayout from "../../components/v2/layout/PageLayout";
import Input, {InputSize, InputState, InputType} from "../../components/v2/Input";
import {ArrowLeftIcon, HeartIcon} from "@heroicons/react/24/outline";

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
                                    <Button text='Зарeєструватися' onClick={() => {}} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.PRIMARY_RED}/>
                                </div>
                            </div>

                        </div>

                        <hr/>

                        <div className="right-block">
                            <div className="right-block__content">
                                <h3 className="register-header">З поверненням!</h3>
                                <Button icon={<HeartIcon className="icon"/>} iconPosition={ButtonIconPosition.LEFT} text="Увійти за допомогою Telegram" onClick={() => {}} isDisabled={false} size={ButtonSize.LARGE} type={ButtonType.PRIMARY_RED}/>
                                <Divider text="або" className="login-divider"/>
                                <Input className="login-input" label={"Пошта або юзернейм"} placeholder={"placeholder"} state={InputState.DEFAULT} size={InputSize.LARGE} type={InputType.DEFAULT}/>
                                <Input label={"Пароль"} placeholder={"placeholder"} state={InputState.DEFAULT}  size={InputSize.LARGE} type={InputType.HIDDABLE}
                                defaultRemark="Пароль повинен місити 8 символів та обов’язкові знаки"/>
                                <div className="one-line">
                                    <div className="checkbox-container">
                                        <Check state={CheckState.DEFAULT}/>
                                        <p className="body-primary">
                                            Запам’ятати дані
                                        </p>
                                    </div>
                                    <CustomLink text="Забув пароль?" href={"#"}/>
                                </div>
                                <Button text="Увійти" onClick={() => {}} isDisabled={true} size={ButtonSize.LARGE} type={ButtonType.PRIMARY_RED}/>
                                <div className="placeholder"></div>
                                <Button icon={<ArrowLeftIcon className="icon"/>} iconPosition={ButtonIconPosition.LEFT} text="Повернутись до головної" onClick={() => {}} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.TERTIARY}/>
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