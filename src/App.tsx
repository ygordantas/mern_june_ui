import { useState } from "react";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

const App = () => {
  const [mode, setMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : ""
  );

  return (
    <div data-theme={mode}>
      <button
        onClick={() => {
          setMode(mode === "dark" ? "" : "dark");
        }}
      >
        Change mode
      </button>
      <SignUpPage />
    </div>
  );
};

export default App;
