
interface OwnProps {}

type Props = OwnProps;

function test(){

  return(
    <div id="container">
        <h1> This is header 1</h1>
        <hr/>
        <h2> This is header 2</h2>
        <hr/>
        <h3> This is header 3</h3>
        <hr/>
        <h4> This is header 4</h4>
        <hr/>
        <h5> This is header 5</h5>
        <hr/>
        <h6> This is header 6</h6>
        <hr/>
        <p className="body-secondary">Body Secondary</p>
        <hr/>
        <p className="body-primary">Body Primary</p>
        <hr/>
        <p className="overline-text">Overline</p>
        <hr/>
        <div className="button-container">
              <button className="large-button"> Default </button>
              <button className="large-button" disabled={true}> Disabled </button>
        </div>
        <hr/>
        <div className="button-container">
            <button className="medium-button"> Default </button>
            <button className="medium-button" disabled={true}> Disabled </button>
        </div>
        <hr/>
        <div className="button-container">
            <button className="small-button">
                Default
            </button>
            <button className="small-button" disabled={true}> Disabled </button>
        </div>
        <hr/>
        <form>
            <div className="field">
                <label> Label </label>
                <input placeholder="Placeholder"/>
            </div>
            <div className="disabled-field">
                <label> Label </label>
                <input placeholder="Placeholder"/>
            </div>
            <div className="success-field">
                <label> Label </label>
                <input placeholder="Placeholder"/>
            </div>
            <div className="error-field">
                <label> Label </label>
                <input placeholder="Placeholder"/>
            </div>
        </form>
    </div>
  );
}

export default test;
