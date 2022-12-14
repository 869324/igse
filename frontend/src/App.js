import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";
import User from "./Containers/User/user";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"user"} />} />
      <Route path="/user" element={<User />} />
    </Routes>
  );
}

export default App;
