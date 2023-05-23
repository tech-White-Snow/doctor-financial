import { FC, useState } from "react";

import { useNavigate } from "react-router-dom";

import Theme from "../../assets/color";

import nextIcon from "../../assets/icons/next_ico.svg";

import PatientResultItemIcon from "../../assets/icons/patient_thumbnail.svg";
import SelectedResultItemIcon from "../../assets/icons/selected_ico.svg";

interface PatientResultItemProps {
  name: string;
  newdiease: boolean;
  telephone: string;
  age: number;
  sex: number;
  doctor: string;
  date: string;
}

const PatientResultItem: FC<PatientResultItemProps> = ({
  name,
  newdiease,
  telephone,
  age,
  sex,
  doctor,
  date,
}) => {
  const navigate = useNavigate();

  const browsePatientDetail = () => {
    navigate("/patientdetail", {
      state: {
        name: name,
        newdiease: newdiease,
        telephone: telephone,
        age: age,
        sex: sex,
        doctor: doctor,
        date: date,
      },
    });
  };

  const [isLongClick, setIsLongClick] = useState(false);
  let timeout: NodeJS.Timeout;

  const handleMouseDown = () => {
    setIsLongClick(false);
    timeout = setTimeout(() => {
      setIsLongClick(true);
    }, 1000); // set the duration of the long click here
  };

  const handleMouseUp = () => {
    clearTimeout(timeout);
    // setIsLongClick(false);
  };

  return (
    <div
      className="px-2 my-2 shadow-lg rounded-xl hover:bg-[#BBBBBB]"
      onClick={() => {
        console.log("longClick --> ", isLongClick);
        if (!isLongClick) browsePatientDetail();
      }}
    >
      <div className="relative h-20 flex flex-col justify-center">
        {/* Image */}
        <div className="flex flex-row justify-center text-center">
          <div
            className="flex justify-center w-[72px] h-9"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
          >
            {isLongClick ? (
              <img src={SelectedResultItemIcon} />
            ) : (
              <img src={PatientResultItemIcon} />
            )}
          </div>
          <div className="grow flex flex-row justify-between text-xs text-left">
            <div className="grow flex flex-row justify-between">
              <div>
                <div style={{ color: Theme.COLOR_DEFAULT }}>{name}</div>
                <div className="pt-1">
                  <span className="text-black">電話:</span>
                  <span className="text-black text-opacity-60">
                    {telephone}
                  </span>
                </div>
              </div>
              <div className="text-black text-opacity-60">{date}</div>
            </div>
            <div className="p-2 flex justify-center">
              <img src={nextIcon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientResultItem;
