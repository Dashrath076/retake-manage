import Subscriptions from '/common/db/subscription';
import {Class} from 'meteor/jagi:astronomy';
import phoneValidateRegexInt from '/common/info/validations/phoneValidateRegexInt';
import 'meteor/jagi:astronomy-timestamp-behavior';
import 'meteor/jagi:astronomy-softremove-behavior';


const Customer = Class.create({
	name: 'Customer',
	fields: {
		address: {
			type: String,
			optional: true,
		},
		name: {
			type: String,
			validators: [{
				type: 'minLength',
				param: 1,
			}],
			optional: true,
		},
		phone: {
			type: String,
			validators: [{
				type: 'regexp',
				param: phoneValidateRegexInt,
			}],
            optional: true,
		},
		email: {
			type: String,
            validators: [{type: 'email'}],
			optional: true,
		},
    },
});

const Subscription = Class.create({
	name: 'Subscription',
	collection: Subscriptions,
	secured: true,
	fields: {
		deviceType: {
			type: String,
			optional: true,
			default: '',
		},
		deviceName: {
			type: String,
			optional: true,
		},
		plan: {
			type: String,
            optional: true,
		},
		customer: {
			type: Customer,
			optional: true,
            default() { return {}; },
		},
		numberOfDevices: {
            type: Number,
            optional: true
        }
	},
	behaviors: {
        timestamp: {
            hasCreatedField: true,
            createdFieldName: 'createdAt',
            hasUpdatedField: true,
            updatedFieldName: 'updatedAt'
        },
        softremove: {
            removedFieldName: 'removed',
            hasRemovedAtField: true,
            removedAtFieldName: 'removedAt'
          }
	},
	meteorMethods: {
		
	},
});

export default Subscription;