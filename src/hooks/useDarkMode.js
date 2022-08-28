import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "redux/global/globalSlice";
import useLocalStorage from "./useLocalStorage";

function useDarkMode() {
  const [storedValue, setValue] = useLocalStorage("theme", "light");
  const { theme = "light" } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTheme(typeof storedValue === "string" ? storedValue : "light"));
  }, []);
  useEffect(() => {
    const element = window.document.body;
    if (theme === "light") {
      element.classList.remove("dark");
    } else {
      element.classList.add("dark");
    }
    setValue(theme);
  }, [theme]);
  const setThemeValue = (value) => {
    dispatch(setTheme(value));
  };
  return {
    theme,
    setThemeValue,
  };
}

export default useDarkMode;
