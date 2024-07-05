import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";

//State component or Smart component
const App = () => {
  const [enteredName, setEnteredName] = useState("");

  return (
    <div>
      <h1> Hello, {enteredName}</h1>
      <input
        onChange={(e) => {
          setEnteredName(e.target.value);
        }}
        type="text"
        placeholder="Your name..."
      />
      <Footer />
    </div>
  );
};

export default App;
