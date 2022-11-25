import Users from './database/models/UserModel';

(async () => {

  const users = await Users.findAll({ raw: true });
  console.table(users);
  process.exit(0);

})();