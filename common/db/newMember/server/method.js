import {Meteor} from 'meteor/meteor';
import Member from '/common/db/newMember/server';
import {Random} from 'meteor/random';
import Members from '/common/db/newMember';


Meteor.publish('members.all', function () {
    return Members.find();
});

Meteor.methods({
    'newMember.save'({memberId, data} = {}){
        console.log(data, 'data');
        const members = memberId ? Members.findOne({_id: memberId}) :
        new Member({}, {defaults: true});
        members._id=Random.id();
        members.set(data);
        let e = members.save();
        console.log(members._id);  
    },
    countMembers() {
        if (!this.isSimulation) {
          const memberCount = Members.find().count();
          return memberCount;
        }
      },

      'member.update'({ memberId, data }) {
        if (!memberId || !data) {
          throw new Meteor.Error('invalid-parameters', 'Invalid parameters provided');
        }
      
        const member = Members.findOne({ _id: memberId });
      
        if (!member) {
          throw new Meteor.Error('member-not-found', 'member not found');
        }
      
        console.log('Updating member with ID:', memberId);
        console.log('Current member data:', member);
        console.log('Updating with data:', data);
      
        Members.update(memberId, {
          $set: {
            'fullName': data.fullName,
            'email': data.email,
            'role': data.role,
            'emailStatus' : data.emailStatus,
            'joiningDate' : data.joiningDate,
          },
        });
      
        return 'Member updated successfully';
      },
      'member.delete': function(memberId) {
        if (!this.userId) {
          throw new Meteor.Error('not-authorized', 'You are not authorized to delete user.');
        }
    
        const user = Members.findOne(memberId);
        if (!user) {
          throw new Meteor.Error('user-not-found', 'user not found.');
        }
    
        // Perform the delete operation
        Members.remove(memberId);
      },
});
