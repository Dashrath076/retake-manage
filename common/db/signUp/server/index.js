import Signup from '/common/db/signUp';
import { Class } from 'meteor/jagi:astronomy';
import 'meteor/jagi:astronomy-timestamp-behavior';
import 'meteor/jagi:astronomy-softremove-behavior';

const SignUp = Class.create({
    name: 'Signup',
    collection: Signup,
    fields: {
        name: {
            type: String,
            optional: true,
        },
        lastName: {
            type: String,
            optional: true,
        },
        email: {
            type: String,
            validators: [{ type: 'email' }],
            optional: true,
        },
        gender: {
            type: String,
            optional: true,
        },
        spassword: {
            type: Object,
            optional: true,
            nested: {
              digest: {
                type: String,
                required: true,
              },
              algorithm: {
                type: String,
                required: true,
              },
            },
          },
          confirmPassword: {
            type: Object,
            optional: true,
            nested: {
              digest: {
                type: String,
                required: true,
              },
              algorithm: {
                type: String,
                required: true,
              },
            },
          },
        dob: {
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

export default SignUp;
