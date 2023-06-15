import { FC, useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import Theme from "../../assets/color";
import { BACKEND_URL } from "../../constants";

import editIcon from "../../assets/icons/edit_ico1.svg";
import editIcon2 from "../../assets/icons/edit_ico2.svg";
import downIcon from "../../assets/icons/down_ico.svg";
import prevvIcon from "../../assets/icons/prevv_ico.svg";
import nexttIcon from "../../assets/icons/nextt_ico.svg";
import blankImage from "../../assets/img/blank_image.svg";
import uploadIcon from "../../assets/icons/upload_ico.svg";
import cameraIcon from "../../assets/icons/camera_ico.svg";
import backwardIcon from "../../assets/icons/backward1_ico.svg";
import additemIcon from "../../assets/icons/additem_ico.svg";
import removeitemIcon from "../../assets/icons/removeitem_ico.svg";

import NavBar from "../../components/NavBar";
import Header from "../../components/Header";

interface MedicineInfo {
  name: string;
  amount: number;
}

interface CompanyInfoType {
  logo: string;
  address: string;
  tel: string;
}

const CheckPatient: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const _context = location.state.context;

  const [context, setContext] = useState(_context);

  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const [isPastHistoryEditMode, setIsPastHistoryEditMode] = useState(false);

  const [storeMedicineInfo, setStoreMedicineInfo] = useState<MedicineInfo[]>(
    _context.medicines ? JSON.parse(_context.medicines) : []
  );

  const chunkArray = (arr: MedicineInfo[], chunkSize: number) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  };
  
  const [curPastHistory, setCurPastHistory] = useState(_context.pasthistory ? _context.pasthistory : "");

  const [currentSelect, setCurrentSelect] = useState(0);

  type PatientHistoryType = {
    date: string;
    detail: string;
    id: string;
  };
  const [patientHistory, setPatientHistory] = useState<PatientHistoryType[]>(
    []
  );
  const [presentIllness, setPresentIllness] = useState("");
  const [originPatientHistory, setOriginPatientHistory] = useState<
    PatientHistoryType[]
  >([]);
  const [curHistoryViewState, setCurHistoryViewState] = useState(0);

  const [albumImages, setAlbumImages] = useState<string[]>([]);

  const getOnlyDate1 = (dateString: any) => {
    const date = new Date(dateString);

    const formattedDate = `${("0" + (date.getMonth() + 1)).slice(-2)}-${(
      "0" + date.getDate()
    ).slice(-2)}-${date.getFullYear()}`;

    return formattedDate;
  };

  const getOnlyDate = (dateString: any) => {
    const date = new Date(dateString);

    const day = ("0" + date.getUTCDate()).slice(-2); // using getUTCDate to avoid timezone issues
    const month = ("0" + (date.getUTCMonth() + 1)).slice(-2); // using getUTCMonth to avoid timezone issues
    const year = date.getUTCFullYear(); // using getUTCFullYear to avoid timezone issues

    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  };

  const getPatientHistory = async () => {
    const patientID = context.patientid;
    const doctorID = context.doctorid;
    const data = { patientID, doctorID };
    console.log("pthistory patientID -> ", patientID, " doctorID -> ", doctorID);
    await fetch(BACKEND_URL + "/getpthistory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data.length > 0) {
          setCurHistoryViewState(data.data.length - 1);
          setPatientHistory(data.data);
          setOriginPatientHistory(data.data);
          // show present illness
          if (new Date(data.data[data.data.length-1].date).toISOString().substring(0, 10) == new Date().toISOString().substring(0, 10))
            setPresentIllness(data.data[data.data.length-1].detail);
          }
      })
      .catch((error) => {
        console.error(error);
        // handle error
      });
  };

  const updateAlbumDataHandler = async () => {
    // update album data
    const cardid = _context.cardid;
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
        if (data.data.length > 0) {
          if (!data.data[0].remark) data.data[0].remark = "@@@@@@@@@@";
          setContext(data.data[0]);
          setCurPastHistory(data.data[0].pasthistory ? data.data[0].pasthistory : "");
          // analyze album images
          if (data.data[0].album) {
            const albumImgText: string[] = data.data[0].album.split(", ");
            setAlbumImages(albumImgText);
          }
        }
      })
      .catch((error) => {
        console.error(error);
        // handle error
      });
  };

  // get company information
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
      // fetch patient card information from backend
      getPatientHistory();
      // upate patient card context
      updateAlbumDataHandler();
      // get company profile data
      getCompanyInfo();
    }
  }, [navigate]);

  useEffect(() => {
    updateMedicineDetail();
  }, [storeMedicineInfo]);

  const getUpdateRemark = (origin: any, newvalue: any, idx: any) => {
    const parts = origin.split("@@");
    parts[idx] = newvalue; // Replace the idx part
    const output = parts.join("@@");
    return output;
  };

  const updateMedicineDetail = () => {
    setContext((prevContext: any) => ({
      ...prevContext,
      medicines: JSON.stringify(storeMedicineInfo),
    }));
  };

  const updateCurrentPatientHistory = async () => {
    // update backend
    const cardID = _context.cardid;
    const originPtHistory = originPatientHistory[0].detail;
    const newPtHistory = patientHistory[0].detail;
    const data = { cardID, originPtHistory, newPtHistory };
    await fetch(BACKEND_URL + "/updatelastpthistory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("last history updated successfully!");
      })
      .catch((error) => {
        console.error(error);
        // handle error
      });
  };

  const getOnlyDateTime = (dateString: any) => {
    const date = new Date(dateString);

    const formattedDate = `${("0" + date.getDate()).slice(-2)}-${(
      "0" +
      (date.getMonth() + 1)
    ).slice(-2)}-${date.getFullYear()} ${("0" + date.getHours()).slice(-2)}:${(
      "0" + date.getMinutes()
    ).slice(-2)}`;

    return formattedDate;
  };
 
  const getOnlyDate2 = (dateString: any) => {
    const date = new Date(dateString);

    const day = ("0" + date.getUTCDate()).slice(-2); // using getUTCDate to avoid timezone issues
    const month = ("0" + (date.getUTCMonth() + 1)).slice(-2); // using getUTCMonth to avoid timezone issues
    const year = date.getUTCFullYear(); // using getUTCFullYear to avoid timezone issues

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  };

  // File Uploading Functions
  const [files, setFiles] = useState<File[]>([]);
  const [loadFiles, setLoadFiles] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const filesArray = Array.from(event.target.files);
      setFiles(filesArray);
      for (let i = 0; i < filesArray.length; i++) {
        const file = filesArray[i];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setLoadFiles((prevFiles) => [...prevFiles, reader.result as string]);
        };
      }
    }
  };

  // const [file, setFile] = useState<File>();
  // const [tipMessage, setTipMessage] = useState("");

  // const handlePhotoCapture = async () => {
  //   console.log("camera capture clicked!");
  //   setTipMessage("---");
  //   const mediaDevices = navigator.mediaDevices as any;
  //   const stream = await mediaDevices.getUserMedia({ video: true });
  //   const video = document.createElement("video");
  //   video.srcObject = stream;
  //   video.play();
  //   const canvas = document.createElement("canvas");
  //   canvas.width = video.videoWidth;
  //   canvas.height = video.videoHeight;
  //   const context = canvas.getContext("2d")!;
  //   context.drawImage(video, 0, 0, canvas.width, canvas.height);
  //   const dataUrl = canvas.toDataURL("image/jpeg");
  //   const blob = await fetch(dataUrl).then((res) => res.blob());
  //   setFile(new File([blob], "photo.jpg", { type: "image/jpeg" }));
  //   stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
  // };

  const handleUpload = async (file: any) => {
    console.log("handleUpload");
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("cardid", context.cardid);

    try {
      const response = await fetch(BACKEND_URL + "/upload", {
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

    console.log("patientillness -> ", presentIllness, " -> ", new Date().toISOString().substring(0, 10));

    const presentillness = presentIllness;
    const presentillnessdate = new Date().toISOString().substring(0, 10);

    // -- update extra check patient data
    const data = { context, presentillness, presentillnessdate };
    await fetch(BACKEND_URL + "/updatecheckpatient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Update Check Patient Detail successfully!");
        navigate("/admin");
      })
      .catch((error) => {
        console.error(error);
        // handle error
      });
  };

  return (
    !isPreviewMode ?
    <div className="relative">
      <div className="relative h-screen overflow-y-auto">
        {/* Header */}
        <div className="relative bg-[#64B3EC] h-28">
          <div className="flex flex-row justify-between w-full px-6 absolute text-center text-base text-white font-bold mt-8">
            <div className="flex flex-row items-center">
              <div onClick={() => navigate(-1)}>
                <img src={backwardIcon} className="max-w-none" />
              </div>
              <div className="pl-4">
                {context.name} ({context.sex == 1 ? "男" : "女"})
              </div>
            </div>
            <div>{context.age} 歲</div>
          </div>
          <div className="absolute bottom-[-8px] w-full h-8 bg-white rounded-xl"></div>
        </div>
        {/* Account Detail */}
        <div
          className="relative w-full mt-3 text-[13px] font-semibold pb-[160px]"
          style={{ color: Theme.COLOR_DEFAULT }}
        >
          <div className="flex flex-row justify-between font-normal px-3">
            {getOnlyDateTime(context.date)}
          </div>
          <div className="pt-2">
            {/* 既往史 */}
            <div>
              <div
                className="flex flex-row justify-between p-3 my-2 border-t border-b border-opacity-50 transform scale-y-10"
                onClick={() => {
                  setCurrentSelect(1);
                  getPatientHistory();
                }}
              >
                <div>既往史</div>
                <div className="flex flex-row justify-center">
                  <img src={downIcon} className="max-w-none" />
                </div>
              </div>
              {currentSelect == 1 ? (
                <div className="p-4 font-sans">
                  <div
                    className="flex flex-col p-2"
                    style={{
                      backgroundColor: Theme.COLOR_LIGHTBLUE,
                      color: Theme.COLOR_DARKGREEN,
                    }}
                  >
                    <textarea
                      className="w-full h-full focus:outline-none p-1 bg-transparent resize-none"
                      value={curPastHistory}
                      onChange={(ev) => {
                        setCurPastHistory(ev.target.value);
                      }}
                      readOnly={!isPastHistoryEditMode}
                    />
                    {!isPastHistoryEditMode ? (
                      <>
                        <div
                          className="pt-2 self-end"
                          onClick={() => setIsPastHistoryEditMode(true)}
                        >
                          <img src={editIcon2} className="max-w-none" />
                        </div>
                        <div className="pt-2 self-end">
                          Last update:{" "}
                          {context && context.pasthistorydate
                            ? context.pasthistorydate
                            : ""}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  {/*  */}
                  {isPastHistoryEditMode ? (
                    <div className="flex py-2 font-normal">
                      <div
                        className="grow p-3 rounded-lg text-center bg-[#D3E7F6]"
                        onClick={() => {
                          setIsPastHistoryEditMode(false);
                          setPatientHistory(originPatientHistory);
                          setCurPastHistory(context.pasthistory ? context.pasthistory : "");
                        }}
                      >
                        Cancel
                      </div>
                      <div
                        className="grow p-3 ml-2 rounded-lg text-center text-white bg-[#64B3EC]"
                        onClick={() => {
                          setIsPastHistoryEditMode(false);
                          // updateCurrentPatientHistory();
                          setContext((prevContext: any) => ({
                            ...prevContext,
                            pasthistory: curPastHistory,
                            pasthistorydate: 
                              getOnlyDate2(new Date().toString()),
                          }));
                        }}
                      >
                        Confirm
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
            {/* 現病史 */}
            <div>
              <div
                className="flex flex-row justify-between p-3 my-2 border-t border-b border-opacity-50 transform scale-y-10"
                onClick={() => {
                  setCurrentSelect(2);
                  getPatientHistory();
                }}
              >
                <div>現病史</div>
                <div className="flex flex-row justify-center">
                  <img src={downIcon} className="max-w-none" />
                </div>
              </div>
              {currentSelect == 2 ? (
                <div className="p-3 font-sans">
                  {patientHistory ? (
                    <div className="flex flex-row">
                      {curHistoryViewState > 0 ? (
                        <div
                          className="flex flex-col justify-center p-1"
                          onClick={() =>
                            setCurHistoryViewState(
                              curHistoryViewState > 0
                                ? curHistoryViewState - 1
                                : 0
                            )
                          }
                        >
                          <img src={prevvIcon} className="max-w-none" />
                        </div>
                      ) : (
                        <div className="w-[20px]"></div>
                      )}
                      {patientHistory && patientHistory[curHistoryViewState] ? (
                        <div
                          className="flex flex-col p-3 w-full"
                          style={{
                            backgroundColor: Theme.COLOR_LIGHTBLUE,
                            color: Theme.COLOR_DARKGREEN,
                          }}
                        >
                          <div
                            className="w-full"
                            style={{ overflowWrap: "break-word" }}
                          >
                            {patientHistory[curHistoryViewState].detail}
                          </div>
                          <div className="pt-2 self-end">
                            Last update:{" "}
                            {getOnlyDate1(
                              patientHistory[curHistoryViewState].date
                            )}
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                      {curHistoryViewState < patientHistory.length - 1 ? (
                        <div
                          className="flex flex-col justify-center p-1"
                          onClick={() =>
                            setCurHistoryViewState(
                              curHistoryViewState < patientHistory.length - 1
                                ? curHistoryViewState + 1
                                : patientHistory.length - 1
                            )
                          }
                        >
                          <img src={nexttIcon} className="max-w-none" />
                        </div>
                      ) : (
                        <div className="w-[20px]"></div>
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                  {/* Today Update 現病史 */}
                  <div className="px-[20px] py-2">
                    <textarea
                        className="w-full h-24 p-2 focus:outline-none bg-[#D3E7F6] text-[#25617B] resize-none"
                        value={presentIllness}
                        onChange={(ev) => {
                          setPresentIllness(ev.target.value);
                        }}
                      />
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
            {/* 病歷相簿 */}
            <div>
              <div
                className="flex flex-row justify-between p-3 my-2 border-t border-b border-opacity-50 transform scale-y-10"
                onClick={() => setCurrentSelect(3)}
              >
                <div>病歷相簿</div>
                <div className="flex flex-row justify-center">
                  <img src={downIcon} className="max-w-none" />
                </div>
              </div>
              {currentSelect == 3 ? (
                <div className="p-3">
                  <div className="font-sans flex flex-row justify-between">
                    {albumImages && albumImages.length > 1 ? (
                      <div className="flex flex-row overflow-x-auto">
                        {albumImages ? (
                          albumImages.map((idx, kkk) =>
                            kkk == 0 ? (
                              <div key={"albumImg" + kkk}></div>
                            ) : (
                              <div
                                className="px-2"
                                onClick={() =>
                                  navigate("/editalbum", {
                                    state: { context: context },
                                  })
                                }
                                key={"albumImg" + kkk}
                              >
                                <img
                                  src={BACKEND_URL + "/uploads/" + idx}
                                  className="h-24 max-w-none"
                                />
                              </div>
                            )
                          )
                        ) : (
                          <></>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-row">
                        <div className="px-2">
                          <img src={blankImage} className="max-w-none" />
                        </div>
                        <div className="px-2">
                          <img src={blankImage} className="max-w-none" />
                        </div>
                      </div>
                    )}
                    <div className="flex flex-row items-end">
                      <div className="px-1 pb-1 flex items-center">
                        <div>
                          <label htmlFor="file-input" className="w-8 h-8">
                            <img src={uploadIcon} className="max-w-none" />
                          </label>
                          <input
                            id="file-input"
                            type="file"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                            accept="image/*"
                            multiple
                          />
                        </div>
                        {/* <div
                          className="px-1"
                          onClick={() => handlePhotoCapture()}
                        >
                          <img src={cameraIcon} className="max-w-none" />
                        </div>
                        <div className="py-1">{tipMessage}</div> */}
                      </div>
                    </div>
                  </div>
                  {/* New Uploaded Files Preview */}
                  {loadFiles.length > 0 ? (
                    <div className="pt-3 pb-0">
                      <div>New uploaded Album Images</div>
                      <div className="flex overflow-x-auto">
                        {loadFiles.map((file, idx) => (
                          <div className="px-1" key={"loadFilesImg" + idx}>
                            <img
                              src={file}
                              alt="uploaded file"
                              className="h-24 max-w-none"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="rounded-lg p-1 mt-2">
                    <input
                      className="w-full focus:outline-none p-2 rounded-lg bg-[#E8EEEC] text-[#276D36]"
                      value={context.albumtext}
                      onChange={(ev) => {
                        setContext((prevContext: any) => ({
                          ...prevContext,
                          albumtext: ev.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
            {/* 病名/證型 */}
            {/* <div>
              <div
                className="flex flex-row justify-between p-3 my-2 border-t border-b border-opacity-50 transform scale-y-10"
                onClick={() => setCurrentSelect(4)}
              >
                <div>病名/證型</div>
                <div className="flex flex-row justify-center">
                  <img src={downIcon} className="max-w-none" />
                </div>
              </div>
              {currentSelect == 4 ? (
                <div className="p-3">
                  <div className="font-sans flex flex-row">
                    <div
                      className="w-full rounded-lg"
                      style={{ backgroundColor: Theme.COLOR_LIGHTBLUE }}
                    >
                      <input
                        className="w-full focus:outline-none p-2 rounded-lg"
                        style={{ backgroundColor: Theme.COLOR_LIGHTBLUE }}
                        value={context.disease}
                        onChange={(ev) => {
                          setContext((prevContext: any) => ({
                            ...prevContext,
                            disease: ev.target.value,
                          }));
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div> */}
            {/* 診斷 */}
            <div>
              <div
                className="flex flex-row justify-between p-3 my-2 border-t border-b border-opacity-50 transform scale-y-10"
                onClick={() => setCurrentSelect(5)}
              >
                <div>診斷</div>
                <div className="flex flex-row justify-center">
                  <img src={downIcon} className="max-w-none" />
                </div>
              </div>
              {currentSelect == 5 ? (
                <div className="p-3">
                  <div className="font-sans flex flex-row">
                    <div
                      className="w-full rounded-lg"
                      style={{ backgroundColor: Theme.COLOR_LIGHTBLUE }}
                    >
                      <textarea
                        className="w-full h-[80px] resize-none focus:outline-none p-2 rounded-lg"
                        style={{ backgroundColor: Theme.COLOR_LIGHTBLUE }}
                        value={context.diagnosis ? context.diagnosis : ""}
                        onChange={(ev) => {
                          setContext((prevContext: any) => ({
                            ...prevContext,
                            diagnosis: ev.target.value,
                          }));
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
            {/* 證型 */}
            <div>
              <div
                className="flex flex-row justify-between p-3 my-2 border-t border-b border-opacity-50 transform scale-y-10"
                onClick={() => setCurrentSelect(6)}
              >
                <div>證型</div>
                <div className="flex flex-row justify-center">
                  <img src={downIcon} className="max-w-none" />
                </div>
              </div>
              {currentSelect == 6 ? (
                <div className="p-3">
                  <div className="font-sans flex flex-row">
                    <div
                      className="w-full rounded-lg"
                      style={{ backgroundColor: Theme.COLOR_LIGHTBLUE }}
                    >
                      <textarea
                        className="w-full h-[80px] resize-none focus:outline-none p-2 rounded-lg"
                        style={{ backgroundColor: Theme.COLOR_LIGHTBLUE }}
                        value={context.syndromes}
                        onChange={(ev) => {
                          setContext((prevContext: any) => ({
                            ...prevContext,
                            syndromes: ev.target.value,
                          }));
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
            {/* 方藥/穴位 */}
            <div>
              <div
                className="flex flex-row justify-between p-3 my-2 border-t border-b border-opacity-50 transform scale-y-10"
                onClick={() => setCurrentSelect(7)}
              >
                <div>方藥/穴位</div>
                <div className="flex flex-row justify-center">
                  <img src={downIcon} className="max-w-none" />
                </div>
              </div>
              {currentSelect == 7 ? (
                <div className="px-5 py-3">
                  <div className="flex flex-col">
                    {storeMedicineInfo.map((idx: any, kkk: any) => (
                      <div
                        className="flex flex-row justify-between py-2"
                        key={"medicinetype" + kkk}
                      >
                        <div className="grow">
                          <span className="p-2 bg-[#EAF4FB]">
                            <input
                              className="w-1/2 bg-[#EAF4FB] outline-none"
                              value={idx.name}
                              onChange={(ev) => {
                                setStoreMedicineInfo((prevState) => {
                                  const newState = [...prevState]; // create a copy of the array
                                  newState[kkk] = {
                                    ...newState[kkk],
                                    name: ev.target.value,
                                  }; // update the name property of the specified element
                                  return newState;
                                });
                              }}
                            />
                          </span>
                          <span className="p-2 ml-2 bg-[#EAF4FB]">
                            <input
                              className="w-1/4 bg-[#EAF4FB] outline-none"
                              type="number"
                              value={idx.amount}
                              onChange={(ev) => {
                                setStoreMedicineInfo((prevState) => {
                                  const newState = [...prevState]; // create a copy of the array
                                  newState[kkk] = {
                                    ...newState[kkk],
                                    amount: parseInt(ev.target.value),
                                  }; // update the name property of the specified element
                                  return newState;
                                });
                              }}
                            />
                          </span>
                        </div>
                        <div
                          className="w-6 h-6"
                          onClick={() => {
                            setStoreMedicineInfo((prevState) =>
                              prevState.filter((_, i) => i !== kkk)
                            );
                          }}
                        >
                          <img
                            src={removeitemIcon}
                            className="w-6 h-6 max-w-none"
                          />
                        </div>
                      </div>
                    ))}
                    <div
                      className="flex flex-row justify-center"
                      onClick={() => {
                        setStoreMedicineInfo((prevState) => [
                          ...prevState,
                          { name: "XXX", amount: 0 },
                        ]);
                      }}
                    >
                      <img src={additemIcon} />
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
            {/* 備註 */}
            <div>
              <div
                className="flex flex-row justify-between p-3 my-2 border-t border-b border-opacity-50 transform scale-y-10"
                onClick={() => setCurrentSelect(8)}
              >
                <div>備註</div>
                <div className="flex flex-row justify-center">
                  <img src={downIcon} className="max-w-none" />
                </div>
              </div>
              {currentSelect == 8 ? (
                <div className="p-3">
                  <div className="font-sans flex flex-row">
                    <div
                      className="w-full p-4"
                      style={{
                        backgroundColor: Theme.COLOR_LIGHTBLUE,
                        color: Theme.COLOR_DARKGREEN,
                      }}
                    >
                      <div>
                        <span className="px-1">
                          <input
                            className="w-12 focus:outline-none border-b border-b-[#25617B] bg-transparent"
                            value={
                              context &&
                              context.remark &&
                              context.remark.split("@@").length > 0
                                ? context.remark.split("@@")[0]
                                : ""
                            }
                            onChange={(ev) => {
                              setContext((prevContext: any) => ({
                                ...prevContext,
                                remark: getUpdateRemark(
                                  prevContext.remark,
                                  ev.target.value,
                                  0
                                ),
                              }));
                            }}
                          />
                        </span>
                        日藥 / 每日
                        <span className="px-1">
                          <input
                            className="w-12 focus:outline-none border-b border-b-[#25617B] bg-transparent"
                            value={
                              context &&
                              context.remark &&
                              context.remark.split("@@").length > 0
                                ? context.remark.split("@@")[1]
                                : ""
                            }
                            onChange={(ev) => {
                              setContext((prevContext: any) => ({
                                ...prevContext,
                                remark: getUpdateRemark(
                                  prevContext.remark,
                                  ev.target.value,
                                  1
                                ),
                              }));
                            }}
                          />
                        </span>
                        次 / 共
                        <span className="px-1">
                          <input
                            className="w-12 focus:outline-none border-b border-b-[#25617B] bg-transparent"
                            value={
                              context &&
                              context.remark &&
                              context.remark.split("@@").length > 0
                                ? context.remark.split("@@")[2]
                                : ""
                            }
                            onChange={(ev) => {
                              setContext((prevContext: any) => ({
                                ...prevContext,
                                remark: getUpdateRemark(
                                  prevContext.remark,
                                  ev.target.value,
                                  2
                                ),
                              }));
                            }}
                          />
                        </span>
                        包
                      </div>
                      <div className="pt-1">
                        <span className="px-1">
                          <input
                            className="w-12 focus:outline-none border-b border-b-[#25617B] bg-transparent"
                            value={
                              context &&
                              context.remark &&
                              context.remark.split("@@").length > 0
                                ? context.remark.split("@@")[3]
                                : ""
                            }
                            onChange={(ev) => {
                              setContext((prevContext: any) => ({
                                ...prevContext,
                                remark: getUpdateRemark(
                                  prevContext.remark,
                                  ev.target.value,
                                  3
                                ),
                              }));
                            }}
                          />
                        </span>
                        餐
                        <span className="px-1">
                          <input
                            className="w-12 focus:outline-none border-b border-b-[#25617B] bg-transparent"
                            value={
                              context &&
                              context.remark &&
                              context.remark.split("@@").length > 0
                                ? context.remark.split("@@")[4]
                                : ""
                            }
                            onChange={(ev) => {
                              setContext((prevContext: any) => ({
                                ...prevContext,
                                remark: getUpdateRemark(
                                  prevContext.remark,
                                  ev.target.value,
                                  4
                                ),
                              }));
                            }}
                          />
                        </span>
                        服
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Confirm */}
      <div className="absolute w-full px-3 bottom-[80px]">
        <div
          className="p-3 text-center text-white rounded-xl"
          style={{ backgroundColor: Theme.COLOR_DEFAULT }}
          onClick={() => {
            // navigate("/previewmedicine", {
            //   state: { context: context, files: files, presentillness: presentIllness, presentillnessdate: new Date().toISOString().substring(0, 10) },
            // });
            setIsPreviewMode(true);
          }}
        >
          Confirm
        </div>
      </div>
      {/* NavBar */}
      <NavBar status={2} />
    </div>
    : <div className="relative">
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
            {companyInfo.logo}
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
                  // navigate("/checkpatient", { state: { context: context } })
                  setIsPreviewMode(false)
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
              <div style={{ color: Theme.COLOR_DEFAULT }}>診斷: <span className="pl-1">{context.diagnosis}</span></div>
              <div className="p-2 h-48 text-black text-xs">
                <table className="table w-11/12 mx-auto border-collapse border border-black">
                  <tbody>
                    {
                    context.medicines ?
                    chunkArray(JSON.parse(context.medicines), 3).map((chunk: any, i: any) => (
                      <tr key={i}>
                        {chunk.map((medicine: any, j: any) => (
                          <td
                            key={j}
                            className="border border-black p-1 text-center w-1/3"
                          >
                            {medicine.name} {medicine.amount}g
                          </td>
                        ))}
                      </tr>
                    )) : <></>}
                  </tbody>
                </table>
              </div>
              <div className="text-center text-xs text-[#666666]">
                <span className="text-black">{context && context.remark && context.remark.split("@@").length > 0 ? context.remark.split("@@")[0] : ""}</span><span className="px-1">日藥/每日</span>
                <span className="text-black">{context && context.remark && context.remark.split("@@").length > 0 ? context.remark.split("@@")[1] : ""}</span><span className="px-1">次/共</span>
                <span className="text-black">{context && context.remark && context.remark.split("@@").length > 0 ? context.remark.split("@@")[2] : ""}</span><span className="px-1">包</span>
              </div>
              <div className="text-xs text-[#666666] pt-3">
                <span className="text-black">{context && context.remark && context.remark.split("@@").length > 0 ? context.remark.split("@@")[3] : ""}</span><span className="px-1">餐</span>
                <span className="text-black">{context && context.remark && context.remark.split("@@").length > 0 ? context.remark.split("@@")[4] : ""}</span><span className="px-1">服</span>
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
            <div>地址: {companyInfo.address}</div>
            <div>電話: {companyInfo.tel}</div>
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

export default CheckPatient;
