import axios from "axios";
import { useState } from "react";
import BottomWarning from "../component/BottomWarning";
import Button from "../component/Button";
import Heading from "../component/Heading";
import InputBox from "../component/InputBox";
import SubHeading from "../component/SubHeading";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateInputs = () => {
    const errors = {};

    if (!Name.trim()) {
      errors.name = "Name is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email address";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };
  return (
    <section className="bg-green-400 h-screen flex justify-center items-center ">
      <div className="bg-white h-max w-80 text-center p-2 px-4 rounded-lg">
        <Heading label="Sign up" />
        <SubHeading label="Enter your information to create an account" />
        <InputBox
          onChange={(e) => {
            setName(e.target.value);
          }}
          label="Name"
          placeholder="dinesh"
          error={errors.name}
        />

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
        <InputBox
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          label="Confirm Password"
          type="password"
          error={errors.confirmPassword}
        />
        <div className="pt-4">
          <Button
            onClick={async () => {
              if (validateInputs()) {
                try {
                  const response = await axios.post(
                    "http://localhost:3000/api/v1/user/signup",
                    {
                      Name,
                      email,
                      password,
                    }
                  );
                  localStorage.setItem("token", response.data.token);
                  navigate("/login");
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
            label="Sign up"
          />
        </div>
        <BottomWarning
          label="Already have an account?"
          buttonText={"Login"}
          to={"/login"}
        />
      </div>
    </section>
  );
};

export default Signup;
