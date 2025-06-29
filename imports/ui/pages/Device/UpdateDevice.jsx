import React, {useState,useEffect} from 'react';
import {Meteor} from 'meteor/meteor'

function updateDevice({rowData, setOpenSnackEdit, onClose, setSnackbarColor}){
    
    const [category, setCategory] = useState('');
    const [brandName, setBrandName] = useState('');
    const [model, setModel] = useState('');
    const [serialNumber ,setSerialNumber] = useState('');
    const [location, setLocation] = useState('');
    const [assignedOn, setAssignedOn] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [warranty, setWarranty] = useState('');
    const [lifeSpan, setLifeSpan] = useState('');
    

    useEffect(() => {
        const {
            category,
            brandName,
            model,
            serialNumber,
            location,
            assignedOn,
            assignedTo,
            warranty,
            lifeSpan,
        } = rowData;

        setCategory(category);
        setBrandName(brandName);
        setModel(model);
        setSerialNumber(serialNumber);
        setLocation(location);
        setAssignedOn(assignedOn);
        setAssignedTo(assignedTo);
        setWarranty(warranty);
        setLifeSpan(lifeSpan);
    }, [ rowData ]);
    

    const handleSubmit = (e) => {
        e.preventDefault();


        const formData = {
            category,
            brandName,
            model,
            serialNumber,
            location,
            assignedOn,
            assignedTo,
            warranty,
            lifeSpan,
        };

        formData.serialNumber = parseInt(formData.serialNumber, 10);
        formData.assignedOn = new Date(formData.assignedOn);
        formData.warranty = new Date(formData.warranty);
        formData.lifeSpan = new Date(formData.lifeSpan);

        Meteor.call('device.update', { deviceId: rowData._id, data: formData }, (error, result) => {
            if (error) {
                console.error('Meteor call error:', error.reason);
            } else {
                console.log('Device updated successfully!', result);
                setOpenSnackEdit(true);
                setSnackbarColor('green');
                if(onClose){
                    onClose();
                }
            }
        });
    };

    return (
        <form id="update-device" onSubmit={handleSubmit}> 

            <div className='form-group'>
                <label for="category">Device Category<span style={{ color: 'red' }}>*</span></label><br></br>
                <select style={{
                    paddingRight: '30px',
                    marginTop: '3px',
                    height: '21px',
                    minWidth: '222px',
                    borderRadius: '10px',
                    border: '1px solid lightgrey'
                }} id="category" name="category" required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="Laptop">Laptop</option>
                    <option value="Desktop">Desktop</option>
                    <option value="Smartphone">Smartphone</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div className='form-group'>
                <label for="brandName">Brand Name<span style={{ color: 'red' }}>*</span></label><br></br>
                <input type="text" id="brandName" name="brandName" 
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)} 
                placeholder="e.g., Apple, HP" required
                    style={{
                        paddingRight: '30px',
                        marginTop: '3px',
                        height: '20px',
                        minWidth: '221px',
                        borderRadius: '10px',
                        border: '1px solid lightgrey'
                    }}
                    // value={formData.brandName}
                    // onChange={(e) => setFormData({ ...formData, brandName: e.target.value })} 
                    />
            </div>

            <div className='form-group'>
                <label for="model">Model<span style={{ color: 'red' }}>*</span></label><br></br>
                <input type="text" id="model" name="model" placeholder="e.g., MacBook Pro" required
                value={model}
                onChange={(e) => setModel(e.target.value)}
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
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
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
                 value={location}
                 onChange={(e) => setLocation(e.target.value)}   
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
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
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
                Value={new Date(rowData.assignedOn).toISOString().substring(0, 10)} 
                onChange={(e) => setAssignedOn(e.target.value)}
                
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
                <input type="date" id="warranty" name="warranty"  
                Value={new Date(rowData.warranty).toISOString().substring(0, 10)} 
                onChange={(e) => setWarranty(e.target.value)}
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
                <input type="date" id="lifeSpan" name="lifeSpan" 
                Value={new Date(rowData.lifeSpan).toISOString().substring(0, 10)} 
                onChange={(e) => setLifeSpan(e.target.value)}
                placeholder="exp: 12/18/2025"
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
                }}>Update</button>
            </div>
        </form>

    );
}
export default updateDevice;