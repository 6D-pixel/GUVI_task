import Button from "./Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "./Toast";

const Logout = () => {
  const navigate = useNavigate();
  const [showTost, setShowTost] = useState(false);
  function handleLogout() {
    setShowTost(true);
    // Navigate to the login
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }
  return (
    <>
      {showTost && <Toast message="loged out" />}
      <Button label="Logout" onClick={handleLogout} />
    </>
  );
};

export default Logout;
