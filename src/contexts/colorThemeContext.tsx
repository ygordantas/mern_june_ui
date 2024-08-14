import { createContext, useState } from "react";

interface ColorThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

export const ColorThemeContext = createContext<ColorThemeContextType>({
  theme: "",
  setTheme: () => {},
});

const ColorThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : ""
  );

  document.querySelector("body")?.setAttribute("data-theme", theme);

  return (
    <ColorThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ColorThemeContext.Provider>
  );
};

export default ColorThemeProvider;
