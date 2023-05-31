import React from 'react';
import { useLocation } from 'react-router';

const ScrollToTop = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === '') {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0);
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);

        if (element) {
          element.scrollIntoView();
        }
      }, 50);
    }
  }, [hash]);

  return <React.Fragment>{ProductsPage.children}</React.Fragment>;
};

export default ScrollToTop;
