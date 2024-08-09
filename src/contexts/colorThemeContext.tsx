import { createContext, useState } from "react";

interface ColorThemeContextType {
  theme: string;
}

export const ColorThemeContext = createContext<ColorThemeContextType>({
  theme: "",
});

const ColorThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme] = useState<string>(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : ""
  );

  document.querySelector("body")?.setAttribute("data-theme", theme);

  return (
    <ColorThemeContext.Provider value={{ theme }}>
      {children}
    </ColorThemeContext.Provider>
  );
};

export default ColorThemeProvider;
