import "./App.css";
import Layout from "./components/Layout";
import Login from "./components/Forms/Login";
import SignUp from "./components/Forms/Signup";

import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Layout />
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
      </Routes>
    </div>
  );
}

export default App;



