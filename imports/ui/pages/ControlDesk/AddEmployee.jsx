import React from 'react';
import { Meteor } from 'meteor/meteor';



const AddEmployee = ({ onClose, setOpenEmployeeSnackSave, setSnackbarColorEmployee }) => {
    const handleSubmit = (e) => {
        let serialize = require('form-serialize');
        e.preventDefault();
        const form = document.getElementById('add-employee');
        const formData = serialize(form, { hash: true });
        console.log(formData, 'klll');

        const fullName = `${formData.firstName} ${formData.lastName}`;
        formData.fullName = fullName;

        delete formData.firstName;
        delete formData.lastName;

        formData.phoneNumber = parseInt(formData.phoneNumber, 10);
        formData.employeeID = parseInt(formData.employeeID, 10);
        formData.assignedDevices = parseInt(formData.assignedDevices, 10);


        Meteor.call('addEmployee.save', { data: formData }, (error) => {
            if (error) {
                console.log(error.reason);
            } else {
                setOpenEmployeeSnackSave(true);
                setSnackbarColorEmployee('green');
                form.reset();
                if (onClose) {
                    onClose();
                }
            }
        });
    };
    return (
        <div>
            <form id="add-employee" onSubmit={handleSubmit}>

                <div className='form-group'>
                    <label for="teamName">Team Name<span style={{ color: 'red' }}>*</span></label><br></br>
                    <select id="teamName" name="teamName" style={{
                        height: '21px',
                        width: '222px',
                        borderRadius: '10px',
                        border: '1px solid lightgray'
                    }}>
                        <option value="" disabled selected>Select</option>
                        <option value="Abu Dhabi">Abu Dhabi</option>
                        <option value="Bangalore">Banglore</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                <div className='form-group'>
                    <label for="employeeType">Employee Type</label><br></br>
                    <select id="employeeType" name="employeeType" style={{
                        height: '21px',
                        width: '222px',
                        borderRadius: '10px',
                        border: '1px solid lightgray'
                    }}>
                        <option value="" disabled selected>Select an option</option>
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Contract">Contract</option>
                    </select>
                </div>

                <div className='form-group'>
                    <label for="firstName">First Name<span style={{ color: 'red' }}>*</span></label><br></br>
                    <input type="text" id="firstName" name="firstName" required
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
                    <label for="lastName">Last Name<span style={{ color: 'red' }}>*</span></label><br></br>
                    <input type="text" id="lastName" name="lastName" required
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
                    }}>Save</button>
                </div>
            </form>
        </div>
    );
}
export default AddEmployee;