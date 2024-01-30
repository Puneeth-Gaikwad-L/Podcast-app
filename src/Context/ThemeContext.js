import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.body.setAttribute("data-theme", theme);
    }, [theme])

    return <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
    </ThemeContext.Provider>
}