import sun from "./sun.svg";
import moon from "./moon.svg";
import "./style.css";
import { useEffect, useRef } from "react";
import { useLocalStorage } from "../../utils/useLocalStorage";
import detectDarkMode from "../../utils/detectDarkMode";

const BtnDarkMode = () => {
    const btnRef = useRef(null);

    const [darkMode, setDarkMode] = useLocalStorage("darkMode", detectDarkMode());

    const toggleDarkMode = () => {
        setDarkMode((currentValue) => {
            return currentValue === "light" ? "dark" : "light";
        });
    };

    useEffect(() => {
        if (!btnRef.current) return;
        if (darkMode === "dark") {
            document.body.classList.add("dark");
            btnRef.current.classList.add("dark-mode-btn--active");
        } else {
            document.body.classList.remove("dark");
            btnRef.current.classList.remove("dark-mode-btn--active");
        }
    }, [darkMode]);

    useEffect(() => {
        // Если меняются системные настройки, меняем тему
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const handleChange = (event) => {
            const newColorScheme = event.matches ? "dark" : "light";
            setDarkMode(newColorScheme);
        };

        mediaQuery.addEventListener("change", handleChange);

        // Убираем слушатель при размонтировании компонента
        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, [setDarkMode]);

    return (
        <button ref={btnRef} className="dark-mode-btn" onClick={toggleDarkMode}>
            <img src={sun} alt="Light mode" className="dark-mode-btn__icon" />
            <img src={moon} alt="Dark mode" className="dark-mode-btn__icon" />
        </button>
    );
};

export default BtnDarkMode;
