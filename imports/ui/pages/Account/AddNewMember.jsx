import React from 'react';
import './AddNewMember.css';
import serialize from 'form-serialize';
import { Meteor } from 'meteor/meteor';

const AddNewMember = ({ onClose, setSnackbarColorMember, setOpenSnackMember }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = serialize(document.getElementById('add-member'), { hash: true });
    console.log(formData, 'klll');

    const fullName = `${formData.firstName} ${formData.lastName}`;
    formData.fullName = fullName;

    delete formData.firstName;
    delete formData.lastName;


    Meteor.call('newMember.save', { data: formData }, (error) => {
      if (error) {
        console.log(error.reason);
      } else {
        setOpenSnackMember(true);
        setSnackbarColorMember('green');
        if (onClose) {
          onClose();
        }
      }
    });

  };

  return (
    <form id="add-member" onSubmit={handleSubmit}>
      <div className='main-member'>
        <div>
          <label>First Name:</label><br></br>
          <input style={{
            paddingRight: '30px',
            marginTop: '3px',
            height: '22px',
            minWidth: '373px',
            borderRadius: '10px',
            border: '1px solid lightgrey'
          }} type="text" name="firstName" />
        </div>
        <div>
          <label>Last Name:</label><br></br>
          <input style={{
            paddingRight: '30px',
            marginTop: '3px',
            height: '22px',
            minWidth: '373px',
            borderRadius: '10px',
            border: '1px solid lightgrey'
          }} type="text" name="lastName" />
        </div>
        <div>
          <label>Email</label><br></br>
          <input style={{
            paddingRight: '30px',
            marginTop: '3px',
            height: '22px',
            minWidth: '373px',
            borderRadius: '10px',
            border: '1px solid lightgrey'
          }} type="email" name="email" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', paddingTop: '8px' }}>
          <div>
            <label>
              Role:</label><br></br>
            <select className='select-member' name="role">
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>
          <div>
            <label>
              Email Status:</label><br></br>
            <select className='select-member' name="emailStatus">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', paddingTop: '8px' }}>
          <div>
            <label>
              Joining Date:</label><br></br>
            <input className='select-member' type="date" name="joiningDate" />

          </div>
          <div>
            <label>
              Action:</label><br></br>
            <select className='select-member' name="action">
              <option value="Full">Full</option>
              <option value="View">View</option>
            </select>
          </div>
        </div>
        <button className='button-member' type="submit">Submit</button>
      </div>
    </form>
  );
};

export default AddNewMember;
