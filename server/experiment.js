// in this file we will experiment with different function to implement in the main  code base

// function sum(a) {
//   return function (b) {
//     return a + b;
//   };
// }

const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

console.log(roleRights.get('admin'));
