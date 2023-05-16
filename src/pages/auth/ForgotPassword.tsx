import { FC, useState } from "react";

import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";

import closeIcon from "../../assets/close_ico.svg";
import warningImage from "../../assets/warning_img.svg";

const ForgotPassword: FC = () => {
  const [showWrongPasswordModal, setShowWrongPasswordModal] = useState(false);

  const navigate = useNavigate();

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
            <div className="font-bold text-center text-lg text-[#6D7D8B] tracking-[1rem] pt-2 pl-4">
              忠醫診所
            </div>
            <div className="font-mont font-bold text-center text-lg text-[#0C2036] pt-6 pl-4">
              請輸入Email重設密碼
            </div>
            <div className="font-bold text-center text-sm text-[#6D7D8B] pt-4 pl-4">
              請於 30 分鐘內按Email指示重設密碼
            </div>
          </div>
          <div className="grow flex flex-col justify-center">
            <div className="text-[12px] font-monto text-600 text-[#64B3EC]">
              Email
            </div>
            <div className="pt-2">
              <input className="w-full focus:outline-none h-[50px] border border-[#25617B] rounded-[10px] p-2" />
            </div>
            <div
              className="rounded-[10px] bg-[#64B3EC] hover:bg-[#D3E7F6] text-white text-center text-sm p-3 mt-6"
              onClick={() => navigate("/resetpassword")}
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
