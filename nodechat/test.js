function summation(...a) {
  sum = 0;
  for (let i of a) {
    sum += i;
  }
  console.log(sum);
}

summation(1, 2, 3, 4);
