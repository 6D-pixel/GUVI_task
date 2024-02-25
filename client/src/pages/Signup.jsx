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
  const navigate = useNavigate();
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
        />

        <InputBox
          onChange={(e) => {
            setEmail(e.target.value);
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
        <InputBox
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          label="Confirm Password"
        />
        <div className="pt-4">
          <Button
            onClick={async () => {
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
