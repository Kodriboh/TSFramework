import User from "./models/User.model";

const user = new User({});

user.on('click', async () => console.log(123));

user.trigger('click');