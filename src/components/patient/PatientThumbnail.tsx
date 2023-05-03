import { FC } from "react";

import { useNavigate } from "react-router-dom";

import Theme from "../../assets/color";

import patientThumbnailIcon from "../../assets/icons/patient_thumbnail.svg";

interface PatientThumbnailProps {
  name: string;
  newdiease: boolean;
  telephone: string;
  age: number;
  sex: number;
  doctor: string;
  date: string;
}

const PatientThumbnail: FC<PatientThumbnailProps> = ({
  name,
  newdiease,
  telephone,
  age,
  sex,
  doctor,
  date,
}) => {
  const navigate = useNavigate();

  return (
    <div className="px-2 py-3 my-3 shadow-lg rounded-xl hover:bg-[#BBBBBB]">
      <div className="relative h-32 flex">
        {/* Image */}
        <div className="w-1/3 flex flex-col justify-center text-center">
          <div className="flex justify-center">
            <img src={patientThumbnailIcon} />
          </div>
          <div className="text-sm pt-2" style={{ color: Theme.COLOR_DEFAULT }}>
            {name}
          </div>
          <div className="text-xs pt-1" style={{ color: Theme.COLOR_SELECTED }}>
            {newdiease ? "新症" : ""}
          </div>
        </div>
        {/* Content */}
        <div className="w-2/3 text-xs font-mont">
          <div>
            <span>電話 ：</span>
            <span className="text-black text-opacity-60">{telephone}</span>
          </div>
          <div>
            <span>年齡 ：</span>
            <span className="text-black text-opacity-60">{age}</span>
          </div>
          <div>
            <span>性別 ：</span>
            <span className="text-black text-opacity-60">
              {sex == 1 ? "男" : "女"}
            </span>
          </div>
        </div>
        {/* Note */}
        <div className="absolute bottom-1 right-4 text-xs">
          <div>
            <span>主診醫師: </span>
            <span className="text-black text-opacity-60">{doctor}</span>
          </div>
          <div>{date}</div>
        </div>
      </div>
    </div>
  );
};

export default PatientThumbnail;
