import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "pages/Home";
import Splash from "pages/Splash";
import Signin from "pages/auth/Signin";
import ResetPassword from "pages/auth/ResetPassword";
import ForgotPassword from "pages/auth/ForgotPassword";

import SearchPage from "pages/SearchPage";
import SearchResultPage from "pages/SearchResultPage";
import ViewAccountPage from "pages/ViewAccountPage";
import EditAccountPage from "pages/EditAccountPage";
import PastHistoryPage from "pages/PastHistoryPage";
import AdminPage from "pages/AdminPage";

import PatientList from "pages/patient/PatientList";
import PatientDetailPage from "pages/patient/PatientDetailPage";
import PatientAlbumPage from "pages/patient/PatientAlbumPage";
import PrescriptionPage from "pages/patient/PrescriptionPage";
import ReceiptPage from "pages/patient/ReceiptPage";
import RecipePage from "pages/patient/RecipePage";
import CheckPatientPage from "pages/patient/CheckPatientPage";
import UpdateAlbumPage from "pages/patient/UpdateAlbumPage";
import PreviewMedicinePage from "pages/patient/PreviewMedicinePage";
import PatientRecordPage from "pages/patient/PatientRecordPage";
import PastPatientRecordedPage from "pages/patient/PastPatientRecordedPage";

import ScheduleAppointment from "pages/appointment/ScheduleAppointment";
import AddAppointment from "pages/appointment/AddAppointment";
import AddAppointmentPatient from "pages/appointment/AddAppointmentPatient";

const Router: FC = () => {
  return (
    <BrowserRouter>
      <div className="container max-w-3xl h-screen mx-auto">
        <Routes>
          {/* Authentication */}
          {/* <Route path="/" element={<Splash />} /> */}
          <Route path="/" element={<Signin />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          {/* Main Page */}
          <Route path="/viewaccount" element={<ViewAccountPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/searchresult" element={<SearchResultPage />} />
          <Route path="/account" element={<EditAccountPage />} />
          <Route path="/pasthistory" element={<PastHistoryPage />} />
          <Route path="/admin" element={<AdminPage />} />
          {/* Appointment */}
          <Route
            path="/scheduleappointment"
            element={<ScheduleAppointment />}
          />
          <Route path="/addappointment" element={<AddAppointment />} />
          <Route
            path="/addappointmentpatient"
            element={<AddAppointmentPatient />}
          />
          {/* Patient Related Page */}
          <Route path="/patient" element={<PatientList />} />
          <Route path="/patientdetail" element={<PatientDetailPage />} />
          <Route path="/patientalbum" element={<PatientAlbumPage />} />
          <Route path="/prescription" element={<PrescriptionPage />} />
          <Route path="/receipt" element={<ReceiptPage />} />
          <Route path="/recipe" element={<RecipePage />} />
          <Route path="/checkpatient" element={<CheckPatientPage />} />
          <Route path="/editalbum" element={<UpdateAlbumPage />} />
          {/* <Route path="/previewmedicine" element={<PreviewMedicinePage />} /> */}
          <Route path="/patientrecord" element={<PatientRecordPage />} />
          <Route
            path="/pastpatientrecord"
            element={<PastPatientRecordedPage />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Router;
