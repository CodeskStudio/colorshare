import React from 'react';

function CConverter(props) {


    return (
  <div class="text-white shadow-lg sh-txt">
    <br></br>
    <h3>rgb {props.rgb}</h3>
      <h3>hsl {props.hsl}</h3>
      <h3>hsv {props.hsv}</h3>
      <h3>cmyk {props.cmyk}</h3>
      <h3>hwb {props.hwb}</h3>
      <h3>lab {props.lab}</h3>
    <br></br>
  </div>
)
  }
export default CConverter
