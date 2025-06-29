import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';

const UpdateEmployee = ({ rowData, setOpenSnackEdit, onClose, setSnackbarColor }) => {
    const [teamName, setTeamName] = useState('');
    const [employeeType, setEmployeeType] = useState('');
    const [fullName, setFullName] = useState('');
    const [officialEmail, setOfficialEmail] = useState('');
    const [designation, setDesignation] = useState('');
    const [employeeID, setEmployeeId] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [assignedDevices, setAssignedDevices] = useState('');
    const [officeLocation, setOfficeLocation] = useState('');

    useEffect(() => {
        const {
            teamName,
            employeeType,
            fullName,
            officialEmail,
            designation,
            employeeID,
            phoneNumber,
            assignedDevices,
            officeLocation,
        } = rowData;

        setTeamName(teamName);
        setEmployeeType(employeeType);
        setFullName(fullName);
        setOfficialEmail(officialEmail);
        setDesignation(designation);
        setEmployeeId(employeeID);
        setPhoneNumber(phoneNumber);
        setAssignedDevices(assignedDevices);
        setOfficeLocation(officeLocation);
    }, [rowData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            teamName,
            employeeType,
            fullName,
            officialEmail,
            designation,
            employeeID,
            phoneNumber,
            assignedDevices,
            officeLocation,
        };

        formData.phoneNumber = parseInt(formData.phoneNumber, 10);
        formData.employeeID = parseInt(formData.employeeID, 10);
        formData.assignedDevices = parseInt(formData.assignedDevices, 10);

        Meteor.call('employeeUpdate', { employeeId: rowData._id, data: formData }, (error, result) => {
            if (error) {
                console.error('Meteor call error:', error.reason);
                // Handle the error as needed
            } else {
                console.log('Employee updated successfully:', result);
                setOpenSnackEdit(true);
                setSnackbarColor('green')
                if(onClose){
                    onClose();
                }
                // Handle the successful update
            }
        });
    };
    return (
        <div>
            <form id="update-employee" onSubmit={(e) => handleSubmit(e, rowData._id)}>

                <div className='form-group'>
                    <label for="teamName">Team Name<span style={{ color: 'red' }}>*</span></label><br></br>
                    <input type="text" id="teamName" name="teamName" required
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        style={{
                            paddingRight: '30px',
                            marginTop: '3px',
                            height: '20px',
                            minWidth: '221px',
                            borderRadius: '10px',
                            border: '1px solid lightgrey'
                        }} />
                </div>

                <div className='form-group'>
                    <label for="employeeType">Employee Type</label><br></br>
                    <select id="employeeType" name="employeeType" style={{
                        height: '21px',
                        width: '222px',
                        borderRadius: '10px',
                        border: '1px solid lightgray'
                    }}
                        value={employeeType}
                        onChange={(e) => setEmployeeType(e.target.value)}
                    >
                        <option value="" disabled selected>Select an option</option>
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Contract">Contract</option>
                    </select>
                </div>

                <div className='form-group'>
                    <label for="firstName">Full Name<span style={{ color: 'red' }}>*</span></label><br></br>
                    <input type="text" id="fullName" name="fullName" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)} 
                    required
                        style={{
                            paddingRight: '30px',
                            marginTop: '3px',
                            height: '20px',
                            minWidth: '221px',
                            borderRadius: '10px',
                            border: '1px solid lightgrey'
                        }} />
                </div>


                <div className='form-group'>
                    <label for="designation">Designation<span style={{ color: 'red' }}>*</span></label><br></br>
                    <input type="text" id="designation" name="designation" required
                     value={designation}
                     onChange={(e) => setDesignation(e.target.value)}
                        style={{
                            paddingRight: '30px',
                            marginTop: '3px',
                            height: '20px',
                            minWidth: '221px',
                            borderRadius: '10px',
                            border: '1px solid lightgrey'
                        }} />
                </div>

                <div className='form-group'>
                    <label for="officialEmail">Official Email Address<span style={{ color: 'red' }}>*</span></label><br></br>
                    <input type="email" id="officialEmail" name="officialEmail" required
                    value={officialEmail}
                    onChange={(e) => setOfficialEmail(e.target.value)}
                        style={{
                            paddingRight: '30px',
                            marginTop: '3px',
                            height: '20px',
                            minWidth: '221px',
                            borderRadius: '10px',
                            border: '1px solid lightgrey'
                        }} />
                </div>

                <div className='form-group'>
                    <label for="employeeID">Employee ID<span style={{ color: 'red' }}>*</span></label><br></br>
                    <input type="text" id="employeeID" name="employeeID" pattern="[0-9]{1,}" title="e.g., 1234" required
                    value={employeeID}
                    onChange={(e) => setEmployeeId(e.target.value)}
                        style={{
                            paddingRight: '30px',
                            marginTop: '3px',
                            height: '20px',
                            minWidth: '221px',
                            borderRadius: '10px',
                            border: '1px solid lightgrey'
                        }} />
                </div>

                <div className='form-group'>
                    <label for="phoneNumber">Phone Number<span style={{ color: 'red' }}>*</span></label><br></br>
                    <input type="tel" id="phoneNumber" name="phoneNumber" pattern="\+[0-9]{1,}" title="e.g., +971123456770" required
                    value={phoneNumber} 
                    onChange={(e) => setPhoneNumber(e.target.value)}
                        style={{
                            paddingRight: '30px',
                            marginTop: '3px',
                            height: '20px',
                            minWidth: '221px',
                            borderRadius: '10px',
                            border: '1px solid lightgrey'
                        }} />
                </div>

                <div className='form-group'>
                    <label for="assignedDevices">Assigned Devices<span style={{ color: 'red' }}>*</span></label><br></br>
                    <input type="number" id="assignedDevices" name="assignedDevices" title="1,2,3, etc.." required
                    value={assignedDevices}
                    onChange={(e) => setAssignedDevices(e.target.value)}
                        style={{
                            paddingRight: '30px',
                            marginTop: '3px',
                            height: '20px',
                            minWidth: '221px',
                            borderRadius: '10px',
                            border: '1px solid lightgrey'
                        }} />
                </div>

                <div className='form-group'>
                    <label for="officeLocation">Office Location</label><br></br>
                    <input type="text" id="officeLocation" name="officeLocation" 
                    value={officeLocation}
                    onChange={(e) => setOfficeLocation(e.target.value)}
                        style={{
                            paddingRight: '30px',
                            marginTop: '3px',
                            height: '20px',
                            minWidth: '221px',
                            borderRadius: '10px',
                            border: '1px solid lightgrey'
                        }} />
                </div>

                <div className='form-group'>
                    <button type="submit" value="Submit" style={{
                        backgroundColor: '#00DC5E',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '10px',
                        height: '29px',
                        padding: '10px',
                        paddingLeft: '22px',
                        paddingRight: '26px',
                        paddingTop: '6px',
                        margin: '26px 82px',
                        display: 'flex'
                    }}>Update</button>
                </div>
            </form>
        </div>
    );
}
export default UpdateEmployee;