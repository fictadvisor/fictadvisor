import exp from "constants";

function dividers(){
  return(
    <div className="test-page-wrap">
      <div className = "container">
        <hr className="zero-line"/>
        <ul>
          <li>
            <hr className="first-line"/>
          </li>
          <li className="divider-text">Text</li>
          <li>
            <hr className="first-line"/>
          </li>
        </ul>
    
        <ul>
          <li className="divider-text second-text">Text</li>
          <li>
            <hr className="second-line"/>
          </li>
        </ul>
    
        <ul>
          <li>
            <hr className="second-line"/>
          </li>
          <li className="divider-text third-text">Text</li>
        </ul>
      </div> 
    </div>
    );
} 

export default dividers;