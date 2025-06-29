import React from 'react';
import './AddDevice.css';
import { Meteor } from 'meteor/meteor';

const addDevice = ({ onClose, setSnackbarColorDevice, setOpenDeviceSnackSave}) => {

    const handleSubmit = (e) => {
        let serialize = require('form-serialize');
        e.preventDefault();
        const form = document.getElementById('add-device');
        const formData = serialize(form, { hash: true });
        console.log(formData, 'klll');
        formData.serialNumber = parseInt(formData.serialNumber, 10);
        formData.assignedOn = new Date(formData.assignedOn);
        formData.warranty = new Date(formData.warranty);
        formData.lifeSpan = new Date(formData.lifeSpan);

        Meteor.call('addDevice.save', { data: formData }, (error) => {
            if (error) {
                console.log(error.reason);
            } else {
                setOpenDeviceSnackSave(true);
                setSnackbarColorDevice('green');
                // Reset the form after successful submission
                form.reset();
                if (onClose) {
                    onClose();
                }
            }
        });
    };




    return (
        <form id="add-device" onSubmit={handleSubmit}>

            <div className='form-group'>
                <label for="category">Device Category<span style={{ color: 'red' }}>*</span></label><br></br>
                <select style={{
                    paddingRight: '30px',
                    marginTop: '3px',
                    height: '21px',
                    minWidth: '222px',
                    borderRadius: '10px',
                    border: '1px solid lightgrey'
                }} id="category" name="category" required>
                    <option value="Laptop">Laptop</option>
                    <option value="Desktop">Desktop</option>
                    <option value="Smartphone">Smartphone</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div className='form-group'>
                <label for="brandName">Brand Name<span style={{ color: 'red' }}>*</span></label><br></br>
                <input type="text" id="brandName" name="brandName" placeholder="e.g., Apple, HP" required
                    style={{
                        paddingRight: '30px',
                        marginTop: '3px',
                        height: '20px',
                        minWidth: '221px',
                        borderRadius: '10px',
                        border: '1px solid lightgrey'
                    }}
                 />
            </div>

            <div className='form-group'>
                <label for="model">Model<span style={{ color: 'red' }}>*</span></label><br></br>
                <input type="text" id="model" name="model" placeholder="e.g., MacBook Pro" required
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
                <label for="deviceSerialNumber">Device Serial Number<span style={{ color: 'red' }}>*</span></label><br></br>
                <input type="text" id="serialNumber" name="serialNumber" placeholder="e.g., 1234xxx" required
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
                <label for="deviceLocation">Device Location</label><br></br>
                <input type="text" id="location" name="location" placeholder="Office location or remote employee city"
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
                <label for="assignedTo">Assigned To</label><br></br>
                <input type="text" id="assignedTo" name="assignedTo" placeholder="Assigned-to"
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
                <label for="assignedOn">Assigned On</label><br></br>
                <input type="date" id="assignedOn" name="assignedOn" placeholder="Assigned-on"
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
                <label for="assignedOn">Warranty upto</label><br></br>
                <input type="date" id="warranty" name="warranty" placeholder="Warranty"
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
                <label for="assignedOn">Device Life-span</label><br></br>
                <input type="date" id="lifeSpan" name="lifeSpan" placeholder="exp: 12/18/2025"
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
                <label for="additionalNotes">Additional Notes</label><br></br>
                <textarea id="note" name="note" rows="4" cols="50" style={{
                    maxWidth: '248px',
                    borderRadius: '10px',
                    border: '1px solid lightgrey',
                    paddingTop: '7px'
                }}></textarea>
            </div>

            <div className='form-group'>
                <button type="submit" value="Add Device" style={{
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
                }} >Add</button>
            </div>
        </form>

    );
}
export default addDevice;