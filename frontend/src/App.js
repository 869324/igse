import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Containers/Login/login";
import Signup from "./Containers/Signup/signup";
import { useSelector } from "react-redux";
import Modal from "./Components/Modal/modal";
import InfoModal from "./Components/InfoModal/infoModal";
import UserRouter from "./Containers";

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
        <Route path="/" element={<Navigate to={"igse"} />} />
        <Route path="/igse/*" element={<UserRouter />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
