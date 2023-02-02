import styles from "styles/v2/local/pages/test.module.scss";

function text() {
    return (
        <div className = {styles["test-page-wrap"]}>
            <div className = {styles["test-page-content"]}>
                <h1> This is header 1</h1>
                <h2> This is header 2</h2>
                <h3> This is header 3</h3>
                <h4> This is header 4</h4>
                <h5> This is header 5</h5>
                <h6> This is header 6</h6>
                <p className="body-secondary">Body Secondary</p>
                <p className="body-primary">Body Primary</p>
                <p className="overline-text">Overline</p>
            </div>
        </div>
    );
}

export default text;
