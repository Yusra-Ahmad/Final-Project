import { useEffect, useRef, useState, WheelEvent } from "react";
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
      >
        <h2>Page 1</h2>
        <p>This is some text overlaid on the first image.</p>
      </div>
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
        <h2>Page 2</h2>
        <p>This is some text overlaid on the second image.</p>
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
        <h2>Page 3</h2>
        <p>This is some text overlaid on the third image.</p>
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
        <h2>Page 4</h2>
        <p>This is some text overlaid on the fourth image.</p>
      </div>
      <div
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
        <h2>Page 5</h2>
        <p>This is some text overlaid on the fifth image.</p>
      </div>
    </div>
  );
};
export default App;
