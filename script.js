const internalLinks = document.querySelectorAll('a[href$=".html"], a[href="/"], a[href="./"]');
const revealTargets = document.querySelectorAll(
  ".camera-stage, .intro-section > *, .service-grid article, .page-hero, .portfolio-item, .split-page > *, .values article, .contact-layout > *"
);
const cameraModel = document.querySelector(".camera-model");

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

if (cameraModel) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  cameraModel.addEventListener(
    "load",
    () => {
      if (reduceMotion) {
        return;
      }

      cameraModel.autoRotate = true;
      cameraModel.rotationPerSecond = "30deg";

      window.setTimeout(() => {
        cameraModel.autoRotate = false;
      }, 6000);
    },
    { once: true }
  );
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
