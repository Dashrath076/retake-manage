import React,{useState,useEffect} from 'react';
import "./profileDropdown.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';

export default function dropdown({ onLogout }) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');

  const str = firstName;
  const firstChar = str[0];



  useEffect(() => {
    const emailFromLocalStorage = localStorage.getItem('email') || '';
    const firstNameFromLocalStorage = localStorage.getItem('firstName') || '';
    //const lastNameFromLocalStorage = localStorage.getItem('lastName') || '';

    setEmail(emailFromLocalStorage);
    setFirstName(firstNameFromLocalStorage);
    //setLastName(lastNameFromLocalStorage);
  }, []);
  return (
    <div className='dropdown'>
      <ul className='dp1'>
        <div className='dp'>
            <div className='icon'>{firstChar}</div>
            <ul className='name'>{firstName}
            <ul className='email'>{email}</ul>
            </ul>
        </div><Link to="/accounts" className='manageAccount'>
        <ul>
          <AccountCircleIcon />
          Manage Account
        </ul>
      </Link>
            
            <ul onClick={onLogout} className='logout'><LogoutIcon />Logout</ul>
       </ul>
    </div>
  );
}