import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";
import User from "./Containers/User/user";
import Login from "./Containers/Login/login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"user"} />} />
      <Route path="/user" element={<User />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
