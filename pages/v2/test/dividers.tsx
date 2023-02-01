import exp from "constants";
import styles from "styles/v2/local/pages/test.module.scss";

function dividers(){
  return(
    <div className = {styles["test-page-wrap"]}>
      <div className = "container">
        <hr/>
        <ul className="dividers-list">
            <hr className="first-line"/>
          <li className="divider-text">Text</li>
            <hr className="first-line"/>
        </ul>
    
        <ul className="dividers-list">
          <li className="divider-text second-text">Text</li>
            <hr className="second-line"/>
        </ul>
    
        <ul className="dividers-list">
            <hr className="second-line"/>
          <li className="divider-text third-text">Text</li>
        </ul>
      </div> 
    </div>
    );
} 

export default dividers;