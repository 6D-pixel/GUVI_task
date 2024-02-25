import { useState } from "react";
import Heading from "../component/Heading";
import SubHeading from "../component/SubHeading";
import InputBox from "../component/InputBox";
import Button from "../component/Button";
import BottomWarning from "../component/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const validateInputs = () => {
    const errors = {};

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email address";
    }
    if (!password.trim()) {
      errors.password = "Password is required";
    }
    setErrors(errors);

    return Object.keys(errors).length === 0;
  };
  return (
    <section className="bg-green-400 h-screen flex justify-center items-center">
      <div className="w-80 text-center h-max bg-white rounded-lg p-2 px-4">
        <Heading label="Login" />
        <SubHeading label="Enter your credentials to access your account" />
        <InputBox
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          label="Email"
          placeholder="dinesh@gmail.com"
          error={errors.email}
        />
        <InputBox
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          label="Password"
          type="password"
          error={errors.password}
        />
        <div className="pt-4">
          <Button
            onClick={async () => {
              if (validateInputs()) {
                try {
                  const response = await axios.post(
                    "http://localhost:3000/api/v1/user/login",
                    {
                      email,
                      password,
                    }
                  );
                  localStorage.setItem("token", response.data.token);
                  navigate("/profile?email=" + email);
                } catch (err) {
                  if (err.response) {
                    alert(err.response.data.msg);
                  } else if (err.request) {
                    alert("No response received from the server");
                  } else {
                    alert("Error during request setup:", err.message);
                  }
                }
              }
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
