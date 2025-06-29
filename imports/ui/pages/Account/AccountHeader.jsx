import React, { useState, useEffect } from 'react';
import './Header.css';
import Profile from './profile';
import CompanyDetails from './companydetails';
import User from './usermanagement';

const Account = () => {
  const [showProfile, setShowProfile] = useState(true);
  const [showCompany, setShowCompany] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [showContract, setShowContract] = useState(false);

  const toggleProfile = () => {
    setShowProfile(true);
    setShowCompany(false);
    setShowUser(false);
    setShowContract(false);
  };

  const toggleCompanyDetails = () => {
    setShowCompany(true);
    setShowProfile(false);
    setShowUser(false);
    setShowContract(false);
  };
  const toggleContract = () => {
    setShowContract(true);
    setShowCompany(false);
    setShowProfile(false);
    setShowUser(false);
  }

  const toggleUserManagement = () => {
    setShowUser(true);
    setShowCompany(false);
    setShowProfile(false);
    setShowContract(false);
  }

  return (
    <div className='accountHeader'>
        <div className='pacc'>
          <button type='button' className='profile' onClick={toggleProfile}>Profile</button>
        </div>
        {showProfile && <Profile />} {/* Render Profile component when showProfile is true */}
        <div className='pacc'>
          <button type='button' className='profile' onClick={toggleCompanyDetails}>Company Details</button>
        </div>
        {showCompany && <CompanyDetails />} {/* Render Company component when showCompany is true */}
        <div className='pacc'>
          <button type='button' className='profile' onClick={toggleUserManagement}>User Management</button>
          </div>
          {showUser && <User/>}
        <div className='pacc'><button type='button' className='profile' onClick={toggleContract}>Retake Contracts</button></div>
    </div>
  );
};

export default Account;