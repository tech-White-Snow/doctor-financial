import { FC, useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import Theme from "../../assets/color";

import Avatar1 from "../../assets/avatar1.svg";
import DashBack from "../../assets/img/alert_board.png";
import editIcon from "../../assets/icons/edit_ico1.svg";
import shareIcon from "../../assets/icons/share_ico.svg";
import printIcon from "../../assets/icons/print_ico.svg";
import checkIcon from "../../assets/icons/check_ico.svg";

import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import PatientResultItem from "../../components/patient/PatientResultItem";

interface MedicineType {
  name: string;
  amount: number;
}

interface CompanyInfoType {
  logo: string;
  address: string;
  tel: string;
}

const RecipePage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const _context = location.state.context;

  const [isFollowedUp, setIsFollowedUp] = useState(true);

  const [context, setContext] = useState({});

  const [curName, setCurName] = useState("");
  const [curDiagnosis, setCurDiagnosis] = useState("");
  const [curDoctorName, setCurDoctorName] = useState("");
  const [curDoctorID, setCurDoctorID] = useState("");
  const [curMedicines, setCurMedicines] = useState<MedicineType[]>([]);
  const [chunkMedicines, setChunkMedicines] = useState<MedicineType[][]>([]);

  const chunkArray = (arr: MedicineType[], chunkSize: number) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const getRecipeData = async () => {
    const cardid = _context.cardid;
    const data = { cardid };
    await fetch("http://localhost:8000/getptcardsbyid", {
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
          setContext(data.data[0]);
          const temp = data.data[0];
          setCurName(temp.name);
          setCurDiagnosis(temp.diagnosis);
          setCurDoctorName(temp.doctor);
          setCurDoctorID(temp.doctorid);
          setCurMedicines(temp.medicines ? JSON.parse(temp.medicines) : []);
          setChunkMedicines(
            temp.medicines ? chunkArray(JSON.parse(temp.medicines), 3) : []
          );
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
    await fetch("http://localhost:8000/getcompanyinfo", {
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
      // get patient data
      getRecipeData();
      // get company profile
      getCompanyInfo();
    }
  }, [navigate]);

  const getOnlyDate1 = (dateString: any) => {
    const date = new Date(dateString);

    const formattedDate = `${("0" + (date.getMonth() + 1)).slice(-2)}-${(
      "0" + date.getDate()
    ).slice(-2)}-${date.getFullYear()}`;

    return formattedDate;
  };

  const printHandler = () => {
    window.print();
  };

  return (
    <div className="relative">
      <div className="h-screen overflow-y-auto bg-[#FAFCFF]">
        {/* Header */}
        <Header title="到診證明書" />
        {/* Main Page */}
        <div className="m-4 p-3 rounded-lg shadow-lg bg-white">
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
              <span className="border-b border-b-[#64B3EC]">處方</span>
            </div>
          </div>
          {/* User Info */}
          <div>
            <div className="text-sm p-2 mt-3 pb-5 border-b border-b-[#64B3EC]">
              <div className="py-1">
                <span style={{ color: Theme.COLOR_DEFAULT }}>診症日期:</span>
                <span className="pl-2 text-black text-opacity-60">
                  {getOnlyDate1(_context.date)}
                </span>
              </div>
              <div className="py-1">
                <span style={{ color: Theme.COLOR_DEFAULT }}>病人姓名:</span>
                <span className="pl-2 text-black text-opacity-60">
                  {curName}
                </span>
              </div>
              <div className="py-1">
                <div style={{ color: Theme.COLOR_DEFAULT }}>診斷:</div>
                <div className="p-2 h-48 text-black text-xs">
                  <table className="table w-11/12 mx-auto border-collapse border border-black">
                    <tbody>
                      {chunkMedicines.map((chunk, i) => (
                        <tr key={i}>
                          {chunk.map((medicine, j) => (
                            <td
                              key={j}
                              className="border border-black p-1 text-center w-1/3"
                            >
                              {medicine.name} {medicine.amount}g
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
              <div
                className="py-1 pt-3 text-black text-opacity-60"
                style={{ color: Theme.COLOR_DEFAULT }}
              >
                <span>主診醫師：</span>
                <span>{curDoctorName}</span>
              </div>
              <div className="pb-1 text-black text-opacity-60 flex flex-row justify-between">
                <div>
                  <span>醫師編號:</span>
                  <span className="pl-2">{curDoctorID}</span>
                </div>
                {/* <div className="flex flex-row">
                  <div
                    className="relative w-[18px] h-[18px] hover:cursor-pointer"
                    style={{
                      background: !isFollowedUp ? Theme.COLOR_DEFAULT : "",
                    }}
                    onClick={() => setIsFollowedUp(!isFollowedUp)}
                  >
                    {isFollowedUp ? (
                      <img
                        src={checkIcon}
                        className="absolute top-0 left-0 w-[18px] h-[18px]"
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                  <div
                    className="text-[13px] pl-2"
                    style={{ color: Theme.COLOR_DEFAULT }}
                  >
                    需要覆診
                  </div>
                </div> */}
              </div>
            </div>
            <div
              className="p-3 text-xs flex justify-between"
              style={{ color: Theme.COLOR_DEFAULT }}
            >
              <div>地址: {companyInfo.address}</div>
              <div>電話: {companyInfo.tel}</div>
            </div>
          </div>
        </div>
        {/* Assistant Tools */}
        <div className="mb-[70px] p-4 flex flex-row justify-end">
          <div
            className="p-3"
            onClick={() =>
              navigate("/checkpatient", { state: { context: context } })
            }
          >
            <img src={editIcon} className="max-w-none" />
          </div>
          <div className="p-3" onClick={() => console.log("Share")}>
            <img src={shareIcon} className="max-w-none" />
          </div>
          <div className="p-3" onClick={() => printHandler()}>
            <img src={printIcon} className="max-w-none" />
          </div>
        </div>
        {/* NavBar */}
        <NavBar status={4} />
      </div>
    </div>
  );
};

export default RecipePage;
