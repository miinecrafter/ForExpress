import './App.css';

import TopBar from './TopBar/TopBar.js';
import ImgTextPair from './ImgTextPair/ImgTextPair.js';
import IconImg from './IconImg/IconImg.js';

import audcad from './images/audcad1.png';
import chfcnh from './images/chfcnh1.png';
import usddkk from './images/usddkk1.png';
import overview from './images/overview1.png';
import smileComp from './images/smilecomputer.jpg';
import smilePad from './images/smilepad.webp';
import smilePhone from './images/smilephone.jpg';
import wbl1 from './images/wbl1.png';
import wbl2 from './images/wbl2.png';
import wbl3 from './images/wbl3.png';
import wbl4 from './images/wbl4.png';
import topImage from './images/manScreen.jpg';

function App() {
  return (
    <div className="App">
      <div className="top-bar">
        <TopBar />
      </div>

      <div className="main">
        <p className="main-title">forexpress</p>
        <p className="main-desc">Simplistic ForEx trading.</p>
        <p className="main-desc">All your ForEx needs in one place.</p>
      </div>

      <p className="call">Log in to invest now!</p>

      <div className="image-stack">
        <img src={audcad} className="stack audcad" />
        <img src={chfcnh} className="stack chfcnh" />
        <img src={usddkk} className="stack usddkk" />
      </div>

      <div className="sec-section">
        <div className="sub-cont">
          <p className="sub-title">Intuitive and Minimalist</p>
          <div className="center">
            <ImgTextPair imgSrc={smileComp} imgText="Easy to use and clean interface makes ForEx intuitive." />
            <ImgTextPair imgSrc={smilePad} imgText="24/7 support with quick and reliable responses." />
            <ImgTextPair imgSrc={smilePhone} imgText="Quick price reload and easy buy/sell mechanics." />
          </div>
        </div>
      </div>

      <div className="grid-sec">
        <IconImg img={wbl1} titleText={"Simple, clean portfolio"} desc={"All your favorite currencies and each of your investments your investments in one place"} />
        <IconImg img={wbl2} titleText={"Complete buy/sell history"} desc={"Get access to the date, time, and amount of all your purchases"} />
        <IconImg img={wbl3} titleText={"20 different currencies"} desc={"Get access to in demand currencies (USD, DKK, EUR)"} />
        <IconImg img={wbl4} titleText={"Specialized money tracker"} desc={"Know just how much money you have made with forexpress at all times"} />
      </div>

    </div>
  );
}

export default App;
