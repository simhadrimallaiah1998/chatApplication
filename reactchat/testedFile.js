~// eslint-disable-next-line no-extend-native
Array.prototype.count = function (e) {
  // eslint-disable-next-line eqeqeq
  return this.filter((e1) => e1 == e).length;
};

var a = [1, 1, 2, 3, 4, 4, 5, 6, 6, 6];
const b = [...new Set(a)];
const objectedElements = {};
// eslint-disable-next-line no-undef
for (i of b) {
  // eslint-disable-next-line no-undef
  console.log(`${i}:${a.count(i)}`);
  // objectedElements.push(`${i}:${a.count(i)}`);
  // eslint-disable-next-line no-undef
  objectedElements[i] = a.count(i);
}
console.log(objectedElements);
