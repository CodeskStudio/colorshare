import React from 'react';
import './style.css';
import { InputGroup, Input } from 'reactstrap';
import { Button } from 'reactstrap';
import { BiShareAlt } from 'react-icons/bi';
import { SiConvertio } from 'react-icons/si';
import { ToastContainer, toast } from 'react-toastify';
import {Animated} from "react-animated-css";
import 'react-toastify/dist/ReactToastify.css';
import converter from 'color-convert';
import CConverter from './components/CConverter';

const App = () => {

  const url = window.location.pathname.replace("/", "#");
  const [color, setColor] = React.useState(url)
  const noCode = color.replace("#", "");
  const share = window.location.origin + '/' + noCode

  const colorhex = color;
  const colorrgb = converter.hex.rgb(colorhex);
  const colorhsl = converter.hex.hsl(colorhex);
  const colorhsv = converter.hex.hsv(colorhex);
  const colorcmyk = converter.hex.cmyk(colorhex);
  const colorhwb = converter.hex.hwb(colorhex);
  const colorlab = converter.hex.lab(colorhex);

  document.body.style = 'background: ' + color + ';'  

  const notify = () => (
    <div>
      ✔️ Your shareable page for <code>{color}</code> was successfully generated and copied to your clipboard.
    </div>
  )
  
  
  function copyNotify() {
    toast.dark(notify, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    navigator.clipboard.writeText(share)
  } 

  return (
    <>
      <div class="center">

        <h1 class="text-white shadow-lg sh-txt" className="display-3">ColorShare</h1>

        <h1 class="text-white shadow-lg sh-txt">{color}</h1>  
        <ColorName />
      <div class="text-white shadow-lg sh-txt">
      <InputGroup>
        <Input class="ipt-outline" type="color" onChange={event => setColor(event.target.value)} pattern="^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$" value={color}></Input>
        <input type="text" class="form-control ipt-outline" pattern="^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$" value={color} />
        <button class="btn btn-outline shadow-lg sh-txt" onClick={copyNotify}><BiShareAlt/></button>
        <button class="btn btn-outline shadow-lg sh-txt"><SiConvertio/></button>
      </InputGroup>
      </div>
      <span class="brsmall"></span>
      <Animated animationIn="slideInDown" animationOut="slideOutUp" animationInDuration={1000} animationOutDuration={1000}>
        <CConverter 
      rgb={colorrgb}
      hsl={colorhsl}
      hsv={colorhsv}
      cmyk={colorcmyk}
      hwb={colorhwb}
      lab={colorlab}
      />
      </Animated>

      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

    </>
  );

  function ColorName() {

    const [data, setData] = React.useState('');
    React.useEffect(() => {
      fetch('https://www.thecolorapi.com/id?hex=' + noCode)
        .then((res) => res.json())
        .then(({name:{value}}) => {
          setData(() => value);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
  
    return (
      <h1 class="text-white shadow-lg sh-txt">{data}</h1>
    );
  }

};



export default App;