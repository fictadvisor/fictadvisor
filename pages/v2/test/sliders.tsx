
function sliders(){
    return(
        <div className="test-page-wrap">
            <div className="slider-container">
                <input type="range" name="range" min="1" max="10" step="1" value="5" className="slider" id="slider-desktop"></input>
                <div className="number-range-desktop"></div>
            </div>

            <div className="slider-container">
                <input type="range" name="range" min="1" max="10" step="1" value="3" className="slider" id="slider-mobile"></input>
                <div className="number-range-mobile"></div>
            </div>
        </div>
    );

}

// const slider = document.querySelector(".slider");

// function setBackgroundSize(slider) {
//   slider.style.setProperty("--background-size", `${getBackgroundSize(slider)}%`);
// }

// setBackgroundSize(slider);

// slider.addEventListener("input", () => setBackgroundSize(slider));

// function getBackgroundSize(slider) {
//   const min = +slider.min || 0;
//   const max = +slider.max || 100;
//   const value = +slider.value;

//   const size = (value - min) / (max - min) * 100;

//   return size;
// }

export default sliders;