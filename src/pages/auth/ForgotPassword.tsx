import { FC, useState } from "react";

import { useNavigate } from "react-router-dom";

import { BACKEND_URL } from "../../constants";

import Header from "../../components/Header";

import closeIcon from "../../assets/close_ico.svg";
import warningImage from "../../assets/warning_img.svg";

const ForgotPassword: FC = () => {
  const navigate = useNavigate();

  const [showWrongPasswordModal, setShowWrongPasswordModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const sendResetLinkHandler = async () => {
    const data = { resetEmail };
    await fetch(BACKEND_URL + "/resetpassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data -> ", data);
        if (data.status)
          setStatusMessage(
            "Password reset email sent! Check your email to verify it!"
          );
        else setStatusMessage(data.message);
      })
      .catch((error) => {
        console.error(error);
        // handle error
        setStatusMessage("Password reset email sent failed!");
      });
    // navigate("/resetpassword");
  };

  return (
    <div className="relative">
      <div className="h-screen flex flex-col justify-between">
        <Header title="Forgot Password" />
        <div className="grow font-sans flex flex-col justify-between px-6">
          {/* Logo */}
          <div className="grow flex flex-col justify-center">
            <div className="font-bold text-center text-5xl text-[#64B3EC]">
              福氣堂
            </div>
            <div className="font-bold text-center text-lg text-[#0C2036] pt-6 pl-4">
              請輸入Email重設密碼
            </div>
            <div className="font-bold text-center text-sm text-[#6D7D8B] pt-4 pl-4">
              請於 30 分鐘內按Email指示重設密碼
            </div>
          </div>
          <div className="grow flex flex-col justify-center">
            <div className="text-[12px] text-600 text-[#64B3EC]">Email</div>
            <div className="pt-2">
              <input
                className="w-full focus:outline-none h-[50px] border border-[#25617B] rounded-[10px] p-2"
                value={resetEmail}
                onChange={(ev) => setResetEmail(ev.target.value)}
              />
            </div>
            {statusMessage != "" ? (
              <div className="py-1 text-red-500">{statusMessage}</div>
            ) : (
              <></>
            )}
            <div
              className="rounded-[10px] bg-[#64B3EC] hover:bg-[#D3E7F6] text-white text-center text-sm p-3 mt-6"
              onClick={() => sendResetLinkHandler()}
            >
              Send Reset Link
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
