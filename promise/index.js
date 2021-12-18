function a(arg) {
  console.log("aaaaaaa", arg);
  return err;
}

function b(arg) {
  console.log("bbbbbbb", arg);
}

let promise = new Promise((resolve, reject) => {
  let a_result = a("a");
  resolve(a_result);
});

promise
  .then((res) => {
    b(res);
  })
  .catch((err) => {
    console.log(222);
    throw err;
  })
  .finally((err) => {
    console.log("finally");
    console.log(1111);
  });
