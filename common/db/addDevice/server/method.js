import {Meteor} from 'meteor/meteor';
import Device from '/common/db/addDevice/server';
import {Random} from 'meteor/random';
import Devices from '/common/db/addDevice';

Meteor.publish('devices.all', function ({ warrantyType } = {}) {
  const query = warrantyType === 'expired' ? { warranty: { $lt: new Date() } } : {};
  return Devices.find({...query});
});


Meteor.publish('device.all', function ({lifeCycleType} = {}) {
  const query = lifeCycleType === 'ended' ? { lifeSpan: { $lt: new Date() } } : {};
  return Devices.find({...query});
});

Meteor.publish('devicess.all', function ({insuranceType} = {}) {
  const query = insuranceType === 'over' ? {lifeSpan: {$lt: new Date()}} : {};
  return Devices.find({...query});
});


Meteor.methods({
    'addDevice.save'({deviceId, data} = {}){
        const device = deviceId ? Devices.findOne({_id: deviceId}) :
        new Device({}, {defaults: true});
        device._id=Random.id();
        device.set(data);
        let s = device.save();
        console.log(device._id);
    },
    
    'countDevices'({warrantyType} = {}) {
      const query = warrantyType === 'expired' ? {warranty: {$lt: new Date()}} : {};
      const deviceCount = Devices.find({...query}).count();
      console.log(deviceCount, 'deviceCount')
      return deviceCount;
    },
    // Server-side code
    'countDevicesWarranty'({ warrantyType } = {}) {
      const query = warrantyType === 'expired' ? { warranty: { $lt: new Date() } } : {};
      const deviceCount = Devices.find({ ...query }).count();
      return deviceCount;
    },

    'countDevicesLifeSpan'({ lifeSpanType } = {}) {
      const query = lifeSpanType === 'ended' ? { lifeSpan: { $lt: new Date() } } : {};
      const deviceCount = Devices.find({ ...query }).count();
      return deviceCount;
    },
    'countDevicesInsuranceEnded'({ lifeSpanType } = {}) {
      const query = lifeSpanType === 'over' ? { lifeSpan: { $lt: new Date() } } : {};
      const deviceCount = Devices.find({ ...query }).count();
      return deviceCount;
    },
    'device.update'({deviceId, data}){
      if(!deviceId || !data){
        throw new Meteor.Error('invalid parameters', 'invalid parameters provided');
      }
      const device = Devices.findOne( { _id : deviceId });

      if(!device){
        console.log('device not found');
      }
        Devices.update(deviceId, {
        $set: {
          'category': data.category,
          'brandName': data.brandName,
          'model': data.model,
          'serialNumber': data.serialNumber,
          'location': data.location,
          'assignedDevices': data.assignedDevices,
          'assignedTo': data.assignedTo,
          'warranty': data.warranty,
          'lifeSpan': data.lifeSpan,
        },
      });
    
      return 'Device updated successfully';

    },
    'devices.delete': function(deviceId) {
      if (!this.userId) {
        throw new Meteor.Error('not-authorized', 'You are not authorized to delete devices.');
      }
  
      const device = Devices.findOne(deviceId);
      if (!device) {
        throw new Meteor.Error('device-not-found', 'Device not found.');
      }
  
      // Perform the delete operation
      Devices.remove(deviceId);
    },

});

