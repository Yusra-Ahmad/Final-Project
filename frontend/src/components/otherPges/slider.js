const pages = document.querySelectorAll(".page");
let currentPage = 0;
let isTransitioning = false;
let blank;

showInitialPage();
createBlank();

function showInitialPage() {
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

  document.querySelector(".page-container").appendChild(blank);
}

function showBlank() {
  blank.classList.add("visible");
}

function hideBlank() {
  blank.classList.remove("visible");
}

function checkLast(direction) {
  if (direction === 1 && currentPage === pages.length - 1) {
    isTransitioning = false;
    return true;
  }
  if (direction === -1 && currentPage === 0) {
    isTransitioning = false;
    return true;
  }
  return false;
}

function scrollToSection(direction) {
  const easeInTimer = 300;
  if (isTransitioning) return;
  isTransitioning = true;
  if (checkLast(direction)) {
    return;
  }
  showInitialPage();
  pages[currentPage].style.transform = `translateY(${direction * -100}vh)`;
  pages[currentPage].style.transformStyle = `ease-out`;
  let previousPage = currentPage;
  currentPage = (currentPage + pages.length + direction) % pages.length;

  setTimeout(() => {
    pages[previousPage].classList.remove("active");
    pages[previousPage].classList.add("inactive");
    pages[currentPage].classList.add("active");
    pages[currentPage].classList.remove("inactive");
    pages[currentPage].style = "";
    showBlank();
  }, (easeInTimer * 3) / 4);

  setTimeout(() => {
    hideBlank();
  }, easeInTimer * 2);

  setTimeout(() => {
    isTransitioning = false;
  }, 1500);
}

window.addEventListener("wheel", (event) => {
  const direction = Math.sign(event.deltaY);
  scrollToSection(direction);
});
