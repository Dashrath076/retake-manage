import React, { useState, useEffect } from 'react';
import { AiOutlinePlus } from "react-icons/ai";
import DevicesIcon from '@mui/icons-material/Devices';
import BadgeIcon from '@mui/icons-material/Badge';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DeviceProtection from '@mui/icons-material/SystemSecurityUpdateGood';
import RecyclingIcon from '@mui/icons-material/Recycling';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "./Details.css";
import Subscribe from './SubscribeForm';
import AddEmployee from './AddEmployee';
import AddDevice from './adDevice';
import Frame from './Designs';
import { Meteor } from 'meteor/meteor';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import objectToQueryQs from '/common/utils/objectToQueryStringQs';
// import Link from '@material-ui/core/Link';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import RepairDevice from '../Device/RepairDevice';
import Snackbar from '@mui/material/Snackbar';

const Details = () => {
  const [openSnackDeviceSave, setOpenDeviceSnackSave] = useState(false);
  const [snackbarColor, setSnackbarColorDevice] = useState('');
  const [openSnackEmployeeSave, setOpenEmployeeSnackSave] = useState(false);
  const [snackbarColorEmployee, setSnackbarColorEmployee] = useState('');

  const location = useLocation();


  const navigate = useNavigate();
  const [openInsurance, setOpenInsurance] = useState(false);
  const [openRepair, setOpenRepair] = useState(false);
  const [openSubscribe, setOpenSubscribe] = useState(false);
  const [openEmployee, setOpenEmployee] = useState(false);
  const [openDevice, setOpenDevice] = useState(false);
  const [deviceCount, setDeviceCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [warrantyExpCount, setWarrantyExpCount] = useState(0);
  const [lifeSpanCount, setLifeSpanExpCount] = useState(0);
  const [insCount, setDeviceInsuranceEnded] = useState(0);


  console.log(location, history, 'navigate')
  useEffect(() => {
    Meteor.call('countDevices', (error, result) => {
      if (error) {
        console.error('Error calling countDevices:', error.reason);
      } else {
        setDeviceCount(result);
      }
    });
    Meteor.call('countDevicesWarranty', { warrantyType: 'expired' }, (error, result) => {
      if (error) {
        console.error('Error calling countDevices:', error.reason);
      } else {
        setWarrantyExpCount(result);
      }
    });
    Meteor.call('countDevicesLifeSpan', { lifeSpanType: 'ended' }, (error, result) => {
      if (error) {
        console.error('Error calling countDevices:', error.reason);
      } else {
        setLifeSpanExpCount(result);
      }
    });
    Meteor.call('countEmployees', (error, result) => {
      if (error) {
        console.error('Error counting employees', error);
      } else {
        setEmployeeCount(result);
      }
    });
    Meteor.call('countDevicesInsuranceEnded', { lifeSpanType: 'over' }, (error, resullt) => {
      if (error) {
        console.error('error calling countInsurancended', error.reason);
      } else {
        setDeviceInsuranceEnded(resullt);
      }
    })
  }, []);
  const handleWarrantyButtonClicked = () => {
    const url = `/devices/${objectToQueryQs({ warrantyType: 'expired' })}`;
    //window.open(window.location.href + url, '_blank');
    navigate(url);
  };
  const handleViewDevicesClicked = () => {
    const url = `/devices/${objectToQueryQs({ lifeCycleType: 'ended' })}`;
    navigate(url);
  }
  const handleViewDeviceInsurance = () => {
    const url = `/devices/${objectToQueryQs({ insuranceType: 'over' })}`;
    navigate(url);
  }
  // const handleWarrantyButtonClicked = () => {
  //     const url = `/devices/${objectToQueryQs({warrantyType: 'expired'})}`
  //     // window.open(window.location.href + url, '_blank');
  //     navigate(url);
  // }

  const handleopenrepair = () => {
    setOpenRepair(true);
  }
  const handleopeninsurance = () => {
    setOpenInsurance(true);
  }
  const handleClose = () => {
    setOpenRepair(false);
  }
  const handleCloseInsuranse = () => {
    setOpenInsurance(false);
  }
  const handleCloseDevice = () => {
    setOpenDevice(false);
  }
  const handleCloseEmployee = () => {
    setOpenEmployee(false);
  }
  const handleCloseRent = () => {
    setOpenSubscribe(false);
  }

  const handleCloseSnackBarDevice = () => {
    setOpenDeviceSnackSave(false);
  }
  const handleCloseSnackBarEmployee = () => {
    setOpenEmployeeSnackSave(false);
  }


  return (
    <><div className='cards'>
      <div className='card'>
        <div className='dicon'>
          <div>
            <DevicesIcon />
          </div>
          <div>
            <MoreVertIcon />
          </div>
        </div>
        <div className='name'>Total Device</div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className='countnumber'>{deviceCount}</div>
          <div><button type='button' className='addtext' onClick={() => setOpenDevice(true)}>
            <AiOutlinePlus /> Add device
          </button>
            <Snackbar
              open={openSnackDeviceSave}
              autoHideDuration={3000}
              onClose={handleCloseSnackBarDevice}
              message="Device Saved Successfully!"
              ContentProps={{
                style: {
                  backgroundColor: snackbarColor,
                  zIndex: 40000
                }
              }}
            />
          </div>
        </div>
        {/* <Popup openDevice={openDevice} setOpenDevice={setOpenDevice}>
                    {openDevice && <AddDevice />}
                </Popup> */}
        <Dialog open={openDevice} onClose={handleCloseDevice} >
          <DialogTitle className='DialogTitle'>
            <div>
              <DialogActions>
                <Button onClick={handleCloseDevice} color="primary">
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
            {<AddDevice onClose={handleCloseDevice} setOpenDeviceSnackSave={setOpenDeviceSnackSave} setSnackbarColorDevice={setSnackbarColorDevice} />}
          </DialogContent>
        </Dialog>

      </div>
      <div className='card'>
        <div className='dicon'>
          <BadgeIcon />
          <div>
            <MoreVertIcon />
          </div>
        </div>
        <div className='name'>Employees</div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className='countnumber'>
            {employeeCount}
          </div>
          <div>
            <button type='button' className='addtext' onClick={() => setOpenEmployee(true)}>
              <AiOutlinePlus /> Add employee
            </button>
            <Snackbar
              open={openSnackEmployeeSave}
              autoHideDuration={3000}
              onClose={handleCloseSnackBarEmployee}
              message="Employee Saved Successfully!"
              ContentProps={{
                style: {
                  backgroundColor: snackbarColorEmployee,
                  zIndex: 40000
                }
              }}
            />
          </div>
        </div>
        <Dialog open={openEmployee} onClose={handleCloseEmployee} >
          <DialogTitle className='DialogTitle'>
            <div>
              <DialogActions>
                <Button onClick={handleCloseEmployee} color="primary">
                  Close
                </Button>
              </DialogActions>
            </div>
            <div style={{ margin: '0 157px', borderBottom: '1px solid #ccc' }}>Add-Employee</div>
          </DialogTitle>
          <DialogContent
            style={{
              flex: '1 1 auto',
              padding: '0px 129px',
              overflowY: 'auto',
            }}>
            {<AddEmployee onClose={handleCloseEmployee} setOpenEmployeeSnackSave={setOpenEmployeeSnackSave} setSnackbarColorEmployee={setSnackbarColorEmployee} />}
          </DialogContent>
        </Dialog>

      </div>

      <div className='card'>
        <div className='dicon'>
          <CheckBoxIcon />
        </div>
        <div className='subText'>Are you thinking to Audit your device?</div>
        <div>
          <button className='oredrBtn ' onClick={() => setOpenSubscribe(true)}>Audit</button>
        </div>
        <Dialog open={openSubscribe} onClose={handleCloseRent} >
          <DialogTitle className='DialogTitle'>
            <div>
              <DialogActions>
                <Button onClick={handleCloseRent} color="primary">
                  Close
                </Button>
              </DialogActions>
            </div>
            <div style={{ margin: '0 157px', borderBottom: '1px solid #ccc' }}>Audit Device</div>
          </DialogTitle>
          <DialogContent
            style={{
              flex: '1 1 auto',
              padding: '0px 129px',
              overflowY: 'auto',
            }}>
            {<Subscribe onClose={handleCloseRent} />}
          </DialogContent>
        </Dialog>
      </div>
      <div className='card'>
        <div className='name'>Devices</div>
        <h3 style={{ color: 'red', fontWeight: 'bold' }}>
          Warranty-expired
        </h3>
        <div className='countnumber'>{warrantyExpCount}</div>
        <div>

          <button onClick={handleWarrantyButtonClicked} className='addtext ' >View</button>
        </div>
      </div>
      <div className='card'>
        <div style={{ display: 'flex' }}>
          <div className='dicon'><RecyclingIcon /></div>
          <h3 style={{ color: 'red', fontWeight: 'bold' }}>
            End of lifeCylcle
          </h3>
        </div>
        <div className='inscount'>{lifeSpanCount}</div>
        <div className='name'>Devices</div>
        <div className='insButton'>
          <div>
            <button className='instextbutton' onClick={handleopenrepair}>Repair</button>
            <Dialog open={openRepair} onClose={handleClose} >
              <DialogTitle className='DialogTitle'>
                <div>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Close
                    </Button>
                  </DialogActions>
                </div>
                <div style={{ margin: '0 157px', borderBottom: '1px solid #ccc' }}>Repair</div>
              </DialogTitle>
              <DialogContent
                style={{
                  flex: '1 1 auto',
                  padding: '0px 129px',
                  overflowY: 'auto',
                }}>
                {<RepairDevice onClose={handleClose} />}
              </DialogContent>
            </Dialog>
          </div>
          <div>
            <button onClick={handleViewDevicesClicked} className='instextbutton'>View</button>
          </div>
        </div>
      </div>
      <div className='card'>
        <div style={{ display: 'flex' }}>
          <div className='dicon'><DeviceProtection /></div>
          <h3 style={{ color: 'red', fontWeight: 'bold' }}>
            Device Protection
          </h3>
        </div>
        <div className='inscount'>{insCount}</div>
        <div className='name'>Devices</div>
        <div className='insButton'>
          <div>
            <button className='instextbutton' onClick={handleopeninsurance}>Buy Insurance</button>
            <Dialog open={openInsurance} onClose={handleCloseInsuranse} >
              <DialogTitle className='DialogTitle'>
                <div>
                  <DialogActions>
                    <Button onClick={handleCloseInsuranse} color="primary">
                      Close
                    </Button>
                  </DialogActions>
                </div>
                <div style={{ margin: '0 157px', borderBottom: '1px solid #ccc' }}>Buy Insurance</div>
              </DialogTitle>
              <DialogContent
                style={{
                  flex: '1 1 auto',
                  padding: '0px 129px',
                  overflowY: 'auto',
                }}>
                {<RepairDevice onClose={handleCloseInsuranse} />}
              </DialogContent>
            </Dialog>
          </div>
          <div>
            <button onClick={handleViewDeviceInsurance} className='instextbutton' >View</button>
          </div>
        </div>
      </div>
    </div><div>
        <Frame />
      </div></>
  );
};

export default Details;
