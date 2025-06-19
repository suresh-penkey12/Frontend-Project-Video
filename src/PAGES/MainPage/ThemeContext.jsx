import React, { createContext, useEffect, useState } from 'react'
export const ThemeContext =createContext();
const ThemeProvider = ({children}) => {
  const savedTheme = localStorage.getItem('theme') || 'light';
    const[theme,setTheme]=useState(savedTheme);
     
    useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }, [theme]);

    const Updatetheme =()=>{
        setTheme((prevtheme) =>prevtheme==="light"?"dark":"light");
    }
  return (
    <ThemeContext.Provider value={{theme,Updatetheme}}>
       {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider