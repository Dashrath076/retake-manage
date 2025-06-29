import React from 'react';
import "./EmployeeTable.css";
import DataTable from 'react-data-table-component';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateEmployee from './UpdateEmployee';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import Snackbar from '@mui/material/Snackbar';



const EmployeeTable = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [openSnackEdit, setOpenSnackEdit] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState('');
  const [snackbarColor, setSnackbarColor] = useState('');

  const handleEdit = (row) => {
    setSelectedRowData(row);
    setOpen(true);
  };
  const handleCloseEdit = () => {
    setOpenSnackEdit(false);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenSnack(false);
  };

  const handleDelete = (row) => {
    Meteor.call('employee.delete', row._id, (error, result) => {
      if (error) {
        console.error('Error deleting employee:', error.reason);
      } else {
        console.log('employee deleted successfully!');
        setOpenSnack(true);
        setSnackbarColor('red');
      }
    });
  };

  const columns = [
    {
      name: 'Employee Name',
      selector: row => row.fullName,
    },
    {
      name: 'Emp Id',
      selector: row => row.employeeID,
    },
    {
      name: 'email',
      selector: row => row.officialEmail,
    },
    {
      name: 'Designation',
      selector: row => row.designation,
    },
    {
      name: 'Employee Type',
      selector: row => row.employeeType,
    },
    {
      name: 'Team',
      selector: row => row.teamName,
    },
    {
      name: 'Assigned Devices',
      selector: row => row.assignedDevices,
    },
    {
      name: 'Actions',
      cell: row => (
        <div className='EButtons'>
          <button className='editButton' onClick={() => handleEdit(row)}><EditIcon /></button>
          <Snackbar
            open={openSnackEdit}
            autoHideDuration={3000}
            onClose={handleCloseEdit}
            message="Employee Updated Successfully!"
            ContentProps={{
              style: {
                zIndex: 40000,
                backgroundColor: snackbarColor,
              }
            }}
          />
          <button className='deleteButton' onClick={() => handleDelete(row)}><DeleteIcon /></button>
          <Snackbar className='snackBar'
            open={openSnack}
            autoHideDuration={3000}
            onClose={handleClose}
            message="Employee Deleted Successfully !"
            ContentProps={{
              style: {
                zIndex: 40000,
                backgroundColor: snackbarColor,
              }
            }}
          />

          <Dialog open={open} onClose={handleClose} >
            <DialogTitle className='DialogTitle'>
              <div>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Close
                  </Button>
                </DialogActions>
              </div>
              <div style={{ margin: '0 157px', borderBottom: '1px solid #ccc' }}>Update-Employee</div>
            </DialogTitle>
            <DialogContent
              style={{
                flex: '1 1 auto',
                padding: '0px 129px',
                overflowY: 'auto',
              }}>
              {row && <UpdateEmployee rowData={selectedRowData} setOpenSnackEdit={setOpenSnackEdit} onClose={handleClose} setSnackbarColor={setSnackbarColor}/>}
            </DialogContent>
          </Dialog>
        </div>
      ),
    },
  ];

  return (
    <div className='container mt-5'>
      <DataTable
        columns={columns}
        data={data}
        fixedHeader
        pagination
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5]}
      />
    </div>
  );
};

export default EmployeeTable;
