import Progress, {ProgressSize} from "../../../components/v2/ui/Progress";
import styles from "styles/v2/local/pages/test.module.scss";

function progress(){
  return(
    <div className = {styles["test-page-wrap"]}>
        <div className = {styles["test-page-content"]}>
            <Progress size={ProgressSize.SMALLEST}/>
            <Progress size={ProgressSize.SMALL}/>
            <Progress size={ProgressSize.MEDIUM}/>
            <Progress size={ProgressSize.LARGE}/>
            <Progress size={ProgressSize.LARGEST}/>
        </div>
    </div>
  );
}

export default progress;
