import {Meteor} from 'meteor/meteor';
import Subscription from '/common/db/subscription/server';
import {Random} from 'meteor/random';
import Subscriptions from '/common/db/subscription';

Meteor.methods({
	'subscription.save'({subscriptionId, data} = {}) {
        console.log(data, 'data');
		const subscription = subscriptionId ? Subscriptions.findOne({_id: subscriptionId}) :
        new Subscription({}, {defaults: true});
        subscription._id = Random.id();
        subscription.set(data);
        let s = subscription.save();
        console.log(subscription._id);
	},
    countSubscription() {
        if (!this.isSimulation) {
          const subscriptionCount = Subscriptions.find().count();
          return subscriptionCount;
        }
      }
});
