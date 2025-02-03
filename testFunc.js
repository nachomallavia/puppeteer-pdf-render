let string = '2025-11-28T00:00:00';
let dateToCheck = new Date(string);
console.log('Date to check is:', dateToCheck);

let today = new Date();
console.log('Today is:', today);

let check = dateToCheck < today;
console.log(check);
