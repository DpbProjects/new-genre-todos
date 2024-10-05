import { useState, useEffect } from "react";

export const useFade = () => {
  const [isVisible, setIsVisible] = useState(false);

  const fadeOut = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const fadeInTimeout = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(fadeInTimeout);
  }, []);

  return { isVisible, fadeOut };
};
