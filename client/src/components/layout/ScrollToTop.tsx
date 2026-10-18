import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop Component
 * 1. Automatically scrolls to top smoothly on route change.
 * 2. If a hash is present in the URL (e.g. #how-it-works, #services),
 *    smoothly scrolls to that target section element with proper navbar offset.
 */
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace("#", "");
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        // Small timeout allows DOM rendering & dynamic content to stabilize
        setTimeout(() => {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 50);
      }
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
