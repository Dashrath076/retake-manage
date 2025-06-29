import React, { useState, useEffect, useRef } from 'react';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Profile from './pages/profileDropdown';
import "./Header.css";

const Header = () => {
  const [isShown, setIsShown] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');

  const str = firstName;
  const firstChar = str[0];

  const dropdownRef = useRef(null);

  const dropdown = event => {
    setIsShown(current => !current);
  };

  const handleClickOutside = event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsShown(false);
    }
  };

  useEffect(() => {
    const emailFromLocalStorage = localStorage.getItem('email') || '';
    const firstNameFromLocalStorage = localStorage.getItem('firstName') || '';
    setEmail(emailFromLocalStorage);
    setFirstName(firstNameFromLocalStorage);

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className='container'>
      <div className='navigation'>
        <div className='rightSide'>
          <div className='navigation'>
            <div className='logo'></div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px', gap: '12px' }}>
              <div className='notification' style={{marginTop: '10px'}}><NotificationsNoneIcon /></div>
              <div className='Icon'>{firstChar}</div>
              <div>
                <div>{firstName}</div>
                <div className='admin'>Admin</div>
              </div>
              <div className='select' ref={dropdownRef}>
                <select onClick={dropdown}></select>
              </div>
              {isShown && <Profile />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
