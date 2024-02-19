// App.js
import React from "react";
import {
  Route,
  Routes
} from "react-router-dom";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default App;
