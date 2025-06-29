import Devices from '/common/db/addDevice';
import { Class } from 'meteor/jagi:astronomy';
import 'meteor/jagi:astronomy-timestamp-behavior';
import 'meteor/jagi:astronomy-softremove-behavior';

const addDevice = Class.create({
  name: 'Device',
  collection: Devices,
  secured: true,
  fields: {
    category: {
      type: String,
      optional: true,
      default:'',
    },
    brandName: {
      type: String,
      default: '',
    },
    model: {
      type: String,
      optional: true,
    },
    serialNumber: {
      type: Number,
      optional: true
    },
    location: {
      type: String, 
      optional: true,
    },
    note: {
      type: String, 
      optional: true,
    },
    assignedOn: {
      type:Date,
      optional: true,
    },
    assignedTo: {
      type: String,
      optional:true,
    },
    warranty: {
      type:Date,
      optional: true,
    },
    lifeSpan: {
      type:Date,
      optional: true,
    }
  },
  behaviors: {
    timestamp: {
      hasCreatedField: true,
      createdFieldName: 'createdAt',
      hasUpdatedField: true,
      updatedFieldName: 'updatedAt',
    },
    softremove: {
      removedFieldName: 'removed',
      hasRemovedAtField: true,
      removedAtFieldName: 'removedAt',
    },
  },
  meteorMethods: {},
});

export default addDevice;
 