import { FC, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import Theme from "../../assets/color";

import Avatar1 from "../../assets/avatar1.svg";
import DashBack from "../../assets/img/alert_board.png";
import editIcon from "../../assets/icons/edit_ico1.svg";
import shareIcon from "../../assets/icons/share_ico.svg";
import printIcon from "../../assets/icons/print_ico.svg";

import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import PatientResultItem from "../../components/patient/PatientResultItem";

const PreviewMedicinePage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // load requested data
  const context = location.state.context;
  const files = location.state.files;

  // Hook for User Authentication
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      // Redirect to login page if token is not present
      navigate("/");
    } else {
    }
  }, [navigate]);

  console.log("preview -> ", context);

  const getOnlyDate = (dateString: any) => {
    const date = new Date(dateString);

    const day = ("0" + date.getUTCDate()).slice(-2); // using getUTCDate to avoid timezone issues
    const month = ("0" + (date.getUTCMonth() + 1)).slice(-2); // using getUTCMonth to avoid timezone issues
    const year = date.getUTCFullYear(); // using getUTCFullYear to avoid timezone issues

    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  };

  const handleUpload = async (file: any) => {
    console.log("handleUpload");
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("cardid", context.cardid);

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Album Image Uploaded Successfully");
      } else {
        console.error("Failed to upload Album Image");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateCheckPatientHandler = async () => {
    // Update Check Patient Information

    // -- load album images
    files.map((idx: File) => handleUpload(idx));

    // -- update extra check patient data
    const data = { context };
    await fetch("http://localhost:8000/updatecheckpatient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Update Check Patient Detail successfully!");
      })
      .catch((error) => {
        console.error(error);
        // handle error
      });

    // navigate("/admin");
  };

  return (
    <div className="relative">
      <div className="h-screen overflow-y-auto bg-[#FAFCFF]">
        {/* Header */}
        <Header title="到診證明書" />
        {/* Main Page */}
        <div className="m-4 p-3 mb-[160px] rounded-lg shadow-lg">
          {/* Title */}
          <div className="text-center">
            <div
              className="font-bold font-sans text-5xl"
              style={{ color: Theme.COLOR_DEFAULT }}
            >
              福氣堂
            </div>
            <div
              className="font-bold text-lg pt-6"
              style={{ color: Theme.COLOR_DEFAULT }}
            >
              <span className="border-b border-b-[#64B3EC]">處方</span>
            </div>
          </div>
          {/* User Info */}
          <div>
            <div className="text-sm p-2 mt-3 pb-5 border-b border-b-[#64B3EC]">
              <div className="py-1 flex justify-between">
                <div>
                  <span style={{ color: Theme.COLOR_DEFAULT }}>診症日期:</span>
                  <span className="pl-2 text-black text-opacity-60">
                    {getOnlyDate(context.date)}
                  </span>
                </div>
                <div
                  onClick={() =>
                    navigate("/checkpatient", { state: { context: context } })
                  }
                >
                  <img src={editIcon} className="max-w-none" />
                </div>
              </div>
              <div className="py-1">
                <span style={{ color: Theme.COLOR_DEFAULT }}>病人姓名:</span>
                <span className="pl-2 text-black text-opacity-60">
                  {context.name}
                </span>
              </div>
              <div className="py-1">
                <div style={{ color: Theme.COLOR_DEFAULT }}>診斷:</div>
                <div className="pl-2 h-48 text-black text-opacity-60"></div>
                <div className="text-center text-xs text-[#666666]">
                  <span className="px-4">日藥/每日</span>
                  <span className="px-4">次/共</span>
                  <span className="px-4">包</span>
                </div>
                <div className="text-xs text-[#666666] pt-3">
                  <span>餐</span>
                  <span className="pl-3">服</span>
                </div>
              </div>
              {/* Diagnosis */}
              <div className="py-1 pt-3 text-black text-opacity-60">
                <span>醫師編號:</span>
                <span className="pl-2">{context.doctorid}</span>
              </div>
            </div>
            <div
              className="p-3 text-xs flex flex-row justify-between"
              style={{ color: Theme.COLOR_DEFAULT }}
            >
              <div>地址: 油麻地彌敦道546號旺角大樓5D</div>
              <div>電話: 2788 2951</div>
            </div>
          </div>
        </div>
        <div className="absolute w-full px-5 py-3 bottom-[80px]">
          <div
            className="p-3 text-center text-white rounded-xl"
            style={{ backgroundColor: Theme.COLOR_DEFAULT }}
            onClick={() => updateCheckPatientHandler()}
          >
            Confirm
          </div>
        </div>
        {/* NavBar */}
        <NavBar status={4} />
      </div>
    </div>
  );
};

export default PreviewMedicinePage;
