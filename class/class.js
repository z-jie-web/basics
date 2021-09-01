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
  
  // super 不仅能调用父组件的构造函数，也能调用父组件的普通函数
  // super.sum()
  
  // 1、继承中，如果实例化的子类输出一个方法，先看看之类有没有这个方法，如果有就先执行子类的 （就近原则）
  // 2、继承中，如果子类里面没有，就直接去找父类有没有这个方法，如果有就执行父类的这个方法
  
  
  // 注意点
  // 1、在ES6中类没有变量提升，必须先定义类，才能通过类实例化对象
  // 2、类里面的共有属性和方法一定要加this使用
  // 3、this的指向问题
  //  1)、constructor里面的this指向的是  创建的实例对象
  //  1)、类里面的函数this指向调用者
  