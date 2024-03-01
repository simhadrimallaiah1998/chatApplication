// let a = 7 + 7 + 7 + "7";
// let b = "7" + 7 + 7 + 7;
// let c = 7 + 7 + "7" + 7;
// let e = "7" - 7 + 7 + 7;

// console.log(0.2 + 0.1 == 0.3);
// console.log(0.2 + 0.1 === 0.3);
// console.log(a);
// console.log(b);
// console.log(c);
// console.log(e);

// for (let i = 2; i <= 100; i++) {
//   let prime = true;
//   for (let j = 2; j < i; j++) {
//     if (i % j == 0) {
//       prime = false;
//     }
//   }
//   if (prime) {
//     console.log(i);
//   }
// }

// x = 3;

// function parent() {
//   let name = "simhadri";

//   function child() {
//     console.log(name);
//   }
//   child();
// }
// parent()

//call

// let num = { a: 1 };

// function add(b, c) {
//   return this.a + b + c;
// }

// console.log(add.apply(num, [1, 2]));
// console.log(add.call(num, 1, 2));
// const res = add.bind(num, 4, 65);
// console.log(res());

// function add(a) {
//   return (b) => {
//     return (c) => {
//       return a + b + c;
//     };
//   };
// }

// console.log(add(1)(2)(5));

// let a = 5;
// let b;

// b = a;
// a = 6;
// console.log(a);
// console.log(b);

// let a = { greet: "wel" };
// let b;
// b = a;
// a.greet = "welcome";

// console.log(a);
// console.log(b);

// function add(...a) {
//   count = 0;
//   for (let i of a) {
//     count += i;
//   }
//   console.log(count);
// }

// add(1, 2, 3, 4, 5, 6);

//print a tabl
// let table_data = [];
// for (let i = 1; i <= 10; i++) {
//   for (let j = 1; j <= 10; j++) {
//     let table_row = `${i} * ${j} = ${i * j}`;
//     table_data.push(table_row);
//   }
// }
// console.log(table_data);
// let separated_data = [];
// for (let k = 0; k < table_data.length / 10; k++) {
//   let data_filed = table_data.slice(10 * k, 10 * k + 10);
//   console.log(data_filed);
// }

//console.log("The Table_Data is", table_data.slice(1, 10));

//fib number

// function fibon(num) {
//   const number1 = [0, 1];
//   for (let i = 2; i <= num; i++) {
//     const nextNum = number1[i - 1] + number1[i - 2];
//     number1.push(nextNum);
//   }
//   return number1;
// }
// const res = fibon(10);
// console.log(res);

// for (let i = 2; i <= 10; i++) {
//   let prime = true;
//   for (let j = 2; j < i; j++) {
//     if (i % j === 0) {
//       prime = false;
//     }
//   }
//   if (prime) {
//     console.log(i);
//   }
// }

// const getFourDigitOtp = () => {
//   const fourDigitCode = Math.floor(Math.random() * 10000);
//   if (fourDigitCode.toString().length == 4) {
//     console.log(fourDigitCode);
//   } else {
//     console.log("The Code length is less than 4 digit");
//     getFourDigitOtp();
//   }
// };
// getFourDigitOtp();

Array.prototype.count = function (e) {
  return this.filter((e1) => e1 == e).length;
};

var a = [1, 1, 2, 3, 4, 4, 5, 6, 6, 6];
const b = [...new Set(a)];
const objectedElements = {};
for (i of b) {
  console.log(`${i}:${a.count(i)}`);
  // objectedElements.push(`${i}:${a.count(i)}`);
  objectedElements[i] = a.count(i);
}
console.log(objectedElements);
