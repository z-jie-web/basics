
function promiseAll(params) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(params)) {
      throw new TypeError(`argument must be a array`);
    }
    var resolvedCounter = 0;
    const arrParams = [];
    for (let i = 0; i < params.length; i++) {
      Promise.resolve(params[i]).then(
        (value) => {
          resolvedCounter++;
          arrParams[i] = value;
          if (resolvedCounter === params.length) {
            return resolve(arrParams);
          }
        },
        (error) => reject(error)
      );
    }
  });
}

// test
let p1 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(1);
  }, 1000);
});
let p2 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(2);
  }, 2000);
});
let p3 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(3);
  }, 3000);
});
promiseAll([p3, p1, p2]).then((res) => {
  console.log(res); // [3, 1, 2]
});
