import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "pages/Home";
import Splash from "pages/Splash";
import Signin from "pages/auth/Signin";
import ForgotPassword from "pages/auth/ForgotPassword";

const Router: FC = () => {
  return (
    <BrowserRouter>
      <div className="container max-w-3xl h-screen mx-auto">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/splash" element={<Splash />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Router;
