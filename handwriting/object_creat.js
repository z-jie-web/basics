const obj = Object.create({ a: "1" });
const obj1 = new Object();

let o = new Object(undefined)

console.log(obj.a, "objobj");
console.log(obj1.a, "objobj");
console.log(o, "ooo");

function create(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}
