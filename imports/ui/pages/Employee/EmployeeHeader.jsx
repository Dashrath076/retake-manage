import React, { useState, useEffect } from 'react';
import "./EmployeeHeader.css";
import EmployeeTable from './EmployeeTable';
import { useTracker } from 'meteor/react-meteor-data';
import Employees from '/common/db/addEmployee';
import AddEmployee from '../ControlDesk/AddEmployee';
import { Meteor } from 'meteor/meteor';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import Snackbar from '@mui/material/Snackbar';

const Employee = () => {
  const [openEmployee, setOpenEmployee] = useState(false);
  const [records, setRecords] = useState([]);
  const [EmployeeCount, setEmployeeCount] = useState(0);
  const [openSnackEmployee, setOpenEmployeeSnackSave] = useState(false);
  const [colorSnackEmployee, setSnackbarColorEmployee] = useState('');

  const handleClose = () => {
    setOpenEmployee(false);
  }
  const handleOpenEmployee = () => {
    setOpenEmployee(true);
  }
  const handleCloseSnackBarEmployee = () => {
    setOpenEmployeeSnackSave(false);
  }


  useEffect(() => {
    Meteor.call('countEmployees', (error, result) => {
      if (error) {
        console.error('Error counting employees', error);
      } else {
        setEmployeeCount(result);
      }
    });
  }, []);

  useTracker(() => {
    const employeeSubscription = Meteor.subscribe('employees.all');

    if (employeeSubscription.ready()) {
      const employeesData = Employees.find().fetch();
      setRecords(employeesData);
    }

    return () => {
      employeeSubscription.stop();
    };
  }, []);

  function handleFilter(event) {
    const newData = Employees.find({
      $or: [
        { teamName: { $regex: event.target.value, $options: 'i' } },
        { employeeType: { $regex: event.target.value, $options: 'i' } },
        { fullName: { $regex: event.target.value, $options: 'i' } },
        { officialEmail: { $regex: event.target.value, $options: 'i' } },
        { employeeID: parseInt(event.target.value) || null }, // Parse the input value to an integer
        { phoneNumber: parseInt(event.target.value) || null }, // Parse the input value to an integer
        { officeLocation: { $regex: event.target.value, $options: 'i' } }
      ],
    }).fetch();

    setRecords(newData);
  }

  function FilterByTeam(event) {
    const newData = Employees.find({
      $or: [
        { officeLocation: { $regex: event.target.value, $options: 'i' } }
      ],
    }).fetch();

    setRecords(newData);
  }

  function FilterByEmployeeType(event) {
    const newData = Employees.find({
      $or: [
        { employeeType: { $regex: event.target.value, $options: 'i' } }
      ],
    }).fetch();

    setRecords(newData);
  }




  return (
    <div style={{ margin: '0 10px' }}>

      <div className='employeheader'>
        <div className='employesubheader'>
          <div >
            <div className='employeleft'>
              Employee<span style={{ color: '#00DC5E', backgroundColor: '#DDFFEC', padding: '2px', borderRadius: '5px' }}>{EmployeeCount} employes</span>
            </div>
            <p>Keep track employes and its status.</p>
          </div>
          <div className='employeright'>
            <button className='employebutton' onClick={handleOpenEmployee}>Add new employe</button>
            <Snackbar
              open={openSnackEmployee}
              autoHideDuration={3000}
              onClose={handleCloseSnackBarEmployee}
              message="Employee Saved Successfully!"
              ContentProps={{
                style: {
                  backgroundColor: colorSnackEmployee,
                  zIndex: 40000
                }
              }}
            />
            <Dialog open={openEmployee} onClose={handleClose} >
              <DialogTitle className='DialogTitle'>
                <div>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
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
                {<AddEmployee onClose={handleClose} setOpenEmployeeSnackSave={setOpenEmployeeSnackSave} setSnackbarColorEmployee={setSnackbarColorEmployee} />}
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className='allEmployees'>
          <div className='allemploye'>
            <div className='allemployees'>All Employees
              <select className='select' onChange={FilterByEmployeeType}>
                <option className='option' value="" disabled selected></option>
                <option className='option'>Part-time</option>
                <option className='option'>Full-time</option>
                <option className='option'>Contract</option>
                <option className='option'>Intern</option>
              </select></div>
          </div>
          {/* <div style={{ marginRight: '15px' }}> */}
          <div className='categoriesTeam'>Team<select className='select' onChange={FilterByTeam}>
            <option className='option' value="" disabled selected></option>
            <option className='option'>Banglore</option>
            <option className='option'>Abu-Dhabi</option>
          </select></div>
          <input type="search" placeholder='Search' className='btn search' name="search" id="search" onChange={handleFilter} />

        </div>

        <div className='employee-table'>
          <EmployeeTable data={records} />
        </div>
      </div>
    </div>
  );
};

export default Employee;
