import { Meteor } from 'meteor/meteor';
import Employee from '/common/db/addEmployee/server';
import { Random } from 'meteor/random';
import Employees from '/common/db/addEmployee';

Meteor.publish('employees.all', function () {
  return Employees.find();
});

Meteor.methods({
  'addEmployee.save'({ employeeId, data } = {}) {
    console.log(data, 'data');
    const employees = employeeId ? Employees.findOne({ _id: employeeId }) :
      new Employee({}, { defaults: true });
    employees._id = Random.id();
    employees.set(data);
    let e = employees.save();
    console.log(employees._id);
  },
  countEmployees() {
    if (!this.isSimulation) {
      const employeeCount = Employees.find().count();
      return employeeCount;
    }
  },

  'employeeUpdate'({ employeeId, data }) {
    if (!employeeId || !data) {
      throw new Meteor.Error('invalid-parameters', 'Invalid parameters provided');
    }
  
    const emp = Employees.findOne({ _id: employeeId });
  
    if (!emp) {
      throw new Meteor.Error('employee-not-found', 'Employee not found');
    }
  
    console.log('Updating employee with ID:', employeeId);
    console.log('Current employee data:', emp);
    console.log('Updating with data:', data);
  
    Employees.update(employeeId, {
      $set: {
        'teamName': data.teamName,
        'fullName': data.fullName,
        'employeeType': data.employeeType,
        'officialEmail': data.officialEmail,
        'designation': data.designation,
        'employeeID': data.employeeID,
        'phoneNumber': data.phoneNumber,
        'assignedDevices': data.assignedDevices,
        'officeLocation': data.officeLocation,
      },
    });
  
    return 'Employee updated successfully';
  },
  
  'employee.delete': function (employeeId) {
    // Validate that the user is logged in (optional)
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You are not authorized to delete employee.');
    }
    const employee = Employees.findOne(employeeId);
    if (!employee) {
      throw new Meteor.Error('employee-not-found', 'employee not found.');
    }

    Employees.remove(employeeId);
  },

});
