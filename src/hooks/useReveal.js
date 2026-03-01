import { useEffect } from "react";

/**
 * Adds the "visible" class to all elements with the "reveal" class
 * when they enter the viewport. Re-runs on every render to pick up
 * newly-mounted elements (e.g. after page navigation).
 */
export default function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });
}
