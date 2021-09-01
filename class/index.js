function Person(name, age) {
    this.name = name;
    this.age = age;
  }
  
  Person.prototype.say = function () {
    console.log("我叫" + this.name + "今年" + this.age + "岁");
  };
  
  var p1 = new Person("张三", 18);
  var p2 = new Person("李四", 20);
  
  p1.say();
  p2.say();
  
  // 能做什么呢？？
  
  function Button(options) {
    this.buttonElement = document.createElement("button");
    this.buttonElement.innerText = options.value;
    this.buttonElement.style.backgroundColor = options.backgroundColor;
    this.buttonElement.onclick = options.onClick;
    document.body.appendChild(this.buttonElement);
  }
  
  var b1 = new Button({
    value: "按钮",
    backgroundColor: "aqua",
    onClick: function () {
      alert("Hello");
    },
  });
  