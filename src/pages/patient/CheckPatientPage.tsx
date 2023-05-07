import { FC, useState } from "react";

import { useNavigate } from "react-router-dom";

import Theme from "../../assets/color";

import nextIcon from "../../assets/icons/next_ico.svg";
import editIcon from "../../assets/icons/edit_ico.svg";
import editIcon1 from "../../assets/icons/edit_ico1.svg";
import editIcon2 from "../../assets/icons/edit_ico2.svg";
import downIcon from "../../assets/icons/down_ico.svg";
import profileImage from "../../assets/img/profile_sample.jpeg";
import prevvIcon from "../../assets/icons/prevv_ico.svg";
import nexttIcon from "../../assets/icons/nextt_ico.svg";
import blankImage from "../../assets/img/blank_image.svg";
import uploadIcon from "../../assets/icons/upload_ico.svg";
import cameraIcon from "../../assets/icons/camera_ico.svg";
import backwardIcon from "../../assets/icons/backward1_ico.svg";
import additemIcon from "../../assets/icons/additem_ico.svg";
import removeitemIcon from "../../assets/icons/removeitem_ico.svg";

import Header from "../../components/Header";
import NavBar from "../../components/NavBar";

interface MedicineInfo {
  name: string;
  quantity: number;
}

const CheckPatient: FC = () => {
  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);
  const [isAccountTypeOpen, setIsAccountTypeOpen] = useState(false);

  const [storeMedicineInfo, setStoreMedicineInfo] = useState<MedicineInfo[]>(
    []
  );
  const [storeMedicineInfoCount, setStoreMedicineInfoCount] = useState(0);

  const [currentSelect, setCurrentSelect] = useState(0);

  const context = {
    name: "張小梅",
    email: "eamil@email.com",
    password: "123456",
    accountType: 1,
    fullname: "Ryang",
    doctorID: "006073",
    date: "DD-MM-YYYY  HH:MM",
    sex: 1,
    age: 38,
  };

  return (
    <div className="relative">
      <div className="relative h-screen overflow-y-auto">
        {/* Header */}
        <div className="relative bg-[#64B3EC] h-28">
          <div className="flex flex-row justify-between w-full px-6 absolute text-center text-base text-white font-bold mt-8">
            <div className="flex flex-row">
              <div onClick={() => navigate(-1)}>
                <img src={backwardIcon} />
              </div>
              <div className="pl-4">
                {context.name}({context.sex == 1 ? "男" : "女"})
              </div>
            </div>
            <div>{context.age}歲</div>
          </div>
          <div className="absolute bottom-[-8px] w-full h-8 bg-white rounded-xl"></div>
        </div>
        {/* Account Detail */}
        <div
          className="relative w-full mt-3 text-[13px] font-semibold pb-[160px]"
          style={{ color: Theme.COLOR_DEFAULT }}
        >
          <div className="flex flex-row justify-between px-3">
            <div className="flex flex-row">
              <div>
                <input type="checkbox" />
              </div>
              <div className="px-2">需要覆診</div>
            </div>
            <div className="font-normal">{context.date}</div>
          </div>
          <div className="pt-2">
            {/* 既往史 */}
            <div>
              <div
                className="flex flex-row justify-between p-3 my-2 border-t border-b border-opacity-50 transform scale-y-10"
                onClick={() => setCurrentSelect(1)}
              >
                <div className="font-mont">既往史</div>
                <div className="flex flex-row justify-center">
                  <img src={downIcon} />
                </div>
              </div>
              {currentSelect == 1 ? (
                <div className="p-3 font-sans">
                  <div
                    className="flex flex-col p-6"
                    style={{
                      backgroundColor: Theme.COLOR_LIGHTBLUE,
                      color: Theme.COLOR_DARKGREEN,
                    }}
                  >
                    <div>
                      Record if the patients has special disease or allergy in
                      the past. For no accident mistake, this part need an edit
                      btn for edit.
                    </div>
                    <div className="pt-6 self-end">
                      <img src={editIcon2} />
                    </div>
                    <div className="pt-2 self-end">Last update: DD/MM/YYYY</div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
            {/* 現病史 */}
            <div>
              <div
                className="flex flex-row justify-between p-3 my-2 border-t border-b border-opacity-50 transform scale-y-10"
                onClick={() => setCurrentSelect(2)}
              >
                <div className="font-mont">現病史</div>
                <div className="flex flex-row justify-center">
                  <img src={downIcon} />
                </div>
              </div>
              {currentSelect == 2 ? (
                <div className="p-3 font-sans">
                  <div className="flex flex-row">
                    <div className="p-1 flex flex-col justify-center">
                      <img src={prevvIcon} className="w-8 h-8" />
                    </div>
                    <div
                      className="flex flex-col p-6"
                      style={{
                        backgroundColor: Theme.COLOR_LIGHTBLUE,
                        color: Theme.COLOR_DARKGREEN,
                      }}
                    >
                      <div>
                        Record if the patients has special disease or allergy in
                        the past. For no accident mistake, this part need an
                        edit btn for edit.
                      </div>
                      <div className="pt-2 self-end">
                        Last update: DD/MM/YYYY
                      </div>
                    </div>
                    <div className="p-1 flex flex-col justify-center">
                      <img src={nexttIcon} className="w-8 h-8" />
                    </div>
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
                <div className="font-mont">病歷相簿</div>
                <div className="flex flex-row justify-center">
                  <img src={downIcon} />
                </div>
              </div>
              {currentSelect == 3 ? (
                <div className="p-3">
                  <div className="font-sans flex flex-row justify-between">
                    <div className="flex flex-row">
                      <div className="px-2">
                        <img src={blankImage} />
                      </div>
                      <div className="px-2">
                        <img src={blankImage} />
                      </div>
                    </div>
                    <div className="flex flex-row items-end">
                      <div className="px-1 pb-1">
                        <img src={uploadIcon} />
                      </div>
                      <div className="px-1">
                        <img src={cameraIcon} />
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#E8EEEC] text-[#276D36] p-1 mt-2">
                    Caption
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
                onClick={() => setCurrentSelect(4)}
              >
                <div className="font-mont">備註</div>
                <div className="flex flex-row justify-center">
                  <img src={downIcon} />
                </div>
              </div>
              {currentSelect == 4 ? (
                <div className="p-3">
                  <div className="font-sans flex flex-row">
                    <div
                      className="w-full h-[80px]"
                      style={{ backgroundColor: Theme.COLOR_LIGHTBLUE }}
                    ></div>
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
                onClick={() => setCurrentSelect(5)}
              >
                <div className="font-mont">方藥/穴位</div>
                <div className="flex flex-row justify-center">
                  <img src={downIcon} />
                </div>
              </div>
              {currentSelect == 5 ? (
                <div className="px-5 py-3">
                  <div className="flex flex-col">
                    {Array.from(
                      { length: storeMedicineInfoCount },
                      (_, index) => index
                    ).map((idx) => (
                      <div className="flex flex-row justify-between py-2">
                        <div className="grow">
                          <span className="p-2 bg-[#EAF4FB]">
                            <input
                              className="w-1/2 bg-[#EAF4FB]"
                              value="Herbs Medicine"
                            />
                          </span>
                          <span className="p-2 ml-2 bg-[#EAF4FB]">
                            <input
                              className="w-1/4 bg-[#EAF4FB]"
                              value="Quantity"
                            />
                          </span>
                        </div>
                        <div
                          className="w-6 h-6"
                          onClick={() =>
                            setStoreMedicineInfoCount(
                              storeMedicineInfoCount - 1
                            )
                          }
                        >
                          <img src={removeitemIcon} className="w-6 h-6" />
                        </div>
                      </div>
                    ))}
                    <div
                      className="flex flex-row justify-center"
                      onClick={() =>
                        setStoreMedicineInfoCount(storeMedicineInfoCount + 1)
                      }
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
                onClick={() => setCurrentSelect(6)}
              >
                <div className="font-mont">備註</div>
                <div className="flex flex-row justify-center">
                  <img src={downIcon} />
                </div>
              </div>
              {currentSelect == 6 ? (
                <div className="p-3">
                  <div className="font-sans flex flex-row">
                    <div
                      className="w-full h-[80px] p-4"
                      style={{
                        backgroundColor: Theme.COLOR_LIGHTBLUE,
                        color: Theme.COLOR_DARKGREEN,
                      }}
                    >
                      <div>_____日藥 / 每日 _____次 / 共 _____包</div>
                      <div className="pt-1"> _____餐 _____服</div>
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
          onClick={() => navigate("/previewmedicine")}
        >
          Confirm
        </div>
      </div>
      {/* NavBar */}
      {!isEditMode ? <NavBar status={2} /> : <></>}
    </div>
  );
};

export default CheckPatient;