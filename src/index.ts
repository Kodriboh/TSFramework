import User from './models/User';

const user1 = new User({ id: 1,name: 'Newer Name' });

user1.on('save', () => {
  console.log(user1);
});

user1.save();