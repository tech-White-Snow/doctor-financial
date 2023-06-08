import { FC, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import Theme from "../assets/color";

import Avatar1 from "../assets/avatar1.svg";
import DashBack from "../assets/img/alert_board.png";

import NavBar from "../components/NavBar";
import Header from "../components/Header";
import PatientResultItem from "../components/patient/PatientResultItem";

const SearchResultPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const context = location.state.context;
  // Hook for User Authentication
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      // Redirect to login page if token is not present
      navigate("/");
    } else {
    }
  }, [navigate]);

  return (
    <div className="relative">
      <div className="h-screen overflow-y-auto">
        {/* Header */}
        <Header title="Search Results" />
        {/* Main Page */}
        <div className="px-3">
          {/* Scheduled Patient List */}
          <div className="w-full">
            <div className="pb-[75px]">
              {context.map((idx: any) => (
                <PatientResultItem
                  key={idx.name + idx.telephone + idx.doctor}
                  cardid={idx.cardid}
                  name={idx.name}
                  newdiease={idx.newdiease}
                  telephone={idx.telephone}
                  age={idx.age}
                  sex={idx.sex}
                  doctor={idx.doctor}
                  date={idx.date}
                />
              ))}
            </div>
          </div>
        </div>
        {/* NavBar */}
        <NavBar status={3} />
      </div>
    </div>
  );
};

export default SearchResultPage;
