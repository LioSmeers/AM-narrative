const internalLinks = document.querySelectorAll('a[href$=".html"], a[href="/"], a[href="./"]');
const revealTargets = document.querySelectorAll(
  ".camera-stage, .intro-section > *, .service-grid article, .page-hero, .portfolio-item, .split-page > *, .values article, .contact-layout > *"
);
const cameraTrigger = document.querySelector(".camera-trigger");
const screenImages = document.querySelectorAll(".screen-image");
let screenIndex = 0;

revealTargets.forEach((target) => {
  target.classList.add("scroll-reveal");
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("is-visible", entry.isIntersecting);
    });
  },
  {
    rootMargin: "-8% 0px -12% 0px",
    threshold: 0.18,
  }
);

revealTargets.forEach((target) => revealObserver.observe(target));

if (cameraTrigger && screenImages.length) {
  cameraTrigger.addEventListener("click", () => {
    cameraTrigger.classList.remove("is-flashing");
    void cameraTrigger.offsetWidth;
    cameraTrigger.classList.add("is-flashing");

    screenImages[screenIndex].classList.remove("active");
    screenIndex = (screenIndex + 1) % screenImages.length;
    screenImages[screenIndex].classList.add("active");

    window.setTimeout(() => {
      cameraTrigger.classList.remove("is-flashing");
    }, 520);
  });
}

internalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");

    if (!href || link.target || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    document.body.classList.add("is-leaving");

    window.setTimeout(() => {
      window.location.href = href;
    }, 260);
  });
});
