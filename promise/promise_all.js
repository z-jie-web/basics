// const arr = [() => console.log("1111111"), () => console.log("2222222")];

const arr = [
  new Promise((resolve, reject) => {
    resolve("111111");
  }),
  new Promise((resolve, reject) => {
    resolve("sssssssss");
  }),
];

function promiseAll(arg) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(arg)) {
      throw new TypeError("promises must be an array");
    }

    let result = [];

    try {
      arr.map((item, index) => {
        item.then((res) => {
          console.log(res, "resres");
          result[index] = res;
        });
      });

      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
}

promiseAll(arr).then((res) => {
  console.log(res, "ssssssssss");
});


console.log(1111)