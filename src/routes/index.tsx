import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "pages/Home";
import Splash from "pages/Splash";
import Signin from "pages/auth/Signin";
import ForgotPassword from "pages/auth/ForgotPassword";

import SearchPage from "pages/SearchPage";
import SearchResultPage from "pages/SearchResultPage";
import EditAccountPage from "pages/EditAccountPage";
import PastHistoryPage from "pages/PastHistoryPage";

import PatientList from "pages/patient/PatientList";
import PatientDetailPage from "pages/patient/PatientDetailPage";
import PatientAlbumPage from "pages/patient/PatientAlbumPage";
import PrescriptionPage from "pages/patient/PrescriptionPage";
import ReceiptPage from "pages/patient/ReceiptPage";
import RecipePage from "pages/patient/RecipePage";

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
          <Route path="/search" element={<SearchPage />} />
          <Route path="/searchresult" element={<SearchResultPage />} />
          <Route path="/editprofile" element={<EditAccountPage />} />
          <Route path="/pasthistory" element={<PastHistoryPage />} />
          {/* Patient Related Page */}
          <Route path="/patient" element={<PatientList />} />
          <Route path="/patientdetail" element={<PatientDetailPage />} />
          <Route path="/patientalbum" element={<PatientAlbumPage />} />
          <Route path="/prescription" element={<PrescriptionPage />} />
          <Route path="/receipt" element={<ReceiptPage />} />
          <Route path="/recipe" element={<RecipePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Router;
