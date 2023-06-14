import { FC, useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import jwt_decode from "jwt-decode";

import { BACKEND_URL } from "../../constants";

import Header from "../../components/Header";

import closeIcon from "../../assets/close_ico.svg";
import warningImage from "../../assets/warning_img.svg";

interface RouteParams {
  [key: string]: string | undefined;
}

const ResetPassword: FC = () => {
  const navigate = useNavigate();

  const token = useParams<{ token?: string }>().token;

  const [showWrongPasswordModal, setShowWrongPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");

  const updatePassword = async () => {
    const email = updatedEmail;
    const password = currentPassword;
    const data = { email, password };
    await fetch(BACKEND_URL + "/updatemailpassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Update Password Successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Updating Password Error : ", error);
        // handle error
      });
  };

  const resetPasswordHandler = () => {
    if (currentPassword != confirmedPassword)
      setErrorMessage("Password doesn't match! Please re-try again!");
    else {
      if (currentPassword == "")
        setErrorMessage("Password is empty!");
      else updatePassword();
    }
  };

  useEffect(() => {
    if (token) {
      const decoded_token: { email?: string } = jwt_decode(token);
      if (!decoded_token || !decoded_token.email) navigate("/");
      else setUpdatedEmail(decoded_token ? decoded_token.email : "");
    } 
  }, [token])

  return (
    <div className="relative">
      <div className="h-screen flex flex-col justify-between">
        <Header title="Reset Password" />
        <div className="grow font-sans flex flex-col justify-between px-6">
          {/* Logo */}
          <div className="grow flex flex-col justify-center">
            <div className="font-bold text-center text-5xl text-[#64B3EC]">
              福氣堂
            </div>
            <div className="font-bold text-center text-lg text-[#0C2036] pt-10 pl-4">
              請重設密碼
            </div>
            <div className="font-bold text-center text-sm text-[#6D7D8B] pt-2 pl-4">
              請於 30 分鐘內重設密碼
            </div>
          </div>
          <div className="grow flex flex-col justify-center">
            <div>
              <div className="text-[12px] text-600 text-[#64B3EC]">
                New password
              </div>
              <div className="pt-2">
                <input
                  type="password"
                  className="w-full focus:outline-none h-[50px] border border-[#25617B] rounded-[10px] p-2"
                  value={currentPassword}
                  onChange={(ev) => setCurrentPassword(ev.target.value)}
                />
              </div>
            </div>
            <div className="pt-2">
              <div className="text-[12px] text-600 text-[#64B3EC]">
                Confirmed new password
              </div>
              <div className="pt-2">
                <input
                  type="password"
                  className="w-full focus:outline-none h-[50px] border border-[#25617B] rounded-[10px] p-2"
                  value={confirmedPassword}
                  onChange={(ev) => setConfirmedPassword(ev.target.value)}
                />
              </div>
            </div>
            {
              errorMessage != "" ?
                <div className="py-2 text-red-500">{errorMessage}</div>
              : <></>
            }
            <div
              className="rounded-[10px] bg-[#64B3EC] hover:bg-[#D3E7F6] text-white text-center text-sm p-3 mt-6"
              onClick={() => resetPasswordHandler()}
            >
              Reset Password
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
