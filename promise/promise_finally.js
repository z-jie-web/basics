console.log(Promise, "sssssssssss");

Promise.prototype.finally = function (arg) {
  return this.then(function () {
    return Promise.resolve(
      arg().then(() => {
        return value();
      }),
      function (err) {
        return Promise.resolve(
          arg().then(() => {
            throw err;
          })
        );
      }
    );
  });
};
