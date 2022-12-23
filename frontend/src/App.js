import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";
import User from "./Containers/User/user";
import Login from "./Containers/Login/login";
import Signup from "./Containers/Signup/signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"user"} />} />
      <Route path="/user" element={<User />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
