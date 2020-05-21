exports.seed = function (knex) {

  const users = [
    {
      username: "groot",
      password: "Iamgroot!",
      department: "BE",
    },
    {
      username: "admin",
      password: "keepitsecret,keepitsafe.",
      department: "BE",
    },
    {
      username: "me",
      password: "changethepass",
      department: "FE",
    },
    {
      username: "nobody",
      password: "hasnorole",
      department: "UI",
    },
    {
      username: "notme",
      password: "hasnorole",
      department: "FE",
    },
  ];

  return knex("users").insert(users);
};