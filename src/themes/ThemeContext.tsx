'use client';
import React, { useState, useEffect, useContext, createContext } from "react";
export const ThemeContext = createContext({isDark: false, toggleTheme: () => {}});

export const ThemeProvider = ({ children }: {
  children: React.ReactNode,
}) => {
  const [isDark, setIsDark] = useState(false);

  const toggleHTML = () => {
    document.documentElement.classList.toggle('dark');
  } 


  const toggleElements = () => {
    const allElements = document.getElementsByClassName('page-theme navbar-container near-white active-tab color-page-colors code-page items-container code-container card');
    for (let i = 0; i < allElements.length; i++) {
      allElements[i].classList.toggle('dark');
    }
  }

  const toggleTheme = () => {
    setIsDark(!isDark);
    toggleElements();
    toggleHTML();
    localStorage.setItem("ironCodeDarkness", JSON.stringify(!isDark));
  }

  useEffect(() => {
    /*
    const findDarkVal = localStorage.getItem("ironCodeDarkness");
    const isDarkness:boolean = findDarkVal === null ? false: (findDarkVal === 'true');
    */
   const isDarkness = true;
    setIsDark(isDarkness)
    if (isDarkness) {
      toggleElements();
      toggleHTML();
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);