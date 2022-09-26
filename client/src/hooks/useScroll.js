import { useEffect, useState } from 'react';

const useScroll = (heightLimit) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      // eslint-disable-next-line no-unused-expressions
      window.scrollY > heightLimit ? setIsScrolled(true) : setIsScrolled(false);
    };

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, [heightLimit]);

  return isScrolled;
};

export default useScroll;
