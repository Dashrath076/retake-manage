import Members from '/common/db/newMember';
import { Class } from 'meteor/jagi:astronomy';
import 'meteor/jagi:astronomy-timestamp-behavior';
import 'meteor/jagi:astronomy-softremove-behavior';

const Member = Class.create({
  name: 'Member',
  collection: Members,
  secured: true,
  fields: {
    fullName: {
      type: String,
      optional: true,
    },
    email: {
      type: String,
      optional: true,
    },
    role: {
      type: String,
      optional: true,
    },
    emailStatus: {
      type: String,
      optional: true,
    },
    joiningDate: {
      type: String,
      optional: true,
    },
    action: {
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
  meteorMethods: {

  },
});

export default Member;
