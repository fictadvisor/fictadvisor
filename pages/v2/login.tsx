import {GetServerSideProps} from "next";
import {LargeButton, MediumButton} from "../../components/v2/Button";
import {Input, InputState} from "../../components/v2/Input";

function IndexPage() {

    return (

        <div id="login-page-wrapper">
            <div id="left-block" >
                <div id="left-block__content">
                    <img id="login-circle" src={'assets/login-page/login-circle.svg'} alt="red circle icon"/>

                    <div id="blur-block">
                        <img id="login-logo" src={"assets/logo.png"}/>
                        <h3 id="register-text">Ти ще не знами?<br/>Приєднуйся!</h3>
                        <MediumButton text='Зарeєструватися' onClick={() => {}} isDisabled={false}/>
                    </div>
                </div>

            </div>
            <div id="right-block">
                <div id="right-block__content">
                <h3 className="h3--semi-bold" id ="register-header">З поверненням!</h3>
                <LargeButton text="Увійти за допомогою Telegram" onClick={() => {}} isDisabled={false}/>

                <div id="splitter">
                    <hr/>
                    <div>
                        <p> або </p>
                    </div>
                </div>
                    <Input label={"Пошта або юзернейм"} placeholder={"placeholder"} isHiddable={false} state={InputState.DEFAULT}/>
                    <Input label={"Пароль"} placeholder={"placeholder"} isHiddable={true} state={InputState.DEFAULT}/>
                    <div id="one-line">
                        <div id="checkbox-container">
                            <input type="checkbox" id="register-checkbox"/>
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
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    return {props: {

        }};
};

export default IndexPage;