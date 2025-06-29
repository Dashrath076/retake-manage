import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Random } from 'meteor/random';
import SignUp from '/common/db/signUp/server';
import Signups from '/common/db/signUp';
import { Accounts } from 'meteor/accounts-base';
import bcrypt from 'bcryptjs';

Meteor.publish('signup.all', function () {
  return Signups.find();
});
Meteor.publish('currentUserData', function (email) {
  check(email, String);
  return Signups.find({ email: email });
});
//'signup.save'({ signupId, data } = {})

Meteor.methods({
  'user.signup'({ data } = {}) {
    const {
      firstName,
      lastName,
      email,
      password,
      dob,
      gender,
      phone,
      altphone,
      // Add more fields as needed
    } = data; // Extract data from the object
  
    if (!email || !password) {
      throw new Meteor.Error('invalid-data', 'Invalid email or password');
    }
  
    const existingUser = Accounts.findUserByEmail(email);
    if (existingUser) {
      throw new Meteor.Error('email-exists', 'Email already exists');
    }
  
    // Create a new user object
    const userObject = {
      email: email,
      password: password,
      profile: {
        firstName,
        lastName,
        dob,
        gender,
        phone,
        altphone,
      },
    };
  
    // Create the user using Meteor's Accounts package
    const userId = Accounts.createUser(userObject);
  
    if (!userId) {
      throw new Meteor.Error('signup-failed', 'Signup process failed');
    }
  
    return Meteor.users.findOne(userId); // Return the created user data
  },
  'users.updateProfile': function (userId, updatedFields) {
    // Ensure the user is logged in before allowing an update
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You are not authorized to perform this action');
    }
  
    // Check if the user exists
    const existingUser = Meteor.users.findOne(userId);
    if (!existingUser) {
      throw new Meteor.Error('user-not-found', 'User not found');
    }
  
    // Update the user's email in the emails array
    Meteor.users.update(
      { _id: userId, 'emails.address': existingUser.emails[0].address }, 
      { $set: { 'emails.$.address': updatedFields.email } }
    );
  
    // Update other profile fields (firstName, lastName, etc.) if needed
    Meteor.users.update(userId, {
      $set: {
      'profile.firstName': updatedFields.firstName,
      'profile.lastName': updatedFields.lastName,
      'profile.phone': updatedFields.phone,
      'profile.altphone': updatedFields.altphone,
      },
    });
    return 'Profile updated successfully';
  },

  // 'users.updatePassword': function (userId, updatedFields) {
  //   // Ensure the user is logged in before allowing an update
  //   if (!this.userId) {
  //     throw new Meteor.Error('not-authorized', 'You are not authorized to perform this action');
  //   }

  //   // Check if the user exists
  //   const existingUser = Meteor.users.findOne(userId);
  //   if (!existingUser) {
  //     throw new Meteor.Error('user-not-found', 'User not found');
  //   }

  //   // Update the user's email in the emails array
  //   Meteor.users.update(
  //     { _id: userId, 'emails.address': existingUser.emails[0].address },
  //     { $set: { 'emails.$.address': updatedFields.email } }
  //   );


  //   // You can return something if needed
  //   return 'Password updated successfully';
  // },

    checkEmailExists: function (email) {
    return Signups.findOne({ email: email });
  },
  'user.findByEmail'(email) {
    check(email, String);

    const currentUser = Meteor.users.findOne({ 'emails.address': email });

    if (!currentUser) {
      throw new Meteor.Error('user-not-found', 'User not found.');
    }

    return currentUser;
  },
});