
function alertButtons(){
  return(
    <div id="button-icons">

      <br/>
      <div className="big-alert-button">
        <button>Remove <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 6L18 18M6 18L18 6L6 18Z" stroke="#FAFAFA" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </button>
      </div>
        <div className="big-alert-button">
            <button disabled={true}>Remove <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 6L18 18M6 18L18 6L6 18Z" stroke="#FAFAFA" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </button>
        </div>
      <br/>
      <div className="small-alert-button">
        <button> Add <svg className="button-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 13L9 17L19 7" stroke="#FAFAFA" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </button>
      </div>
    </div>
  );
}

export default alertButtons;