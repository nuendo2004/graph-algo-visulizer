import "./App.css";
import React from "react";
import Window from "./components/Window";
import { Provider } from "react-redux";
import Store from "./store";
import Config from "./components/Config";
import Algos from "./hooks/useBFS";

function App() {
  return (
    <Provider store={Store}>
      <div className="App">
        <Window />
        {/* <Algos /> */}
      </div>
      <Config />
    </Provider>
  );
}

export default App;
