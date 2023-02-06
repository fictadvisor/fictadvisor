import styles from "styles/v2/local/pages/test.module.scss";
import Header from "../../../components/v2/ui/Header";
import Footer from "../../../components/v2/ui/Footer";

function navigation() {
    const buttons = [
        {
            text: "Головна",
        },
        {
            text: "Опитування",
        },
        {
            text: "Викладачі",
        },
        {
            text: "Предмети",
        },
    ];

    return (
        <div className = {styles["test-page-wrap"]}>

                <Header buttons={buttons} isLoggined={false}/>
                <br />
                <Header groupName="ІС-11" username="Ярмоленко Єлизавета Миколаївна" position="Зам. староста" buttons={buttons} isLoggined={true}/>
                <br />
                <Footer/>
        </div>
    );
}

export default navigation;