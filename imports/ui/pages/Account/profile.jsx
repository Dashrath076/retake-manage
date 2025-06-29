import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import UpBelowIcon from '@mui/icons-material/UnfoldMore';
import serialize from 'form-serialize';
import './profile.css';

const Profile = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [closed, setClosed] = useState(false);
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [altphone, setAltphone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = document.getElementById('update-profile');
        const formData = serialize(form, { hash: true });
        console.log('profileData:',formData);

        const Phone = `${formData.countryCode} ${formData.phone}`;
        formData.phone = Phone;
        const AltPhone = `${formData.countryCode} ${formData.altphone}`;
        formData.altphone = AltPhone;
        
        delete formData.countryCode;
        delete formData.altCountryCode;

        const { firstName, lastName, email, phone, altphone } = formData;

        const userId = Meteor.userId();

        Meteor.call('users.updateProfile', userId, { firstName, lastName, email, phone, altphone }, (error, result) => {
            if (error) {
                // Handle error
                console.error('Error updating profile:', error.reason);
            } else {
                // Handle success
                console.log('Profile updated:', result);
            }
        });
    };

    const handleChangePassword = (e) => {
        e.preventDefault();

        const form = document.getElementById('change-password');
        const formData = serialize(form, { hash: true });
        console.log('change Password:',formData);

    }
    //get currentUser data
    useEffect(() => {
        const emailFromLocalStorage = localStorage.getItem('email') || '';
        const firstNameFromLocalStorage = localStorage.getItem('firstName') || '';
        const lastNameFromLocalStorage = localStorage.getItem('lastName') || '';
        const phoneFromLocalStorage = localStorage.getItem('phone') || '';
        const cleanedPhone = phoneFromLocalStorage.replace(/^(\+971|\+91)\s?/, '');
        const altphoneFromLocalStorage = localStorage.getItem('altphone') || '';
        const cleanedAltphone = altphoneFromLocalStorage.replace(/^(\+971|\+91)\s?/, '');
        

        setEmail(emailFromLocalStorage);
        setFirstName(firstNameFromLocalStorage);
        setLastName(lastNameFromLocalStorage);
        setPhone(cleanedPhone);
        setAltphone(cleanedAltphone);
    }, []);


    return (
        <div className="collapse">
            <p>Profile-Settings
                <button className='arrow' onClick={() => setCollapsed(!collapsed)}><UpBelowIcon /></button>
            </p>
            <div className={`content ${collapsed ? 'collapsed' : ''}`}>
                <div className='profile-settings'>
                    <><form id="update-profile" onSubmit={handleSubmit}>
                        <div className='profile1'>Profile Name
                            <div className='main-dp'>
                                <div><img src="/Image-100.png" className='dp' /></div>
                                <div>
                                    <div style={{ paddingBottom: '10px' }}>Upload your avatar</div>
                                    <h5 style={{ fontWeight: '10px', color: 'lightgray', paddingBottom: '5px' }}>photo should be at least 300px * 300px</h5>
                                    <div className='upload'>
                                        <button type='button' className='upload'>Upload Photo</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap' }}>
                                <div>
                                    <label htmlFor="fname"><b>First Name*</b></label><br />

                                    <input
                                        type="text"
                                        id="fname"
                                        className='in'
                                        name='firstName'
                                        required
                                        value={firstName} // Use state value for firstName
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />

                                </div>
                                <div>
                                    <label htmlFor="lname"><b>Last Name*</b></label><br />
                                    <input
                                        type="text"
                                        id="lname"
                                        name='lastName'
                                        className='lastin'
                                        required
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '47px', flexWrap: 'wrap' }}>
                                <div>
                                    <label htmlFor="email"><b>Email*</b></label><br />
                                    <input
                                        type="text"
                                        id="email"
                                        name='email'
                                        className='in'
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className='pn'>
                                    <label htmlFor="phone"><b>Phone number*</b></label><br />
                                    <select className='sl' name='countryCode' onChange={(e) => setCountryCode(e.target.value)}>
                                        <option>+971</option>
                                        <option>+91</option>
                                    </select>
                                    <input type="tel" id="phone" name='phone' className='in' value={phone}
                                        onChange={(e) => setPhone(e.target.value)} />
                                    <button type='button' className='verify'>Verify</button>
                                </div>
                            </div>
                            <div className='altph'>
                                <label htmlFor="altphone"><b>Alternative contact number</b></label><br />
                                <select className='sl' name='altCountryCode'  onChange={(e) => setCountryCode(e.target.value)}>
                                    <option>+971</option>
                                    <option>+91</option>
                                </select>
                                <input className='an' type="tel" id="altphone" name='altphone' value={altphone}
                                    onChange={(e) => setAltphone(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <button className='change-password' type='submit'>Update</button>
                        </div>
                    </form>
                    </>
                </div>
            </div>
            <p>Change Password Settings
                <button className='arrow' onClick={() => setClosed(!closed)}><UpBelowIcon /></button>
            </p>
            <div className={`content ${closed ? 'closed' : ''}`} >
                <h3 style={{ paddingBottom: '15px' }}>Change password</h3>
                <form id="change-password" onSubmit={handleChangePassword}>
                <div><b>Current password*</b><br />
                    <input type="password" id="currentPassword" className='chin' name='oldPassword' />
                </div>
                <div><b>New password*</b><br />
                    <input type="password" id="newPassword" className='chin' name='newPassword'/>
                </div>
                <div><b>Confirm password*</b><br />
                    <input type="password" id="confirmPassword" className='chin' name='confirmPassword' />
                </div>
                <div>
                <button className='change-password' type='submit'>Change Password</button>
                </div>
            </form>
            </div>
        </div>
    );
};

export default Profile;
