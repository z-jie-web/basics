// [1, 2, 3, 4, 5].forEach(
//   function (a) {
//     console.log(a, this);
//   },
//   [6, 7, 8, 9]
// );

[1, 2, 3, 4, 5].forEach(function (a) {
  console.log(a, this);
},(err)=>{
  console.log(err)
});
