import React, { useEffect, useRef, useState } from "react";
// import "./header.scss";
import Navbar from "../navbar/Navbar";
import img from "../../assets/hero206.jpg";
import img1 from "../../assets/1.jpg";
import img2 from "../../assets/2.jpg";
import img3 from "../../assets/3.jpg";
import img4 from "../../assets/4.jpg";

const Hero: React.FC = () => {
  const pagesRef = useRef<HTMLDivElement[]>([]);
  const currentPageRef = useRef<number>(0);
  const isTransitioningRef = useRef<boolean>(false);
  const blankRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    showInitialPage();
    return () => {
      pagesRef.current = [];
    };
    // createBlank();
  }, []);

  const showInitialPage = () => {
    pagesRef.current.forEach((page) => {
      page.classList.remove("active");
      page.classList.add("inactive");
    });
    pagesRef.current[currentPageRef.current].classList.add("active");
    pagesRef.current[currentPageRef.current].classList.remove("inactive");
    console.log(pagesRef);
  };

  // const createBlank = () => {
  //   const blank = document.createElement("div");
  //   blank.style.backgroundColor = window
  //     .getComputedStyle(document.body, null)
  //     .getPropertyValue("background-color");
  //   blank.id = "blank";

  //   blankRef.current?.appendChild(blank);
  // };

  // const showBlank = () => {
  //   blankRef.current?.classList.add("visible");
  // };

  // const hideBlank = () => {
  //   blankRef.current?.classList.remove("visible");
  // };

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
    const easeInTimer = 1000;
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    if (checkLast(direction)) {
      return;
    }
    // why? come back to this
    showInitialPage();
    pagesRef.current[currentPageRef.current].style.transform = `translateY(${
      direction * -100
    }vh)`;
    pagesRef.current[
      currentPageRef.current
    ].style.transition = `transform ease-out`;
    let previousPage = currentPageRef.current;
    currentPageRef.current =
      (currentPageRef.current + pagesRef.current.length + direction) %
      pagesRef.current.length;

    // setTimeout(() => {
    //   pagesRef.current[previousPage].classList.remove("active");
    //   pagesRef.current[previousPage].classList.add("inactive");
    //   pagesRef.current[currentPageRef.current].classList.add("active");
    //   pagesRef.current[currentPageRef.current].classList.remove("inactive");
    //   pagesRef.current[currentPageRef.current].style.transition = "";
    //   // showBlank();
    // }, (easeInTimer * 3) / 4);

    // setTimeout(() => {
    //   // hideBlank();
    // }, easeInTimer * 2);

    // setTimeout(() => {
    //   isTransitioningRef.current = false;
    // }, 1500);
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const direction = Math.sign(event.deltaY);
    scrollToSection(direction);
  };

  return (
    <div className="hero" onWheel={handleWheel}>
      <Navbar />
      {/* make el unique */}
      <div className="page" ref={(el) => el && pagesRef.current.push(el)}>
        <h2>Page 1</h2>
        <p>This is some text overlaid on the first image.</p>
        <img src={img} alt="" />
      </div>
      <div className="page" ref={(el) => el && pagesRef.current.push(el)}>
        <h2>Page 2</h2>
        <p>This is some text overlaid on the second image.</p>
        <img src={img1} alt="" />
      </div>
      <div className="page" ref={(el) => el && pagesRef.current.push(el)}>
        <h2>Page 3</h2>
        <p>This is some text overlaid on the third image.</p>
        <img src={img2} alt="" />
      </div>
      <div className="page" ref={(el) => el && pagesRef.current.push(el)}>
        <h2>Page 4</h2>
        <p>This is some text overlaid on the fourth image.</p>
        <img src={img3} alt="" />
      </div>
      <div className="page" ref={(el) => el && pagesRef.current.push(el)}>
        <h2>Page 5</h2>
        <p>This is some text overlaid on the fifth image.</p>
        <img src={img4} alt="" />
      </div>
      <div ref={blankRef}></div>
    </div>
  );
};

export default Hero;
