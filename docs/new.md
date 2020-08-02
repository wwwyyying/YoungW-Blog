---
id: new
title: 深度解析new原理及模拟实现
sidebar_label: new原理
---

## 定义
&emsp;&emsp;**new运算符**创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。     ——MDN

&emsp;&emsp;举个例子
```javascript
function Car(color) {
  this.color = color;
}

Car.prototype.start = function() {
  console.log(this.color + " car start");
}

var car = new Car("black");
car.color;    //black             访问构造函数里的属性
car.start();  //black car start   访问原型里的属性
```

&emsp;&emsp;从中我们可以看出，new创建的实例有以下两个特性：
- 访问到**构造函数**里的属性
- 访问到**原型**里的属性 

## 模拟实现
&emsp;&emsp;**首先，当代码`new Foo(...)`执行时，会发生以下事情：**
1. 一个继承自`Foo.prototype`的新对象被创建
2. 使用指定的参数调用构造函数`Foo`，并将`this`绑定到新创建的对象上。`new Foo`等同于`new Foo()`,也就是没有指定参数列表，`Foo`不带任何参数调用的情况
3. 由构造函数返回的对象就是`new`表达式的结果。如果构造函数没有显示返回一个对象，则使用步骤1创建的对象


&emsp;&emsp;**这里，构造函数的返回值有如下三种情况：**
- 返回一个对象
- 没有`return`,即返回`undefined`
- 返回`undefined`以外的类型

**情况1：返回一个对象，实例只能访问到返回对象中的属性**
```javascript
function Car(color, name) {
  this.color = color;
  return {
    name: name
  }
}

var car = new Car("black", "BMW");
car.color;  //undefined
car.name;   //BMW
```
**情况2：没有`return`，即返回`undefined`，实例只能访问到构造函数中的属性**
```javascript
function Car(color, name) {
  this.color = color;
}

var car = new Car("black", "BMW");
car.color;  //black
car.name;   //BMW
```
**情况3：返回`undefined`以外的基本类型，实例中只能访问到构造函数中的属性，结果相当于没有返回值**
```javascript
function Car(color, name) {
  this.color = color;
  return "new car";
}

var car = new Car("black", "BMW");
car.color;    //black
car.name;     //undefined
```
&emsp;&emsp;**所以需要判断返回的值是不是一个对象，如果是对象则返回这个对象，不是对象则返回新创建的obj对象**

```javascript
function _new(...args) {
  //创建一个空对象
  let obj = new Object();

  //获取构造函数
  let constructor = args[0];

  //链接到原型，obj可以访问到原型中的属性
  obj.__proto__ = constructor.prototype;

  //绑定this实现继承，obj可以访问到构造函数中的属性
  let res = constructor.apply(obj, args.slice(1));

  //优先返回构造函数返回的对象
  return res instanceof Object ? res : obj;
}

//测试用例
function Car(color) {
  this.color = color;
}
Car.prototype.start = function() {
  console.log(this.color + " car start");
}

var car = _new(Car, "black");
car.color;    //black
car.start();  //black car starts
```

