import "./Home.css";

function Home() {
  return (
    <>
      <body>
        <header>
          <div className="headerDiv-1">
            <div className="logo"></div>
            <div className="searchDiv">
              <input type="text" className="searchBar" />{" "}
              <button className="searchBtn"></button>
            </div>
            <div className="signupDiv">
              <button className="signupBtn">Get started</button>
            </div>
            <div className="loginDiv">
              <button className="loginBtn">Login</button>
            </div>
          </div>
          <div className="headerDiv-2"></div>
        </header>
        <section>
          <div className="sectionDiv-1"></div>
          <div className="sectionDiv-2"></div>
        </section>
      </body>
    </>
  );
}

export default Home;
