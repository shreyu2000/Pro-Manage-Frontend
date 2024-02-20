// App.js
import React from "react";
import {
  Route,
  Routes
} from "react-router-dom";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Dashboard from "./pages/DashBoard/DashBoard";

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      

    </Routes>
    </>
  );
};

export default App;
