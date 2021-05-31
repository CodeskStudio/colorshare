import React from 'react';
import './style.css';
import { InputGroup, Input } from 'reactstrap';
import { Button } from 'reactstrap';
import { BiShareAlt } from 'react-icons/bi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import converter from 'color-convert';

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

      <InputGroup>
        <Input type="color" onChange={event => setColor(event.target.value)} pattern="^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$" value={color}></Input>
        <Input type="text" class="form-control" pattern="^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$" value={color} />
        <Button class="shadow-lg sh-txt" onClick={copyNotify}><BiShareAlt/></Button>
      </InputGroup>

      <h2>Color Converter</h2>
      <h3>rgb {colorrgb}</h3>
      <h3>hsl {colorhsl}</h3>
      <h3>hsv {colorhsv}</h3>
      <h3>cmyk {colorcmyk}</h3>
      <h3>hwb {colorhwb}</h3>
      <h3>lab {colorlab}</h3>

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