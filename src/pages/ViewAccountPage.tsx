import { FC, useState } from "react";

import { useNavigate } from "react-router-dom";

import Theme from "../assets/color";

import nextIcon from "../assets/icons/next_ico.svg";
import editIcon from "../assets/icons/edit_ico.svg";
import editIcon1 from "../assets/icons/edit_ico1.svg";
import downIcon from "../assets/icons/down_ico.svg";
import profileImage from "../assets/img/profile_sample.jpeg";
import addIcon from "../assets/icons/add_ico.svg";

import Header from "../components/Header";
import NavBar from "../components/NavBar";

const ViewAccountPage: FC = () => {
  const navigate = useNavigate();

  const temp_data = [
    {
      name: "jenny",
    },
    {
      name: "yukko",
    },
    {
      name: "danny",
    },
  ];

  return (
    <div className="relative">
      <div className="relative h-screen overflow-y-auto">
        {/* Header */}
        <Header title="Account" />
        {/* Account Detail */}
        <div
          className="relative w-full mt-3 text-xs font-medium pb-[60px]"
          style={{ color: Theme.COLOR_DEFAULT }}
        >
          {temp_data.map((idx, kkk) => (
            <div
              className="text-center p-3 my-2 border-t border-b border-opacity-50"
              key={idx.name + kkk}
              onClick={() =>
                navigate("/account", {
                  state: {
                    name: idx.name,
                    mode: 1,
                  },
                })
              }
            >
              {idx.name}
            </div>
          ))}
        </div>
      </div>
      {/* Add Button */}
      <div
        className="absolute bottom-[80px] right-5"
        onClick={() =>
          navigate("/account", {
            state: {
              name: "",
              mode: 2,
            },
          })
        }
      >
        <img src={addIcon} className="max-w-none" />
      </div>
      {/* NavBar */}
      <NavBar status={4} />
    </div>
  );
};

export default ViewAccountPage;
