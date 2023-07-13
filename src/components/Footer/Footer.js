import "./Footer.scss";
import ReactLogo from "../ReactLogo/ReactLogo";

function Footer() {
  return (
    <footer className="footer">
      <div className="logo">
        <h1>MySquad</h1>
        <svg
          viewBox="0 0 142 138"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.30347 4.24142L135.362 68.8136L3.30346 133.386L3.30347 4.24142Z"
            strokeWidth="5"
          />
        </svg>
      </div>
      <div className="dev">
        <h2>
          made with <span className="react-txt">react.js</span>
        </h2>
        <ReactLogo width={50}></ReactLogo>
      </div>
    </footer>
  );
}

export default Footer;
