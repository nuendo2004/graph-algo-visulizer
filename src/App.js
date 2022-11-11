import "./App.css";
import Window from "./components/Window";
import { Provider } from "react-redux";
import Store from "./store";
import Config from "./components/Config";

function App() {
  return (
    <Provider store={Store}>
      <div className="App">
        <Window />
      </div>
      <Config />
    </Provider>
  );
}

export default App;
