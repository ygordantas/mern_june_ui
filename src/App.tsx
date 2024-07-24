import { useState } from "react";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import classes from "./App.module.css";

const App = () => {
  const [theme, setTheme] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : ""
  );

  return (
    <div className={classes.container} data-theme={theme}>
      <button className={classes.toggle_button}
        onClick={() =>
          setTheme((currentTheme) => (currentTheme === "dark" ? "" : "dark"))
        }
      >
        Toggle mode
      </button>
      <SignUpPage />
    </div>
  );
};

export default App;
