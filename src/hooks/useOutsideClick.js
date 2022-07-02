import { useEffect } from "react";

const useOutsideClick = (ref, callback) => {
  const handleClick = (e) => {
    console.log("Current Ref", ref.current);
    console.log("e.target", e.target);
    if (ref.current && !ref.current.contains(e.target)) {
      console.log("true");
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  });
};

export default useOutsideClick;
