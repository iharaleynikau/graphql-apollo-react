const createUser = input => {
  const id = Date.now();

  return {
    id,
    ...input
  };
};

const root = db => {
  const resolver = {
    getAllUsers: () => {
      return db;
    },
    getUser: ({ id }) => {
      return db.find(user => user.id === id);
    },
    createUser: ({ input }) => {
      const user = createUser(input);
      db.push(user);

      return user;
    }
  };

  return resolver;
};

export default root;
