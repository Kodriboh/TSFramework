import User from './models/User';

const user1 = new User({ id: 1 });

user1.on('change', () => {
  console.log(user1);
});

user1.fetch();