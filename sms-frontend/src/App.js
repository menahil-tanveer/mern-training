import "./App.css";
import Router from "./routes/Router";
function App() {
  return (
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
  );
}

export default App;
