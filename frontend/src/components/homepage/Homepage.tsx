import Header from "../header/Header";
// import "./homepage.scss";

const Homepage = () => {
  return (
    <div className="home-page">
      <div className="page-container">
        <Header />
        <div className="page">
          <div className="text-overlay">
            <h2>Page 1</h2>
            <p>This is some text overlaid on the first image.</p>
          </div>
        </div>
        <div className="page">
          <div className="text-overlay">
            <h2>Page 2</h2>
            <p>This is some text overlaid on the second image.</p>
          </div>
        </div>
        <div className="page">
          <div className="text-overlay">
            <h2>Page 3</h2>
            <p>This is some text overlaid on the third image.</p>
          </div>
        </div>
        <div className="page">
          <div className="text-overlay">
            <h2>Page 4</h2>
            <p>This is some text overlaid on the fourth image.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
