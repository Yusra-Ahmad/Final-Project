import React, { useEffect, useState } from "react";
import "./slider.scss";
import img1 from "../../assets/1.jpg";
import img2 from "../../assets/2.jpg";
import img3 from "../../assets/3.jpg";
import img4 from "../../assets/4.jpg";

const Slider: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  let blank: HTMLDivElement | null = null;

  useEffect(() => {
    showInitialPage();
    createBlank();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function showInitialPage() {
    const pages = document.querySelectorAll(".page");
    pages.forEach((page) => page.classList.remove("active"));
    pages.forEach((page) => page.classList.add("inactive"));
    pages[currentPage].classList.add("active");
    pages[currentPage].classList.remove("inactive");
  }

  function createBlank() {
    blank = document.createElement("div");
    blank.style.backgroundColor = window
      .getComputedStyle(document.body, null)
      .getPropertyValue("background-color");
    blank.id = "blank";

    document.querySelector(".page-container")?.appendChild(blank);
  }

  function showBlank() {
    blank?.classList.add("visible");
  }

  function hideBlank() {
    blank?.classList.remove("visible");
  }

  function checkLast(direction: number): boolean {
    const pages = document.querySelectorAll(".page");
    if (direction === 1 && currentPage === pages.length - 1) {
      setIsTransitioning(false);
      return true;
    }
    if (direction === -1 && currentPage === 0) {
      setIsTransitioning(false);
      return true;
    }
    return false;
  }

  function scrollToSection(direction: number) {
    const easeInTimer = 300;
    if (isTransitioning) return;
    setIsTransitioning(true);
    if (checkLast(direction)) {
      return;
    }
    showInitialPage();
    const pages = document.querySelectorAll(".page");
    pages[currentPage].style.transform = `translateY(${direction * -100}vh)`;
    pages[currentPage].style.transition = `transform ease-out`;
    const previousPage = currentPage;
    setCurrentPage((previousPage + pages.length + direction) % pages.length);

    setTimeout(() => {
      const pages = document.querySelectorAll(".page");
      pages[previousPage].classList.remove("active");
      pages[previousPage].classList.add("inactive");
      pages[currentPage].classList.add("active");
      pages[currentPage].classList.remove("inactive");
      pages[currentPage].style.transform = "";
      showBlank();
    }, (easeInTimer * 3) / 4);

    setTimeout(() => {
      hideBlank();
    }, easeInTimer * 2);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 1500);
  }

  return (
    <div className="page-container">
      <div className="page">
        <img src={img1} alt="Image 1" />
        <div className="text-overlay">
          <h2>Page 1</h2>
          <p>This is some text overlaid on the first image.</p>
        </div>
      </div>
      <div className="page">
        <img src={img2} alt="Image 2" />
        <div className="text-overlay">
          <h2>Page 2</h2>
          <p>This is some text overlaid on the second image.</p>
        </div>
      </div>
      <div className="page">
        <img src={img3} alt="Image 3" />
        <div className="text-overlay">
          <h2>Page 3</h2>
          <p>This is some text overlaid on the third image.</p>
        </div>
      </div>
      <div className="page">
        <img src={img4} alt="Image 4" />
        <div className="text-overlay">
          <h2>Page 4</h2>
          <p>This is some text overlaid on the fourth image.</p>
        </div>
      </div>
    </div>
  );
};

export default Slider;
