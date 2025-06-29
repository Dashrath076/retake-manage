import React, { useState, useEffect } from 'react';
import "./DeviceHeader.css";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AiOutlinePlus } from "react-icons/ai";
import SearchIcon from '@mui/icons-material/Search';
import DeviceTable from './DeviceTable';
import Devices from '/common/db/addDevice';
import { useTracker } from 'meteor/react-meteor-data';
import AddDevice from '../ControlDesk/adDevice';
import { Meteor } from 'meteor/meteor';
import { useMeteorData } from '/common/hooks/useMeteorData';
import stringToObjectQS from '/common/utils/stringToObjectQS';
import { useLocation } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import Snackbar from '@mui/material/Snackbar';



const DeviceList = () => {
    const [openSnackDeviceSave, setOpenDeviceSnackSave] = useState(false);
    const [snackbarColorDevice, setSnackbarColorDevice] = useState('');

    let location = useLocation();
    const [openDevice, setOpenDevice] = useState(false);
    const [records, setRecords] = useState([]);
    // const [DeviceCount, setDeviceCount] = useState(0);
    const query = location.search ? stringToObjectQS(location.search) : {};

    const handleClose = () => {
        setOpenDevice(false);
    }
    const handleCloseSnackDevice = () => {
        setOpenDeviceSnackSave(false);
    }

    useTracker(() => {
        const deviceSubscription = Meteor.subscribe('devices.all', { ...query });
        if (deviceSubscription.ready()) {
            const devicesData = Devices.find().fetch();
            setRecords(devicesData);
        }

        return () => {
            deviceSubscription.stop();
        };
    }, []);

    useTracker(() => {
        const deviceLifeSpan = Meteor.subscribe('device.all', { ...query });
        if (deviceLifeSpan.ready()) {
            const lifeCycle = Devices.find().fetch();
            setRecords(lifeCycle);
        }
        return () => {
            deviceLifeSpan.stop();
        }
    }, []);

    useTracker(() => {
        const deviceInsurance = Meteor.subscribe('devicess.all', { ...query });
        if (deviceInsurance.ready()) {
            const deviceIns = Devices.find().fetch();
            setRecords(deviceIns);
        }
        return () => {
            deviceInsurance.stop();
        }
    }, []);

    function handleFilter(event) {
        const newData = Devices.find({
            $or: [
                { brandName: { $regex: event.target.value, $options: 'i' } },
                { assignedTo: { $regex: event.target.value, $options: 'i' } },
                { assignedOn: { $regex: event.target.value, $options: 'i' } },
                { location: { $regex: event.target.value, $options: 'i' } },
                { model: { $regex: event.target.value, $options: 'i' } },
                { category: { $regex: event.target.value, $options: 'i' } },
                { type: { $regex: event.target.value, $options: 'i' } },
                { status: { $regex: event.target.value, $options: 'i' } },
            ],
        }).fetch();

        setRecords(newData);
    }
    function filterByCategory(event) {
        const newData = Devices.find({
            $or: [
                { category: { $regex: event.target.value, $options: 'i' } }
            ],
        }).fetch();

        setRecords(newData);
    }

    const { error, isLoading, data: result } = useMeteorData(['countDevices', { ...query }]);
    if (isLoading)
        return <div className='deviceheader'>...loading</div>;
    if (error) console.log('Error counting devices:', error);
    const DeviceCount = result;

    return (
        <div className='deviceheader'>
            <div className='devicesubheader'>
                <div >
                    <div className='deviceleft'>
                        <h5>Devices</h5>

                        <span style={{ color: '#00DC5E', backgroundColor: '#DDFFEC', padding: '2px', borderRadius: '5px' }}>{DeviceCount} devices</span>
                    </div>
                    <p>Keep track devices and its status.</p>
                </div>
                <div className='deviceright'>
                    {/* <button onclick="window.location.href = 'https://www.retake.ae/';">Order devices</button> */}
                    <a href='https://www.retake.ae/' target="_blank">
                        <button>
                            Order devices
                        </button>
                    </a>
                    <button className='devicebutton' onClick={() => setOpenDevice(true)}>Add new device</button>
                    <Snackbar
                        open={openSnackDeviceSave}
                        autoHideDuration={3000}
                        onClose={handleCloseSnackDevice}
                        message="Device Saved Successfully!"
                        ContentProps={{
                            style: {
                                backgroundColor: snackbarColorDevice,
                                zIndex: 40000
                            }
                        }}
                    />
                    <Dialog open={openDevice} onClose={handleClose} >
                        <DialogTitle className='DialogTitle'>
                            <div>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        Close
                                    </Button>
                                </DialogActions>
                            </div>
                            <div style={{ margin: '0 157px', borderBottom: '1px solid #ccc' }}>Add-Device</div>
                        </DialogTitle>
                        <DialogContent
                            style={{
                                flex: '1 1 auto',
                                padding: '0px 129px',
                                overflowY: 'auto',
                            }}>
                            {<AddDevice onClose={handleClose} setOpenDeviceSnackSave={setOpenDeviceSnackSave} setSnackbarColorDevice={setSnackbarColorDevice} />}
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className='allDevices'>
                <div className='alldevice'>
                    <div className='alldevices'>All Devices<select className='select'>
                        <option className='option' value="" disabled selected></option>
                        <option className='option'>Assigned</option>
                        <option className='option'>Unassigned</option>
                    </select></div>
                </div>
                <div className='search-cate'>
                    <div className='categories'>All Categories<select className='select' onChange={filterByCategory}>
                        <option className='option' value="" disabled selected></option>
                        <option className='option'>Smartphone</option>
                        <option className='option'>Tablet</option>
                        <option className='option'>Desktop</option>
                        <option className='option'>Laptop</option>
                        <option className='option'>Macbook</option>
                    </select>
                    </div>
                    <input type="search" placeholder='Search' className='btn search' name="search" id="search" onClick={handleFilter} />
                </div>
            </div>
            <div className='device-table'>
                <DeviceTable data={records} />
            </div>
        </div>
    );
}

export default DeviceList;
