import React, { useState, useEffect } from 'react';
import './AddNewMember.css';
import serialize from 'form-serialize';
import { Meteor } from 'meteor/meteor';

const UpdateMember = ({ rowData, onClose,  setOpenSnackEdit, setSnackbarColor}) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [emailStatus, setEmailStatus] = useState('');
    const [joiningDate, setJoiningDate] = useState('');
    // const [snackbarColor, setSnackbarColor] = useState('');


    useEffect(() => {
        const {
            fullName,
            email,
            role,
            emailStatus,
            joiningDate,
        } = rowData;

        setFullName(fullName);
        setEmail(email);
        setRole(role);
        setEmailStatus(emailStatus);
        setJoiningDate(joiningDate);
    }, [rowData]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            fullName,
            email,
            role,
            emailStatus,
            joiningDate,
        };

        console.log(formData, 'klll');

        Meteor.call('member.update', { memberId: rowData._id, data: formData }, (error, result) => {
            if (error) {
                console.error('Meteor call error:', error.reason);
                // Handle the error as needed
            } else {
                console.log('User updated successfully:', result);
                setOpenSnackEdit(true);
                setSnackbarColor('green');
                if (onClose) {
                    onClose();
                }

            }
        });


    };

    return (
        <form id="update-member" onSubmit={handleSubmit}>
            <div className='main-member'>
                <div>
                    <label>Full Name:</label><br></br>
                    <input style={{
                        paddingRight: '30px',
                        marginTop: '3px',
                        height: '22px',
                        minWidth: '373px',
                        borderRadius: '10px',
                        border: '1px solid lightgrey'
                    }} type="text" name="firstName" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}/>
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
                    }} type="email" name="email" 
                    value={email}
                onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', paddingTop: '8px' }}>
                    <div>
                        <label>
                            Role:</label><br></br>
                        <select className='select-member' name="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}>
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                        </select>
                    </div>
                    <div>
                        <label>
                            Email Status:</label><br></br>
                        <select className='select-member' name="emailStatus"
                        value={emailStatus}
                        onChange={(e) => setEmailStatus(e.target.value)}>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', paddingTop: '8px' }}>
                    <div>
                        <label>
                            Joining Date:</label><br></br>
                        <input className='select-member' type="date" name="joiningDate" 
                        value={joiningDate}
                        onChange={(e) => setJoiningDate(e.target.value)}/>

                    </div>
                </div>
                <button className='button-member' type="submit">Submit</button>
            </div>
        </form>
    );
};

export default UpdateMember;
