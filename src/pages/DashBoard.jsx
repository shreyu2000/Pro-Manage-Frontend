// Dashboard.js
import React, { useState } from 'react';
import LeftSection from './LeftSection';
import RightSection from './RightSection';

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState('Board');

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="dashboard-container">
      <LeftSection selectedOption={selectedOption} onSelectOption={handleOptionChange} />
      <RightSection selectedOption={selectedOption} />
    </div>
  );
};

export default Dashboard;
