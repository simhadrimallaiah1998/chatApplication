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
