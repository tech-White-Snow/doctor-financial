import { FC, useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import Theme from "../../assets/color";
import { BACKEND_URL } from "../../constants";

import Avatar1 from "../../assets/avatar1.svg";
import DashBack from "../../assets/img/alert_board.png";
import editIcon from "../../assets/icons/edit_ico1.svg";
import shareIcon from "../../assets/icons/share_ico.svg";
import printIcon from "../../assets/icons/print_ico.svg";

import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import PatientResultItem from "../../components/patient/PatientResultItem";

interface CompanyInfoType {
  logo: string;
  address: string;
  tel: string;
}

const PrescriptionPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const context = location.state.context;

  const getOnlyDate1 = (dateString: any) => {
    const date = new Date(dateString);

    const formattedDate = `${("0" + (date.getMonth() + 1)).slice(-2)}-${(
      "0" + date.getDate()
    ).slice(-2)}-${date.getFullYear()}`;

    return formattedDate;
  };

  const [isEditMode, setIsEditMode] = useState(false);
  const [curDate, setCurDate] = useState(getOnlyDate1(context.date));
  const [curName, setCurName] = useState("");
  const [curDiagnosis, setCurDiagnosis] = useState("");
  const [curToll, setCurToll] = useState(0);
  const [curDoctorID, setCurDoctorID] = useState("");
  const [curPrescription, setCurPrescription] = useState("");

  const getPrescriptionData = async () => {
    const cardid = context.cardid;
    const data = { cardid };
    await fetch(BACKEND_URL + "/getptcardsbyid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Get Patient Detail by ID successfully!");
        if (data.data.length > 0) {
          // update current receipt
          const temp = data.data[0];
          setCurName(temp.name);
          setCurDiagnosis(temp.diagnosis);
          setCurDoctorID(temp.doctorid);
          setCurPrescription(temp.prescription ? temp.prescription : "");
        }
      })
      .catch((error) => {
        console.error(error);
        // handle error
      });
  };

  const [companyInfo, setCompanyInfo] = useState<CompanyInfoType>({
    logo: "",
    address: "",
    tel: "",
  });

  const getCompanyInfo = async () => {
    //  get company info
    await fetch(BACKEND_URL + "/getcompanyinfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCompanyInfo(data.data[0]);
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
      // get prescription data
      getPrescriptionData();
      // get company profile
      getCompanyInfo();
    }
  }, [navigate]);

  // update prescription data
  const updatePrescriptionHandler = async () => {
    setIsEditMode(false);
    // update backend data
    const cardid = context.cardid;
    const data = { cardid, curPrescription };
    await fetch(BACKEND_URL + "/updateptcardprescription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Update Patient Card Prescription successfully!");
      })
      .catch((error) => {
        console.error(error);
        // handle error
      });
  };

  const printHandler = () => {
    window.print();
  };

  return (
    <div className="relative">
      <div className="relative h-screen overflow-y-auto">
        {/* Header */}
        <Header title="到診證明書" />
        {/* Main Page */}
        <div
          className={
            "m-4 p-3 shadow-lg rounded-lg " +
            (!isEditMode ? "mb-[80px]" : "mb-[160px]")
          }
        >
          {/* Title */}
          <div className="text-center">
            <div
              className="font-bold font-sans text-5xl"
              style={{ color: Theme.COLOR_DEFAULT }}
            >
              {companyInfo.logo}
            </div>
            <div
              className="font-bold text-lg pt-5"
              style={{ color: Theme.COLOR_DEFAULT }}
            >
              <span className="border-b border-b-[#64B3EC]">到診證明書</span>
            </div>
          </div>
          {/* User Info */}
          <div>
            <div className="text-sm p-2 mt-3 pb-5 border-b border-b-[#64B3EC]">
              <div className="py-1">
                <span style={{ color: Theme.COLOR_DEFAULT }}>診症日期:</span>
                <span className="pl-2 text-black text-opacity-60">
                  <input
                    type="text"
                    className="focus:outline-none"
                    value={curDate}
                    onChange={(ev) => setCurDate(ev.target.value)}
                    readOnly={!isEditMode}
                  />
                </span>
              </div>
              <div className="py-1">
                <span style={{ color: Theme.COLOR_DEFAULT }}>病人姓名:</span>
                <span className="pl-2 text-black text-opacity-60">
                  <input
                    type="text"
                    className="focus:outline-none"
                    value={curName}
                    onChange={(ev) => setCurName(ev.target.value)}
                    readOnly={!isEditMode}
                  />
                </span>
              </div>
              <div className="py-1">
                <span style={{ color: Theme.COLOR_DEFAULT }}>診斷:</span>
                <span className="pl-2 text-black text-opacity-60">
                  <input
                    type="text"
                    className="focus:outline-none"
                    value={curDiagnosis}
                    onChange={(ev) => setCurDiagnosis(ev.target.value)}
                    readOnly={!isEditMode}
                  />
                </span>
              </div>
              {/* Diagnosis */}
              <div style={{ color: Theme.COLOR_DEFAULT }}>
                <div className="grow py-4">
                  <textarea
                    className={
                      "w-full h-40 p-2 border-[#64B3EC] resize-none rounded-md focus:outline-none " +
                      (isEditMode ? "border" : "border-none")
                    }
                    style={{ color: Theme.COLOR_GRAY }}
                    readOnly={!isEditMode}
                    value={curPrescription}
                    onChange={(ev) => setCurPrescription(ev.target.value)}
                  />
                </div>
                <div className="h-32">醫師簽名：</div>
              </div>
              <div className="py-1 text-black text-opacity-60">
                <span>醫師編號:</span>
                <span className="pl-2">
                  <input
                    type="text"
                    className="focus:outline-none"
                    value={curDoctorID}
                    onChange={(ev) => setCurDoctorID(ev.target.value)}
                    readOnly={!isEditMode}
                  />
                </span>
              </div>
              {/* <div className="py-1 text-black text-opacity-60">
                <span style={{ color: Theme.COLOR_DEFAULT }}>簽發日期:</span>
                <span className="pl-2 text-black text-opacity-60">
                  <input
                    type="text"
                    className="focus:outline-none"
                    value={curDate}
                    onChange={(ev) => setCurDate(ev.target.value)}
                    readOnly={!isEditMode}
                  />
                </span>
              </div> */}
            </div>
            <div
              className="p-3 text-xs flex justify-between"
              style={{ color: Theme.COLOR_DEFAULT }}
            >
              <div>地址: {companyInfo.address}</div>
              <div>電話: {companyInfo.tel}</div>
            </div>
          </div>
          {/* Assistant Tools */}
          {!isEditMode ? (
            <div className="flex flex-row justify-end">
              <div className="p-3" onClick={() => setIsEditMode(true)}>
                <img src={editIcon} className="max-w-none" />
              </div>
              <div className="p-3" onClick={() => navigate("/receipt")}>
                <img src={shareIcon} className="max-w-none" />
              </div>
              <div className="p-3" onClick={() => printHandler()}>
                <img src={printIcon} className="max-w-none" />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      {isEditMode ? (
        <div className="absolute w-full px-3 bottom-[80px]">
          <div
            className="p-3 text-center text-white rounded-xl"
            style={{ backgroundColor: Theme.COLOR_DEFAULT }}
            onClick={() => updatePrescriptionHandler()}
          >
            Confirm
          </div>
        </div>
      ) : (
        <></>
      )}
      {/* NavBar */}
      <NavBar status={4} />
    </div>
  );
};

export default PrescriptionPage;
