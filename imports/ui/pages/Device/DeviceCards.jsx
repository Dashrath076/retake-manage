import React, { useState, useEffect } from 'react';
import "./DeviceCards.css";
import {Meteor} from 'meteor/meteor';

const Cards = () => {
    const [DeviceCount, setDeviceCount] = useState(0);
    const [SubscriptionCount, setSubscriptionCount] = useState(0);


    useEffect(() => {
        Meteor.call('countDevices', (error, result) => {
          if (error) {
            console.error('Error counting devices:', error);
          } else {
            setDeviceCount(result);
          }
        });
        Meteor.call('countSubscription', (error, result) => {
            if (error) {
              console.error('Error counting devices:', error);
            } else {
                setSubscriptionCount(result);
            }
          });
      }, []);


    return (
        <div className='dcards'>
            <div className='scard'>
                <div className='dname'>Total Device</div>
                <div className='dcount'>{DeviceCount}</div>
            </div>

            <div className='scard'>
                <div className='dname'>COMPANY OWNED DEVICES</div>
                <div className='dcount'>10</div>
            </div>
            <div className='scard'>
                <div className='dname'>SUBSCRIBED DEVICES</div>
                <div className='dcount'>{SubscriptionCount}</div>
            </div>
            <div className='scard'>
                <div className='dname'>UNASSIGNED DEVICES</div>
                <div className='dcount'>0</div>
            </div>
        </div>
    );
}
export default Cards;
