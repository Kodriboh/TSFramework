import User from './models/User';

const user1 = new User({ name: 'Peter' });

user1.on('change', () => alert('change triggered!'));

user1.set({ name: 'Larry' });