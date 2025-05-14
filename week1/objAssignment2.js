function filterUsers(users) {
    const result = users.filter(user => user.age > 18);
    console.log("can vote: " + result);
}

const users = [
    {
        name: "Akash",
        age: 21,
        gender: "male",
    },
    {
        name: "lmao",
        age: 17,
        gender: "female",
    },
    {
        name: "xd",
        age: 20,
        gender: "male",
    },
];

filterUsers(users);
