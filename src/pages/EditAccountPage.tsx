import { FC, useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import Theme from "../assets/color";

import nextIcon from "../assets/icons/next_ico.svg";
import editIcon from "../assets/icons/edit_ico.svg";
import editIcon1 from "../assets/icons/edit_ico2.svg";
import downIcon from "../assets/icons/down_ico.svg";
import profileImage from "../assets/img/profile_sample.jpeg";

import Header from "../components/Header";
import NavBar from "../components/NavBar";

const EditAccountPage: FC = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const accountMode = location.state.mode; // 1 : viewMode 2: addMode
  const context = location.state.context; // context of account

  const [isEditMode, setIsEditMode] = useState(accountMode == 2);
  const [isAccountTypeOpen, setIsAccountTypeOpen] = useState(false);

  const [userAvatar, setUserAvatar] = useState(context.userAvatar);
  const [userName, setUserName] = useState(
    accountMode != 2 ? context.username : "Admin"
  );
  const [userEmail, setUserEmail] = useState(
    accountMode != 2 ? context.email : "admin@gmail.com"
  );
  const [password, setPassword] = useState(
    accountMode != 2 ? context.password : "123456"
  );
  const [confirmedPassword, setConfirmedPassword] = useState(
    accountMode != 2 ? context.password : ""
  );
  const [fullName, setFullName] = useState(
    accountMode != 2 ? context.fullname : "Admin"
  );
  const [doctorID, setDoctorID] = useState(
    accountMode != 2 ? context.doctorid : "13579"
  );

  const updateAccountHandler = async () => {
    if (password == confirmedPassword) {
      if (accountMode == 2) {
        // add new account
        const data = {
          userAvatar,
          userName,
          userEmail,
          password,
          fullName,
          doctorID,
        };
        // call backend for updating account information
        await fetch("http://localhost:8000/addaccount", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data.message);
            navigate("/viewaccount");
          })
          .catch((error) => {
            console.error(error);
            // handle error
          });
      } else {
        // update existing account
        const data = {
          context,
          userAvatar,
          userName,
          userEmail,
          password,
          fullName,
          doctorID,
        };
        // call backend for updating account information
        await fetch("http://localhost:8000/updateaccount", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data.message);
            navigate("/viewaccount");
          })
          .catch((error) => {
            console.error(error);
            // handle error
          });
      }
    }
  };

  return (
    <div className="relative">
      <div className="relative h-screen overflow-y-auto">
        {/* Header */}
        <Header
          title={
            accountMode == 2
              ? "Add Account"
              : isEditMode
              ? "Edit Profile"
              : "Profile"
          }
        />
        {!isEditMode ? (
          <div
            className="absolute top-8 right-4 p-1.5 border border-white rounded-lg"
            onClick={() => setIsEditMode(true)}
          >
            <img src={editIcon} className="max-w-none" />
          </div>
        ) : (
          <></>
        )}
        {/* Account Detail */}
        <div
          className={
            "relative w-full mt-3 text-xs font-medium text-black text-opacity-70 " +
            (accountMode == 1 && !isEditMode ? "pb-[60px]" : "pb-[120px]")
          }
        >
          <div className="relative flex flex-row p-3 my-2 border-t border-b border-opacity-50">
            <div className="w-1/2 pt-2">Profile Picture</div>
            <div
              className="relative w-12"
              style={{ color: Theme.COLOR_DEFAULT }}
            >
              <img
                src={profileImage}
                className="w-12 h-12 max-w-none rounded-full"
              />
              <div
                className="absolute right-1 top-1 w-2 h-2 rounded-full"
                style={{ background: Theme.COLOR_RED }}
              ></div>
            </div>
            {isEditMode ? (
              <div className="absolute right-7 top-7 w-6 h-6">
                <img src={editIcon1} className="max-w-none" />
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-row p-3 my-2 border-t border-b border-opacity-50">
            <div className="w-1/2">Username</div>
            <div className="w-1/2" style={{ color: Theme.COLOR_DEFAULT }}>
              <input
                className="focus:outline-none"
                value={userName}
                onChange={(ev) => setUserName(ev.target.value)}
                disabled={!isEditMode}
              />
            </div>
          </div>
          <div className="flex flex-row p-3 my-2 border-t border-b border-opacity-50">
            <div className="w-1/2">Email</div>
            <div className="w-1/2" style={{ color: Theme.COLOR_DEFAULT }}>
              <input
                className="focus:outline-none"
                value={userEmail ? userEmail : ""}
                onChange={(ev) => setUserEmail(ev.target.value)}
                disabled={!isEditMode}
              />
            </div>
          </div>
          <div className="flex flex-row p-3 my-2 border-t border-b border-opacity-50">
            <div
              className={
                "w-1/2 " + (password != confirmedPassword ? "text-red-600" : "")
              }
            >
              Password
            </div>
            <div className="w-1/2" style={{ color: Theme.COLOR_DEFAULT }}>
              <input
                className="focus:outline-none"
                type="password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                disabled={!isEditMode}
              />
            </div>
          </div>
          {isEditMode ? (
            <div className="flex flex-row p-3 my-2 border-t border-b border-opacity-50">
              <div
                className={
                  "w-1/2 " +
                  (password != confirmedPassword ? "text-red-600" : "")
                }
              >
                Confirmed Password
              </div>
              <div className="w-1/2" style={{ color: Theme.COLOR_DEFAULT }}>
                <input
                  className="focus:outline-none"
                  type="password"
                  value={confirmedPassword}
                  onChange={(ev) => setConfirmedPassword(ev.target.value)}
                  disabled={!isEditMode}
                />
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className="flex flex-row p-3 my-2 border-t border-b border-opacity-50">
            <div className="w-1/2">Full name</div>
            <div className="w-1/2" style={{ color: Theme.COLOR_DEFAULT }}>
              <input
                className="focus:outline-none"
                value={fullName}
                onChange={(ev) => setFullName(ev.target.value)}
                disabled={!isEditMode}
              />
            </div>
          </div>
          <div className="flex flex-row p-3 my-2 border-t border-b border-opacity-50">
            <div className="w-1/2">Doctor ID</div>
            <div className="w-1/2" style={{ color: Theme.COLOR_DEFAULT }}>
              <input
                className="focus:outline-none"
                value={doctorID}
                onChange={(ev) => setDoctorID(ev.target.value)}
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
                onClick={() => updateAccountHandler()}
              >
                Confirm
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      {/* NavBar */}
      <NavBar status={4} />
    </div>
  );
};

export default EditAccountPage;
