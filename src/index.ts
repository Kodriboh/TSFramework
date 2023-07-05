import User from './models/User.model';

const user1 = new User({ id: 1 });

const retrievedUser = user1.fetch();

console.log(retrievedUser);