import React, { useEffect, useState } from "react";
import Heading from "../component/Heading";
import Button from "../component/Button";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
const Profile = () => {
  const [profileData, setProfileData] = useState({
    age: 0,
    gender: "",
    dob: "",
    mobile: "",
  });
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/user/userData",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
      setProfileData({
        age: response.data.age,
        gender: response.data.gender,
        dob: response.data.dob,
        mobile: response.data.mobile,
      });
    };
    fetchUser();
  }, []);

  return (
    <section className="bg-green-500 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-md p-6 w-full max-w-md">
        <Heading label="Profile" />
        {/* Profile details */}

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-2">
            Email:
          </label>
          <p className="text-gray-800">{email}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-2">
            Age:
          </label>
          <input
            type="number"
            value={profileData.age}
            onChange={(e) =>
              setProfileData({ ...profileData, age: e.target.value })
            }
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-2">
            Gender:
          </label>
          <input
            value={profileData.gender}
            onChange={(e) =>
              setProfileData({ ...profileData, gender: e.target.value })
            }
            className="border border-gray-300 rounded-md p-2 w-full"
          ></input>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-2">
            Date of Birth:
          </label>
          <input
            type="date"
            value={profileData.dob}
            onChange={(e) =>
              setProfileData({ ...profileData, dob: e.target.value })
            }
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-2">
            Mobile Number:
          </label>
          <input
            type="tel"
            pattern="[0-9]{10}"
            value={profileData.mobile}
            onChange={(e) =>
              setProfileData({ ...profileData, mobile: e.target.value })
            }
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        {/* Update button */}
        <Button
          label="Update"
          onClick={async () => {
            try {
              const response = await axios.put(
                "http://localhost:3000/api/v1/user/update",
                {profileData},
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );
              console.log("Update Response:", response.data);
              // Handle success, update UI, etc.
            } catch (error) {
              console.error("Error updating user:", error);
              // Handle error, show error message, etc.
            }
          }}
        />
      </div>
    </section>
  );
};

export default Profile;
