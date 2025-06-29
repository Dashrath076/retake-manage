import Employees from '/common/db/addEmployee';
import { Class } from 'meteor/jagi:astronomy';
import 'meteor/jagi:astronomy-timestamp-behavior';
import 'meteor/jagi:astronomy-softremove-behavior';

const AddEmployee = Class.create({
  name: 'Employee',
  collection: Employees,
  secured: true,
  fields: {
    teamName: {
      type: String,
      optional: true,
    },
    employeeType: {
      type: String,
      optional: true,
      default: '',
    },
    fullName: {
      type: String,
      optional: true,
    },
    officialEmail: {
      type: String,
      optional: true,
    },
    designation: {
      type: String,
      optional: true,
    },
    employeeID: {
      type: Number, 
      optional: true,
    },
    phoneNumber: {
      type: Number, 
      optional: true,
    },
    assignedDevices: {
      type: Number, 
      optional: true,
    },
    officeLocation: {
      type: String,
      optional: true,
    },
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

export default AddEmployee;
