import React, { useState, useEffect } from 'react';
import './usermanagement.css';
import UserTable from './UserTable';
import AddMember from './AddNewMember';
import Members from '/common/db/newMember';
import { useTracker } from 'meteor/react-meteor-data';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { Meteor } from 'meteor/meteor';
import Snackbar from '@mui/material/Snackbar';

const User = () => {
  const [openMember, setOpenMember] = React.useState(false);
  const [records, setRecords] = useState([]);
  const [MemberCount, setMemberCount] = useState(0);
  const [openSnackMember, setOpenSnackMember] = useState(false);
  const [colorSnackMember, setSnackbarColorMember] = useState('');

  const handleClose = () => {
    setOpenMember(false);
  }

  const handleCloseSnackMember = () => {
    setOpenSnackMember(false);
  }

  useEffect(() => {
    Meteor.call('countMembers', (error, result) => {
      if (error) {
        console.error('Error counting members', error);
      } else {
        setMemberCount(result);
      }
    });
  }, []);

  useTracker(() => {
    const memberSubscription = Meteor.subscribe('members.all');
    if (memberSubscription.ready()) {
      const memberData = Members.find().fetch();
      setRecords(memberData);
    }
    return () => {
      memberSubscription.stop();
    };
  }, []);

  return (
    <div className='user-main'>
      <div className='user'>
        <div className='team-mem'>Team Members <span className='mem-count'>{MemberCount} Members</span></div>
        <div><button className='add-new-mem' onClick={() => setOpenMember(true)}>Add New Member</button>
          <Snackbar
            open={openSnackMember}
            autoHideDuration={3000}
            onClose={handleCloseSnackMember}
            message="Member Added Successfully!"
            ContentProps={{
              style: {
                zIndex: 40000,
                backgroundColor: colorSnackMember,
              }
            }}
          /></div>
        <Dialog open={openMember} onClose={handleClose} >
          <DialogTitle className='DialogTitle'>
            <div>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Close
                </Button>
              </DialogActions>
            </div>
            <div style={{ margin: '0 157px', borderBottom: '1px solid #ccc' }}>Add-Member</div>
          </DialogTitle>
          <DialogContent
            style={{
              flex: '1 1 auto',
              padding: '0px 129px',
              overflowY: 'auto',
            }}>
            {<AddMember setOpenSnackMember={setOpenSnackMember} setSnackbarColorMember={setSnackbarColorMember} />}
          </DialogContent>
        </Dialog>
      </div>
      <div><UserTable data={records} /></div>
    </div>
  );
}
export default User;