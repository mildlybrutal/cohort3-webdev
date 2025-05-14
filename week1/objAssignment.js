function greet(user) {
    if (user.gender == "Male") {
        console.log("Hi " + "Mr. " + user.name + ", your age is " + user.age);
    } else if (user.gender == "Female") {
        console.log("Hi " + "Mrs. " + user.name + ", your age is " + user.age);
    } else {
        console.log("Hi " + user.name + ", your age is " + user.age);
    }
}


let user = {
    name: "Akash",
    age: 19,
    gender: "Male",
};

greet(user);