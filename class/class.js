// 语法
// class name {}

// 创建实例
// var a = new name();

// 类必须使用new实例化对象

// new 运算符
// 为了追本溯源, 我顺便研究了new运算符具体干了什么?发现其实很简单，就干了三件事情.
// var obj  = {};
// obj.__proto__ = F.prototype;
// F.call(obj);

// 第一行，我们创建了一个空对象obj;
// 第二行，我们将这个空对象的__proto__成员指向了F函数对象prototype成员对象;
// 第三行，我们将F函数对象的this指针替换成obj，然后再调用F函数.
// 我们可以这么理解: 以 new 操作符调用构造函数的时候，函数内部实际上发生以下变化：
// 1、创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型。
// 2、属性和方法被加入到 this 引用的对象中。
// 3、新创建的对象由 this 所引用，并且最后隐式的返回 this.

// 类 constructor 构造函数
// constructor()方法是类的构造函数（默认方法），用于传递参数，返回实例对象，通过new命令生成对象实例时，自动调用该方法。
// 如果没有显示定义，类内部会自动给我们创建一个 constructor()

// class Star {
//   constructor(name) {
//     this.name = name;
//   }
//   say() {
//     console.log(this.name + "Hello");
//   }
// }

// var a = new Star("张三");
// console.log(a.name);
// a.say()

// 类 的继承  extends
// class Super extends Star {

// }

// var b = new Star("李四");
// console.log(b.name);
// b.say()

// Object.getPrototypeOf方法可以用来从子类上获取父类。
// Object.getPrototypeOf(Super) === Star

// 取值函数（getter）和存值函数（setter）
// 与 ES5 一样，在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

// class MyClass {
//   constructor() {
//     // ...
//   }
//   get prop() {
//     return 'getter';
//   }
//   set prop(value) {
//     console.log('setter: '+value);
//   }
// }

// let inst = new MyClass();

// inst.prop = 123;
// setter: 123

// inst.prop
// 'getter'

// super 关键字
class Father {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  sum() {
    console.log(this.x + this.y);
  }
}

class Son extends Father {
  constructor(x, y) {
    // 调用了父类中构造函数
    // 子类构造函数中使用super  必须放到this前面（必须先调用父类的构造函数，在使用之类的构造函数）
    // 这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象。
    super(x, y);
    this.x = x;
    this.y = y;
  }
  num() {
    super.sum();
  }
}

var son = new Son(1, 2);
son.sum();
son.num();

// ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。
// ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。

// super 不仅能调用父组件的构造函数，也能调用父组件的普通函数
// super.sum()

// 1、继承中，如果实例化的子类输出一个方法，先看看之类有没有这个方法，如果有就先执行子类的 （就近原则）
// 2、继承中，如果子类里面没有，就直接去找父类有没有这个方法，如果有就执行父类的这个方法

// 静态方法
// 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，
// 就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

class Foo {
  static classMethod() {
    return "hello";
  }
}

Foo.classMethod(); // 'hello'

var foo = new Foo();
foo.classMethod();
// TypeError: foo.classMethod is not a function

// 父类的静态方法，可以被子类继承。
class Foo {
  static classMethod() {
    return "hello";
  }
}

class Bar extends Foo {}

Bar.classMethod(); // 'hello'

// 静态方法也是可以从super对象上调用的。class Foo {
class Foo {
  static classMethod() {
    return "hello";
  }
}

class Bar extends Foo {
  static classMethod() {
    return super.classMethod() + ", too";
  }
}

Bar.classMethod(); // "hello, too"

// 静态属性
// 因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。现在有一个提案提供了类的静态属性，写法是在实例属性的前面，加上static关键字

// 老写法
class Foo {
  // ...
}
Foo.prop = 1;

// 新写法
class Foo {
  static prop = 1;
}

//  私有方法和私有属性
//  是只能在类的内部访问的方法和属性，外部不能访问。这是常见需求，有利于代码的封装，但 ES6 不提供，只能通过变通方法模拟实现。class Widget {

// 公有方法
class Widget {
  // 公有方法
  foo(baz) {
    this._bar(baz);
  }

  // 私有方法
  _bar(baz) {
    return (this.snaf = baz);
  }
}
// 上面代码中，_bar()方法前面的下划线，表示这是一个只限于内部使用的私有方法。但是，这种命名是不保险的，在类的外部，还是可以调用到这个方法。

class Widget {
  foo(baz) {
    bar.call(this, baz);
  }

  // ...
}

function bar(baz) {
  return (this.snaf = baz);
}
// 上面代码中，foo是公开方法，内部调用了bar.call(this, baz)。这使得bar()实际上成为了当前类的私有方法。

const bar = Symbol("bar");
const snaf = Symbol("snaf");
export default class myClass {
  // 公有方法
  foo(baz) {
    this[bar](baz);
  }

  // 私有方法
  [bar](baz) {
    return (this[snaf] = baz);
  }

  // ...
}
// 上面代码中，bar和snaf都是Symbol值，一般情况下无法获取到它们，因此达到了私有方法和私有属性的效果。
// 但是也不是绝对不行，Reflect.ownKeys()依然可以拿到它们。
const inst = new myClass();

// 静态方法 Reflect.ownKeys() 返回一个由目标对象自身的属性键组成的数组。
Reflect.ownKeys(myClass.prototype);
// [ 'constructor', 'foo', Symbol(bar) ]

// 私有属性的提案
// 目前，有一个提案，为class加了私有属性。方法是在属性名之前，使用#表示。
class IncreasingCounter {
  #count = 0;
  get value() {
    console.log("Getting the current value!");
    return this.#count;
  }
  increment() {
    this.#count++;
  }
}

// 上面代码中，#count就是私有属性，只能在类的内部使用（this.#count）。如果在类的外部使用，就会报错。

const counter = new IncreasingCounter();
counter.#count; // 报错
counter.#count = 42; // 报错

// Mixin 模式的实现
// Mixin 指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口。它的最简单实现如下。
const a = {
  a: "a",
};
const b = {
  b: "b",
};
const c = { ...a, ...b }; // {a: 'a', b: 'b'}

// 下面是一个更完备的实现，将多个类的接口“混入”（mix in）另一个类

function mix(...mixins) {
  class Mix {
    constructor() {
      for (let mixin of mixins) {
        copyProperties(this, new mixin()); // 拷贝实例属性
      }
    }
  }

  for (let mixin of mixins) {
    copyProperties(Mix, mixin); // 拷贝静态属性
    copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
  }

  return Mix;
}

function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if (key !== "constructor" && key !== "prototype" && key !== "name") {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}

// 上面代码的mix函数，可以将多个对象合成为一个类。使用的时候，只要继承这个类即可。
class DistributedEdit extends mix(Loggable, Serializable) {
  // ...
}

// 类的 prototype 属性和__proto__属性

// 大多数浏览器的 ES5 实现之中，每一个对象都有__proto__属性，指向对应的构造函数的prototype属性。
// Class 作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链。

// （1）子类的__proto__属性，表示构造函数的继承，总是指向父类。
// （2）子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性class A {
class A {}

class B extends A {}

B.__proto__ === A; // true
B.prototype.__proto__ === A.prototype; // true

// 这样的结果是因为，类的继承是按照下面的模式实现的。
class A {}

class B {}
// Object.setPrototypeOf() 方法设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或  null。
// B 的实例继承 A 的实例
Object.setPrototypeOf(B.prototype, A.prototype);

// B 继承 A 的静态属性
Object.setPrototypeOf(B, A);

const b = new B();

// 不存在任何继承
class A {}

A.__proto__ === Function.prototype; // true
A.prototype.__proto__ === Object.prototype; // true
// 这种情况下，A作为一个基类（即不存在任何继承），就是一个普通函数，所以直接继承Function.prototype。
// 但是，A调用后返回一个空对象（即Object实例），所以A.prototype.__proto__指向构造函数（Object）的prototype属性。
