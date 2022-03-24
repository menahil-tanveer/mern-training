import "./App.css";
import Router from "./routes/Router";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
const store = configureStore();
function App() {
  return (
    <Provider store={store}>
      <div
        style={{
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
        }}
        className="App"
      >
        <Router />
      </div>
    </Provider>
  );
}

export default App;
