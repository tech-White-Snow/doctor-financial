import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "pages/Home";
import Splash from "pages/Splash";
import Signin from "pages/auth/Signin";
import ForgotPassword from "pages/auth/ForgotPassword";

import PatientList from "pages/PatientList";
import SearchPage from "pages/SearchPage";
import SearchResultPage from "pages/SearchResultPage";
import PatientDetailPage from "pages/PatientDetailPage";

const Router: FC = () => {
  return (
    <BrowserRouter>
      <div className="container max-w-3xl h-screen mx-auto">
        <Routes>
          {/* Authentication */}
          <Route path="/" element={<Splash />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          {/* Main Page */}
          <Route path="/home" element={<Home />} />
          <Route path="/patient" element={<PatientList />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/searchresult" element={<SearchResultPage />} />
          <Route path="/patientdetail" element={<PatientDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Router;
