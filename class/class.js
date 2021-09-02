// 语法
// class name {}

// 创建实例
// var a = new name();

// 类必须使用new实例化对象

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
      return 'hello';
    }
  }
  
  Foo.classMethod() // 'hello'
  
  var foo = new Foo();
  foo.classMethod()
  // TypeError: foo.classMethod is not a function
  

  // 父类的静态方法，可以被子类继承。
  class Foo {
    static classMethod() {
      return 'hello';
    }
  }
  
  class Bar extends Foo {
  }
  
  Bar.classMethod() // 'hello'

  // 静态方法也是可以从super对象上调用的。class Foo {
  class Foo {
    static classMethod() {
      return 'hello';
    }
  }
  
  class Bar extends Foo {
    static classMethod() {
      return super.classMethod() + ', too';
    }
  }
  
  Bar.classMethod() // "hello, too"
    
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
    foo (baz) {
      this._bar(baz);
    }
  
    // 私有方法
    _bar(baz) {
      return this.snaf = baz;
    }
  }
  // 上面代码中，_bar()方法前面的下划线，表示这是一个只限于内部使用的私有方法。但是，这种命名是不保险的，在类的外部，还是可以调用到这个方法。

  class Widget {
    foo (baz) {
      bar.call(this, baz);
    }
  
    // ...
  }
  
  function bar(baz) {
    return this.snaf = baz;
  }
  // 上面代码中，foo是公开方法，内部调用了bar.call(this, baz)。这使得bar()实际上成为了当前类的私有方法。

  const bar = Symbol('bar');
  const snaf = Symbol('snaf');
  export default class myClass{

    // 公有方法
    foo(baz) {
      this[bar](baz);
    }

    // 私有方法
    [bar](baz) {
      return this[snaf] = baz;
    }

    // ...
  };
  // 上面代码中，bar和snaf都是Symbol值，一般情况下无法获取到它们，因此达到了私有方法和私有属性的效果。
  // 但是也不是绝对不行，Reflect.ownKeys()依然可以拿到它们。
  const inst = new myClass();

  Reflect.ownKeys(myClass.prototype)
  // [ 'constructor', 'foo', Symbol(bar) ]


  // 私有属性的提案
  // 目前，有一个提案，为class加了私有属性。方法是在属性名之前，使用#表示。
  class IncreasingCounter {
    #count = 0;
    get value() {
      console.log('Getting the current value!');
      return this.#count;
    }
    increment() {
      this.#count++;
    }
  }

  // 上面代码中，#count就是私有属性，只能在类的内部使用（this.#count）。如果在类的外部使用，就会报错。
  
  const counter = new IncreasingCounter();
  counter.#count // 报错
  counter.#count = 42 // 报错
