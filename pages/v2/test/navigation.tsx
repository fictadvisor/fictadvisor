import styles from "styles/v2/local/pages/test.module.scss";
import Header from "../../../components/v2/ui/Header";
import Footer from "../../../components/v2/ui/Footer";

function navigation() {
    return (
        <div className = {styles["test-page-wrap"]}>
            
                <Header isLoggined={false}/>
                <Footer/>
        </div>
    );
}

export default navigation;