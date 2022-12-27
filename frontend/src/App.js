import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";
import User from "./Containers/User/user";
import Login from "./Containers/Login/login";
import Signup from "./Containers/Signup/signup";
import { useSelector } from "react-redux";
import Modal from "./Components/Modal/modal";
import ErrorModal from "./Components/ErrorModal/errorModal";

function App() {
  const { alert, message } = useSelector((state) => state.alert);

  return (
    <div>
      {alert && (
        <Modal>
          <ErrorModal alert={alert} message={message} />
        </Modal>
      )}

      <Routes>
        <Route path="/" element={<Navigate to={"user"} />} />
        <Route path="/user/*" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
