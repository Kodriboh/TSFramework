import User from "./models/User";

const userA = User.build({ id: 1 });

userA.on('change', () => {
  console.log(userA);
});

userA.fetch();