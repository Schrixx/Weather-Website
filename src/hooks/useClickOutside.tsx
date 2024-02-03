import { RefObject, useEffect } from "react";

type CallbackType = () => void

export const useClickOutside = (optionsRef: RefObject<HTMLUListElement>, inputRef: RefObject<HTMLInputElement>, callback: CallbackType) => {
  const handleClick = (e: any) => {
    if (
        optionsRef.current
        &&
        inputRef.current
        &&
        !optionsRef.current.contains(e.target)
        &&
        !inputRef.current.contains(e.target)
      ) {
        callback()
      }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};