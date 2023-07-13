import "./Banner.scss";

function Banner() {
  return (
    <section className="banner">
      <div className="text">
        <span className="logo">
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
        </span>
        <h2>Make your Team</h2>
      </div>
      <div className="image">
        <img alt="banner" src="/images/banner.png"></img>
      </div>
    </section>
  );
}

export default Banner;
