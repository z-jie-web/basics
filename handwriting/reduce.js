const arr = [1, [2, 3], [3, [5], 4], 4];

console.log(arr.toString().split(","));

const arr1 = arr.toString().split(",");

const b = arr1.reduce((prev, next) => {
  // console.log(Number(prev));
  // console.log(Number(next));
  return Number(prev) + Number(next);
}, 0);

console.log(b);
