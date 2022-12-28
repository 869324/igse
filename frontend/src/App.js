import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";
import User from "./Containers/User/user";
import Login from "./Containers/Login/login";
import Signup from "./Containers/Signup/signup";
import { useSelector } from "react-redux";
import Modal from "./Components/Modal/modal";
import InfoModal from "./Components/InfoModal/infoModal";

function App() {
  const alertState = useSelector((state) => state.alert);

  return (
    <div>
      {alertState.alert && (
        <Modal>
          <InfoModal {...alertState} />
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
