import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const scrollPositions = {};

const ScrollToTop = () => {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // Save scroll position for the previous page
    return () => {
      scrollPositions[location.key] = window.scrollY;
    };
    // eslint-disable-next-line
  }, [location.key]);

  useEffect(() => {
    if (navigationType === "POP") {
      // Restore scroll position
      const y = scrollPositions[location.key] || 0;
      window.scrollTo(0, y);
    } else {
      // Scroll to top for new navigation
      window.scrollTo(0, 0);
    }
  }, [location, navigationType]);

  return null;
};

export default ScrollToTop;
