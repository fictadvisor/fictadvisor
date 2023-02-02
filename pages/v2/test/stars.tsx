import testStyles from "styles/v2/local/pages/test.module.scss";
import starStyles from "styles/v2/local/elements/Star.module.scss";

function stars(){
    return(
        <div className = {testStyles["test-page-wrap"]}>
            <div className={starStyles["ratings"]}>
                <div className={starStyles["empty-stars"]}></div>
                <div className={starStyles["full-stars"]}></div>
            </div>                    
        </div>
    );
}

export default stars;
