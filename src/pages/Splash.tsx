import { FC, useEffect } from "react";

import { useNavigate } from "react-router-dom";

const Splash: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      navigate("/signin");
    }, 2000);

    return () => clearTimeout(redirectTimeout);
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="grow font-bold font-sans flex flex-col justify-center">
        <div className="text-center text-5xl text-[#64B3EC]">福氣堂</div>
        <div className="text-center text-lg text-[#6D7D8B] tracking-[1rem] pt-2 pl-4">
          忠醫診所
        </div>
      </div>
      <div className="text-sm tracking-[.75rem] pb-6 text-center font-mont">
        懸壺濟世
      </div>
    </div>
  );
};

export default Splash;
