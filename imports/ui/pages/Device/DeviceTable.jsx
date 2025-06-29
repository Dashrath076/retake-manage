import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateDevice from './UpdateDevice';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import "./DeviceTable.css";
import Snackbar from '@mui/material/Snackbar';


const DeviceTable = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [openSnackEdit, setOpenSnackEdit] = useState(false);
  const [snackbarColor, setSnackbarColor] = useState('');
  const [selectedRowData, setSelectedRowData] = useState('');
  

  const handleOpen = (row) => {
    setSelectedRowData(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenSnack(false);
  };
  const handleCloseEdit = () => {
    setOpenSnackEdit(false);
  }

  const handleDelete = (row) => {
    Meteor.call('devices.delete', row._id, (error, result) => {
      if (error) {
        console.error('Error deleting device:', error.reason);
      } else {
        console.log('Device deleted successfully!');
        setOpenSnack(true);
        setSnackbarColor('red');
      }
    });
  };

  // const handleUpdateSnackBar = (value) => {
  //   setOpenSnackEdit(value);
  // };

  const columns = [
    {
      name: 'Device Name',
      selector: row => row.brandName
    },
    {
      name: 'Assigned to',
      selector: row => row.assignedTo
    },
    {
      name: 'Assigned on',
      selector: row => row.assignedOn ? row.assignedOn.toLocaleDateString() : ''
    },
    {
      name: 'Location',
      selector: row => row.location
    },
    {
      name: 'Model',
      selector: row => row.model
    },
    {
      name: 'Category',
      selector: row => row.category
    },
    {
      name: 'Type',
      selector: row => row.type
    },
    // {
    //   name: 'Status',
    //   selector: row => row.status
    // },
    {
      name: 'Warranty',
      selector: row => row.warranty ? row.warranty.toLocaleDateString() : ''
    },
    {
      name: 'lifeSpan',
      selector: row => row.lifeSpan ? row.warranty.toLocaleDateString() : ''
    },
    {
      name: 'Actions',
      cell: row => {
        return <div className='DButtons'>
          <button className='editButton' onClick={() => handleOpen(row)}><EditIcon /></button>
          <Snackbar
            open={openSnackEdit}
            autoHideDuration={3000}
            onClose={handleCloseEdit}
            message="Device Updated Successfully!"
            ContentProps={{
              style: {
                backgroundColor: snackbarColor,
                zIndex: 40000
              }
            }}
          />
          <button className='deleteButton' onClick={() => handleDelete(row)}><DeleteIcon /></button>
          <Snackbar className='snackBar'
            open={openSnack}
            autoHideDuration={3000}
            onClose={handleClose}
            message="Device Deleted Successfully !"
            ContentProps={{
              style: {
                backgroundColor: snackbarColor,
                zIndex: 40000
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
              <div style={{ margin: '0 157px', borderBottom: '1px solid #ccc' }}>Update-Device</div>
            </DialogTitle>
            <DialogContent
              style={{
                flex: '1 1 auto',
                padding: '0px 129px',
                overflowY: 'auto',
              }}>
              {row && <UpdateDevice rowData={selectedRowData} setOpenSnackEdit={setOpenSnackEdit} onClose={handleClose} setSnackbarColor={setSnackbarColor}/>}
            </DialogContent>
          </Dialog>
        </div>
      },
    },
  ];

  // const handleEdit = (row) => {
  //   setSelectedRowData(row);
  //   setOpenUpdateDevice(true);
  // };



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
}

export default DeviceTable;
