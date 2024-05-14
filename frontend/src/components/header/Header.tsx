import { useEffect, useRef, useState, WheelEvent } from "react";
import { Link } from "react-router-dom";
import "./header.scss";
import Navbar from "../navbar/Navbar";
import logo from "../../assets/logo.svg";

const App = () => {
  const pagesRef = useRef<HTMLDivElement[]>([]);
  const currentPageRef = useRef<number>(0);
  const isTransitioningRef = useRef<boolean>(false);
  const [wheelEnabled, setWheelEnabled] = useState(true);

  useEffect(() => {
    showInitialPage();
  }, []);

  const showInitialPage = () => {
    pagesRef.current.forEach((page) => {
      page.classList.remove("active");
      page.classList.add("inactive");
    });
    pagesRef.current[currentPageRef.current].classList.add("active");
    pagesRef.current[currentPageRef.current].classList.remove("inactive");
    console.log("pagesRef:", pagesRef);
  };

  const checkLast = (direction: number) => {
    if (
      direction === 1 &&
      currentPageRef.current === pagesRef.current.length - 1
    ) {
      isTransitioningRef.current = false;
      return true;
    }
    if (direction === -1 && currentPageRef.current === 0) {
      isTransitioningRef.current = false;
      return true;
    }
    return false;
  };

  const scrollToSection = (direction: number) => {
    console.log("Scrolling to section activated");
    setTimeout(() => {
      setWheelEnabled(() => true);
    }, 1000); // after 2 second (can be changed), enable the scroll again
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    if (checkLast(direction)) {
      return;
    }

    pagesRef.current[currentPageRef.current].style.transform = `translateY(${
      direction * -100
    }vh)`;
    // pagesRef.current[
    //   currentPageRef.current
    // ].style.transition = `transform ease-out 2s`;
    const previousPage = currentPageRef.current;

    currentPageRef.current =
      (currentPageRef.current + pagesRef.current.length + direction) %
      pagesRef.current.length;
    console.log("previousPage", previousPage);
    console.log("currPageRef.current", currentPageRef.current);

    pagesRef.current[previousPage].classList.remove("active");
    pagesRef.current[previousPage].classList.add("inactive");
    pagesRef.current[currentPageRef.current].classList.add("active");
    pagesRef.current[currentPageRef.current].classList.remove("inactive");
    pagesRef.current[currentPageRef.current].style.transform = "translateY(0)";

    isTransitioningRef.current = false;
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    const direction = Math.sign(event.deltaY); // either 1 or -1 depending on scroll direction
    setWheelEnabled(() => false); // cant run scroll multiple times
    scrollToSection(direction);
  };

  return (
    <div className="hero" onWheel={wheelEnabled ? handleWheel : undefined}>
      <Navbar />

      <div
        className="page page1"
        style={{
          transform: "translateY(0px)",
          transition: "transform ease-out 1s",
        }}
        ref={(el: HTMLDivElement): void => {
          if (pagesRef.current.length < 1) {
            console.log("this");
            el && pagesRef.current.push(el);
          }
        }}
      ></div>
      <div
        style={{
          transform: "translateY(100vh)",
          transition: "transform ease-out 1s",
        }}
        className="page page2"
        ref={(el: HTMLDivElement): void => {
          if (pagesRef.current.length < 2) {
            el && pagesRef.current.push(el);
          }
        }}
      >
        <Link to="services">
          <span>to services</span>
        </Link>
      </div>
      <div
        style={{
          transform: "translateY(100vh)",
          transition: "transform ease-out 1s",
        }}
        className="page page3"
        ref={(el: HTMLDivElement): void => {
          if (pagesRef.current.length < 3) {
            el && pagesRef.current.push(el);
          }
        }}
      >
        <Link to="products">
          <span>to products</span>
        </Link>
      </div>
      <div
        style={{
          transform: "translateY(100vh)",
          transition: "transform ease-out 1s",
        }}
        className="page page4"
        ref={(el: HTMLDivElement): void => {
          if (pagesRef.current.length < 4) {
            el && pagesRef.current.push(el);
          }
        }}
      >
        <div className="about inner-page-div">
          <h3>
            Step into Bliss Salon and Spa, your haven of tranquility in Berlin.
          </h3>
          <p>
            We offer a range of personalized beauty and wellness services
            designed to help you unwind and revitalize. From.....
          </p>

          <Link to="/about ">
            <span>more</span>
          </Link>
        </div>
      </div>
      {/* <div
        style={{
          transform: "translateY(100vh)",
          transition: "transform ease-out 1s",
        }}
        className="page page5"
        ref={(el: HTMLDivElement): void => {
          if (pagesRef.current.length < 5) {
            el && pagesRef.current.push(el);
          }
        }}
      >
        <div className="contact inner-page-div">
          <h1>come and visit us </h1>
          <p>123 Fake Street Berlin, 10115 Germany</p>
          <div>
            <Link className="contact-link" to="/contact">
              <span> contact us</span>
            </Link>
            <span>|</span>
            <div>
              <span>tel:</span>
              <p className="contact-number">+49 30 000000000</p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};
export default App;
