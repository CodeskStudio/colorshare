import React from 'react';
import './style.css';
import {Helmet} from "react-helmet";
import { InputGroup, Input } from 'reactstrap';
import { Button } from 'reactstrap';
import { BiShareAlt } from 'react-icons/bi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const url = window.location.pathname.replace("/", "#");
  const [color, setColor] = React.useState(url)
  const noCode = color.replace("#", "");
  const share = window.location.origin + '/' + noCode 

  /*
  const ogTitle = 'ColorShare - ' + color
  const ogDescription = 'All about ' + color
  const ogImage = 'http://www.thecolorapi.com/id?format=svg&named=false&hex=' + noCode
  */
  
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

      </div>

      <Helmet>

      <meta property="og:type" content="website"></meta>
      <meta property="og:url" content="https://linkfork.co/"></meta>
      <meta property="og:title" content="LinkFork | Link Preview Customization"></meta>
      <meta property="og:description" content="LinkFork lets you shorten, and customize how your link will appear when shared on social media, for free."></meta>
      <meta property="og:image" content="https://linkfork.co/images/poster.png"></meta>

      </Helmet>

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