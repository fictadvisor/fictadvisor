import Progress, {ProgressSize} from "../../../components/v2/Progress";

function progress(){
  return(
    <div className="test-page-wrap">
        <div className="test-page-content">
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
