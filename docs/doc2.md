---
id: doc2
title: let、var、const
sidebar_label: 详解JavaScript中let、var和const的区别
---


## 一、是否存在变量提升
**变量提升**：变量声明（注意不包含变量初始化）会被提升到声明所在的上下文，也就是说，在变量的作用域内，不管变量在何处声明，都会被提升到作用域的顶部，但是变量初始化的顺序不变。关于变量提升，还可参考 [文章](https://www.cnblogs.com/isaboy/p/javascript_hoisting.html#!comments)。

var声明的变量存在变量提升，全局作用域下是window属性。

```javascript
console.log(a); //undefined
var a=10;
```

let和const声明的变量没有变量提升。
```javascript
console.log(a); //error Cannot access 'a' before initialization
let a=10;

console.log(b); //error Cannot access 'b' before initialization
const b=10;
```

关于使用let和const定义变量是否提升的争论，可参考[文章](https://zhuanlan.zhihu.com/p/92261408)。

---

## 二、能否重复声明
var能重复声明，let和const不能重复声明。
```javascript
var a=10;
var a=20;
console.log(a); //20

let b=10;
let b=20; //error 'a' has already been declared

const c=10;
const c=20; //error 'a' has already been declared
```

---

## 三、变量值能否修改
var和let声明的值可以修改。

一般认为const是常量不能被更改，但const实际上保证的并不是变量的值不得改动，而是**变量指向的那个内存地址不得改动**。对于简单类型的数据（数值、字符串、布尔值）而言，值就保存在变量指向的内存地址中，因此等同于常量。但对于复合类型的数据（主要是对象和数组）而言，变量指向的内存地址保存的只是一个指针，const只能保证这个指针是固定的，至于它指向的数据结构是不是可变的，这完全不能控制。

```javascript
const foo = {};

//为foo添加一个属性，可以成功
foo.prop = 123;
console.log(foo.prop);  //123

//将foo指向另一个对象，就会报错
foo = {}; //TypeError:"foo" is read-only
```
上面的代码中，常量foo储存的是一个地址，这个地址指向一个对象。不可变的只是这个地址，即不能把foo指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性。

```javascript
const a =[];
a.push('Hello');  //可执行
a.length = 0; //可执行
a = ['Dave']; //error
```
上面的代码中，常量a是一个数组，这个数组本身是可写的，但是如果将另一个数组赋值给a，就会报错。

---

## 四、是否必须设置初始值
var和let声明时可以不用设置初始值，const声明时必须设置初始值，不能使用null占位。

```javascript
var a, let b;
a = 10;
b = 20;
console.log(a,b); //10, 20

const c;
c = 30; //error Missing initializer in const declaration
```

---

## 五、是否存在块级作用域
**块级作用域**：声明的变量只在该块级作用域内有效。

var只有全局作用域和函数作用域，let和const有块级作用域。

```javascript
for(var i=0;i<3;i++){
  console.log(i);//0,1,2
}
console.log(i);//3,没有块级作用域，外层也能访问

if(true){
  var a = 10;
}
console.log(a);//10

```

```javascript
for(let i=0;i<3;i++){
  console.log(i);//0,1,2
}
console.log(i);//报错 i is not defined,有块级作用域，外层不能访问

if(true){
  let a = 10;
}
console.log(a);//报错 a is not defined

if(true){
  const b = 10;
}
console.log(b);//报错 b is not defined

```

---
## 六、是否存在暂时性死区
**暂时性死区**：只要块级作用域内存在let或者const命令，它们所声明的变量就“绑定”这个区域，不再受外部的影响。在代码块内，使用let或者const命令声明变量之前，该变量都是不可用的。这在语法上称为**暂时性死区**。

var不存在暂时性死区，let和const存在暂时性死区。

```javascript
var a = 10;
if(true){
  console.log(a);//10
  var a = 20;
}
```

```javascript
var a = 10;
if(true){
  console.log(a);//报错 Cannot access 'a' before initialization
  let a = 20;
}
 
var b = 10;
if(true){
  console.log(b);//报错 Cannot access 'b' before initialization
  const b = 20;
}
```
---

## 总结
|   区别        |      var      |   let | const |
| ------------- | :-----------: | :-----------: | :-----------: |
| 是否存在变量提升      | 是 | 否 | 否|
| 是否能重复声明      |   是    |   否 |否|
| 变量值能否修改 |   是    |    是 | 否|
| 是否必须设置初始值 |   否    |    否 |是|
| 是否存在块级作用域 |   否    |    是 |是|
| 是否存在暂时性死区 |   否    |    是 |是|
