export type SliderProperties = {

} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Slider = (props) => {
  return (
    <div className="slider">
      <input className="slider-range" type="range" {...props} />
    </div>
  );
};

export default Slider;