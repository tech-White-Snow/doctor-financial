import { FC, useState } from "react";

import { useNavigate } from "react-router-dom";

import Theme from "../assets/color";

import nextIcon from "../assets/icons/next_ico.svg";
import editIcon from "../assets/icons/edit_ico.svg";
import editIcon1 from "../assets/icons/edit_ico1.svg";
import downIcon from "../assets/icons/down_ico.svg";
import profileImage from "../assets/img/profile_sample.jpeg";

import Header from "../components/Header";
import NavBar from "../components/NavBar";

const EditAccountPage: FC = () => {
  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);
  const [isAccountTypeOpen, setIsAccountTypeOpen] = useState(false);

  const context = {
    name: "ryangwong",
    email: "eamil@email.com",
    password: "123456",
    accountType: 1,
    fullname: "Ryang",
    doctorID: "006073",
  };

  return (
    <div className="relative">
      <div className="relative h-screen overflow-y-auto">
        {/* Header */}
        <Header title={!isEditMode ? "Account" : "Edit Account"} />
        {!isEditMode ? (
          <div
            className="absolute top-8 right-4 p-1.5 border border-white rounded-lg"
            onClick={() => setIsEditMode(true)}
          >
            <img src={editIcon} />
          </div>
        ) : (
          <></>
        )}
        {/* Account Detail */}
        <div className="relative w-full mt-3 text-xs font-medium pb-[60px]">
          <div className="flex flex-row p-3 my-2 border-t border-b border-opacity-50">
            <div className="w-1/2">Username</div>
            <div className="w-1/2" style={{ color: Theme.COLOR_DEFAULT }}>
              <input
                className="hover:outline-none"
                value={context.name}
                disabled={!isEditMode}
              />
            </div>
          </div>
          <div className="relative flex flex-row p-3 my-2 border-t border-b border-opacity-50">
            <div className="w-1/2">Profile</div>
            <div className="w-1/2" style={{ color: Theme.COLOR_DEFAULT }}>
              <img src={profileImage} className="w-12 h-12 rounded-full" />
            </div>
            {isEditMode ? (
              <div className="absolute right-7 top-7">
                <img src={editIcon1} />
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-row p-3 my-2 border-t border-b border-opacity-50">
            <div className="w-1/2">Email</div>
            <div className="w-1/2" style={{ color: Theme.COLOR_DEFAULT }}>
              <input
                className="hover:outline-none"
                value={context.email}
                disabled={!isEditMode}
              />
            </div>
          </div>
          <div className="flex flex-row p-3 my-2 border-t border-b border-opacity-50">
            <div className="w-1/2">Password</div>
            <div className="w-1/2" style={{ color: Theme.COLOR_DEFAULT }}>
              <input
                className="hover:outline-none"
                type="password"
                value={context.password}
                disabled={!isEditMode}
              />
            </div>
          </div>
          {isEditMode ? (
            <div className="flex flex-row p-3 my-2 border-t border-b border-opacity-50">
              <div className="w-1/2">Confirmed Password</div>
              <div className="w-1/2" style={{ color: Theme.COLOR_DEFAULT }}>
                <input
                  className="hover:outline-none"
                  type="password"
                  value={context.password}
                  disabled={!isEditMode}
                />
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className="flex flex-row p-3 my-2 border-t border-b border-opacity-50">
            <div className="w-1/2">Account Type</div>
            <div
              className="relative w-1/2"
              style={{ color: Theme.COLOR_DEFAULT }}
            >
              <div
                className="flex flex-row"
                onClick={() => setIsAccountTypeOpen(!isAccountTypeOpen)}
              >
                <div>{context.accountType == 1 ? "Doctor" : "Admin"}</div>
                <div className="pl-3 self-center">
                  <img src={downIcon} />
                </div>
              </div>
              <div
                className={
                  "absolute top-4 px-4 bg-white border " +
                  (isAccountTypeOpen ? "" : "hidden")
                }
              >
                <div className="py-1">Doctor</div>
                <div className="py-1">Admin</div>
              </div>
            </div>
          </div>
          <div className="flex flex-row p-3 my-2 border-t border-b border-opacity-50">
            <div className="w-1/2">Full name</div>
            <div className="w-1/2" style={{ color: Theme.COLOR_DEFAULT }}>
              <input
                className="hover:outline-none"
                value={context.fullname}
                disabled={!isEditMode}
              />
            </div>
          </div>
          <div className="flex flex-row p-3 my-2 border-t border-b border-opacity-50">
            <div className="w-1/2">Doctor ID</div>
            <div className="w-1/2" style={{ color: Theme.COLOR_DEFAULT }}>
              <input
                className="hover:outline-none"
                value={context.doctorID}
                disabled={!isEditMode}
              />
            </div>
          </div>
          {/* Confirmed Buttonn */}
          {isEditMode ? (
            <div className="absolute w-full px-3">
              <div
                className="p-3 text-center text-white rounded-xl"
                style={{ backgroundColor: Theme.COLOR_DEFAULT }}
                onClick={() => setIsEditMode(false)}
              >
                Confirm
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        {/* NavBar */}
        {!isEditMode ? <NavBar status={4} /> : <></>}
      </div>
    </div>
  );
};

export default EditAccountPage;
