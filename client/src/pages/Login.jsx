import { useState } from "react";
import Heading from "../component/Heading";
import SubHeading from "../component/SubHeading";
import InputBox from "../component/InputBox";
import Button from "../component/Button";
import BottomWarning from "../component/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <section className="bg-green-400 h-screen flex justify-center items-center">
      <div className="w-80 text-center h-max bg-white rounded-lg p-2 px-4">
        <Heading label="Login" />
        <SubHeading label="Enter your credentials to access your account" />
        <InputBox
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          label="Email"
          placeholder="dinesh@gmail.com"
        />
        <InputBox
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          label="Password"
        />
        <div className="pt-4">
          <Button
            onClick={async () => {
              const response = await axios.post(
                "http://localhost:3000/api/v1/user/login",
                {
                  email,
                  password,
                }
              );
              localStorage.setItem("token", response.data.token);
              navigate("/profile?email=" + email);
            }}
            label="Login"
          />
        </div>
        <BottomWarning
          label="Don't have an account?"
          buttonText="Sign Up"
          to="/signup"
        />
      </div>
    </section>
  );
};

export default Login;
