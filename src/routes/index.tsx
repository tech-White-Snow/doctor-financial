import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "pages/Home";
import Splash from "pages/Splash";

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/splash" element={<Splash />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
