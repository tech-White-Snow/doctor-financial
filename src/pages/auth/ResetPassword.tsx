import { FC, useState } from "react";

import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";

import closeIcon from "../../assets/close_ico.svg";
import warningImage from "../../assets/warning_img.svg";

const ResetPassword: FC = () => {
  const [showWrongPasswordModal, setShowWrongPasswordModal] = useState(false);

  const navigate = useNavigate();

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
                />
              </div>
            </div>
            <div
              className="rounded-[10px] bg-[#64B3EC] hover:bg-[#D3E7F6] text-white text-center text-sm p-3 mt-6"
              onClick={() => console.log("Reset Password clicked!")}
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
