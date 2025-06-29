import React,{useEffect, useState} from 'react';
import {Meteor} from 'meteor/meteor';
import "../ControlDesk/SubscribeForm.css";


const RepairDevice = ({onClose}) => {
    const[email, setEmail] = useState('');
    const[fullName, setFullName] = useState('');
    const[phone, setPhone] = useState('');

    const handleSubmit = (e) => {
        let serialize = require('form-serialize');
        e.preventDefault();
        const form = document.getElementById('subscribe-form');
        const formData = serialize(form, {hash: true});  
        console.log(formData, 'klll');
        formData.numberOfDevices = parseInt(formData.numberOfDevices, 10);

        
        //server code
        Meteor.call('subscription.save', {data: formData}, (error) => {
            if (error) {
                console.log(error.reason);
            } else {
                // Reset the form after successful submission
                form.reset();
                if (onClose) {
                    onClose();
                }
            }
        });
        onSubmit;
    };
    useEffect(() => {
        const emailFromLocalStorage = localStorage.getItem('email') || '';
        const firstNameFromLocalStorage = localStorage.getItem('firstName') || '';
        const lastNameFromLocalStorage = localStorage.getItem('lastName') || '';
        const phoneFromLocalStorage = localStorage.getItem('phone') || '';
        const cleanedPhone = phoneFromLocalStorage.replace(/^(\+971|\+91)\s?/, '');
        // const altphoneFromLocalStorage = localStorage.getItem('altphone') || '';
        // const cleanedAltphone = altphoneFromLocalStorage.replace(/^(\+971|\+91)\s?/, '');
        

        setEmail(emailFromLocalStorage);
        const fullName = `${firstNameFromLocalStorage} ${lastNameFromLocalStorage}`;
        setFullName(fullName.trim());
        setPhone(cleanedPhone);
    }, []);

    return (
        <div>
            <form id="subscribe-form" onSubmit={handleSubmit}>
                <div className='form-group'>
                <label for="name">Customer Name</label><br></br>
                <input type="text" id="name" name="customer.name" value={fullName} disabled
                style={{
                    paddingRight: '30px',
                    marginTop: '3px',
                    height: '20px',
                    minWidth: '221px',
                    borderRadius: '10px',
                    border: '1px solid lightgrey',
                    cursor: 'not-allowed'
                }}/>
                </div>
                
                <div className='form-group'>
                <label for="name">Customer Number</label><br></br>
                <input type="number" id="number" name="customer.phone" value={phone} disabled
                style={{
                    paddingRight: '30px',
                    marginTop: '3px',
                    height: '20px',
                    minWidth: '221px',
                    borderRadius: '10px',
                    border: '1px solid lightgrey',
                    cursor: 'not-allowed'
                }}/>
                </div>
                
                <div className='form-group'>
                <label for="email">Email Id</label><br></br>
                <input type="email" id="email" name="customer.email" value={email} disabled
                style={{
                    paddingRight: '30px',
                    marginTop: '3px',
                    height: '20px',
                    minWidth: '221px',
                    borderRadius: '10px',
                    border: '1px solid lightgrey',
                    cursor: 'not-allowed'
                }}/>
                </div>
                
                <div className='form-group'>
                <label for="deviceCategory">Device Category:</label><br></br>
                <select id="deviceCategory" name="deviceType" required 
                style={{
                    paddingRight: '30px',
                    marginTop: '3px',
                    height: '21px',
                    minWidth: '222px',
                    borderRadius: '10px',
                    border: '1px solid lightgrey'
                }}>
                    <option value="laptop">Laptop</option>
                    <option value="smartphone">Smartphone</option>
                    <option value="tablet">Tablet</option>
                    <option value="desktop">Desktop</option>
                    <option value="other">Other</option>
                </select>
                </div>
                
                <div className='form-group'>
                <label for="d-name">Device Name</label><br></br>
                <input type="text" id="d-name" name="deviceName" required 
                style={{
                    paddingRight: '30px',
                    marginTop: '3px',
                    height: '20px',
                    minWidth: '221px',
                    borderRadius: '10px',
                    border: '1px solid lightgrey'
                }}/>
                </div>
                
                <div className='form-group'>
                <label for="devices">No of Devices</label><br></br>
                <select id="selectNumber" name="numberOfDevices" required
                style={{
                    paddingRight: '30px',
                    marginTop: '3px',
                    height: '21px',
                    minWidth: '222px',
                    borderRadius: '10px',
                    border: '1px solid lightgrey'
                }}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                </div>
                <div>
                    <button className='submitButton' type='submit' style={{
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
                    }}>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default RepairDevice;
