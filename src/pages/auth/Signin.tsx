import { FC, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import jwt_decode from "jwt-decode";

import Header from "../../components/Header";

import closeIcon from "../../assets/icons/close_ico.svg";
import warningImage from "../../assets/icons/warning_img.svg";

const Signin: FC = () => {
  const [showWrongPasswordModal, setShowWrongPasswordModal] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authErrorMsg, setAuthErrorMsg] = useState("");

  const navigate = useNavigate();

  const loginHandler = async () => {
    const data = { currentEmail, currentPassword };
    await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.auth) {
          const decoded_token = jwt_decode(data.token);
          localStorage.setItem("authToken", JSON.stringify(decoded_token));

          // start browsing the project
          navigate("/home");
        } else {
          setAuthErrorMsg(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        // handle error
      });
  };

  // Hook for User Authentication
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      // Redirect to login page if token is not present
      navigate("/");
    } else {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div className="relative">
      {/* Main Authentication */}
      <div className="h-screen flex flex-col justify-between">
        <Header title="Sign In" />
        <div className="grow font-sans flex flex-col justify-between px-6">
          {/* Logo */}
          <div className="grow flex flex-col justify-center">
            <div className="font-bold text-center text-5xl text-[#64B3EC]">
              福氣堂
            </div>
          </div>
          <div className="grow flex flex-col justify-center">
            <div className="text-[12px] text-600 text-[#64B3EC]">Email</div>
            <div className="pt-2">
              <input
                className="w-full focus:outline-none h-[50px] border border-[#25617B] rounded-[10px] p-2"
                onChange={(ev: any) => {
                  setCurrentEmail(ev.target.value);
                }}
              />
            </div>
            <div className="text-[12px] text-600 text-[#64B3EC] pt-2">
              Password
            </div>
            <div className="pt-2 relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full focus:outline-none h-[50px] border border-[#25617B] rounded-[10px] p-2 pr-10"
                onChange={(ev: any) => {
                  setCurrentPassword(ev.target.value);
                }}
              />
              <div
                className="absolute right-3 top-[26px] text-[10px] text-[#25747B] hover:cursor-pointer"
                tabIndex={0}
                onFocus={() => setShowPassword(true)}
                onBlur={() => setShowPassword(false)}
              >
                Show
              </div>
            </div>
            {/* AUthentication Error message */}
            <div className="py-2 text-[#FF0000] text-xs">{authErrorMsg}</div>
          </div>
          <div className="grow flex flex-col justify-center">
            <div
              className="rounded-[10px] bg-[#64B3EC] hover:bg-[#D3E7F6] text-white text-center text-sm p-3"
              onClick={() => loginHandler()}
            >
              Log In
            </div>
            <div
              className="text-[10px] text-black p-3 text-center hover:bg-[#D3E7F6] rounded-[10px] mt-2"
              onClick={() => navigate("/forgotpassword")}
            >
              Forgot Password
            </div>
          </div>
        </div>
      </div>
      {/* Wrong Password Modal */}
      <div
        className={
          "absolute w-full h-screen bg-[#0C2036] bg-opacity-50 top-0 flex flex-col justify-center " +
          (showWrongPasswordModal ? "" : "hidden")
        }
      >
        <div className="bg-white rounded-2xl h-2/3 mx-6 relative px-3 pt-2 pb-5 flex flex-col">
          <div
            className="flex w-5 h-5 border border-[#26777E] rounded-md justify-center"
            onClick={() => setShowWrongPasswordModal(false)}
          >
            <img src={closeIcon} className="max-w-none" />
          </div>
          <div className="grow flex flex-col justify-between">
            <div className="text-center text-[#0C2036] text-sm font-bold">
              Wrong Password!
            </div>
            <div>
              <div className="flex justify-center">
                <img src={warningImage} className="max-w-none" />
              </div>
              <div className="text-xs text-black text-opacity-70 text-center ">
                密碼錯誤，請重新輸入或Forgot Password。
              </div>
            </div>
            <div
              className="rounded-lg bg-[#64B3EC] hover:bg-[#6D7D8B] text-sm text-white text-center p-3"
              onClick={() => setShowWrongPasswordModal(false)}
            >
              Okay
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
