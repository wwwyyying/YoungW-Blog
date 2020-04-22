---
id: array_2
title: 数组
sidebar_label: 数组
---

数据的结构类型总共分四类：集合结构、线性结构、树形结构和图结构。数组是属于线性结构的一种，是顺序存储数据的结构。在JavaScript中，一个数组里的元素并不强调是同一类型，可以包含多个数据类型的元素。

## 属性

![alt text](https://github.com/wwwyyying/YoungW-Blog/tree/master/static/array_2/array_attr.jpg)

- 数组里的各个变量成为数组的元素。
- 用于区分数组各个元素的数字编号称为下标。
- 容纳元素的总数成为数组的长度。

---

## 方法

### 一、增加

#### 1.unshift() 

```javascript
let arr = [1];
arr.unshift(2); // [2,1]
```

作用：向数组头部添加元素。

返回值：返回添加后的新数组的长度，会改变原数组。

#### 2.push()

```javascript
let arr = [1];
arr.push(2); // [1,2]
```

作用：向数组尾部添加元素。

返回值：返回添加后的新数组的长度，会改变原数组。

### 二、删除

#### 1.shift()

```javascript
let arr = [1,2,3];
arr.shift(); // 1
console.log(arr); // [2,3]
```

作用：删除数组头部的元素。

返回值：返回删除的元素，会改变原数组。

#### 2.pop()

```javascript
let arr = [1,2,3];
arr.pop(); // 3
console.log(arr); // [1,2]
```

作用：删除数组尾部的元素。

返回值：返回删除的元素，会改变原数组。

### 三、替换

#### 1.splice()

```javascript
let arr = [1,2,3,4];
arr.splice(0,1); // [1]  代表从0开始删除一个元素
console.log(arr); // [2，3，4]
arr.splice(1,2,9); // [2,3] 从索引1开始删除两个元素并替换成9
console.log(arr); // [1.9.4]
arr.splice(3,0,10,11); // [] 从索引3开始，不删除元素，并添加元素10
console.log(arr); // [1，2，3，4，10，11]
```

作用：数组任意位置的元素替换、插入、删除等操作。

参数：

  - 第一个参数：操作数组的起始位置；

  - 第二个参数：要截取的数组长度；

  - 第三个参数开始：要插入的数组元素。
  
返回值：返回操作完成后的新数组，会改变原数组。

### 四、拼接
#### 1.push()

```javascript
let arr1 = [1,2];
let arr2 = [3,4];
arr1.push(arr2);
console.log(arr1); // [1,2,[3,4]]
```

作用：将元素添加至数组末尾，如果元素为数组，则将数组看作一个元素

返回值：返回添加后的数组长度，会改变原数组。

#### 2.concat()

```javascript
let arr1 = [1,2];
let arr2 = [3,4];
let arr3 = arr1.concat(arr2);
console.log(arr3) // [1,2,3,4]
```

作用：将arr2的所有元素展开拼接在arr1后。

返回值：返回拼接后的副本，不会改变原数组。

### 五、查找

#### 1.indexOf()

```javascript
let arr = [1,2,3,1,5];
let index = arr.indexOf(1);
console.log(index); // 0
```

作用：查找指定元素是否在数组中。

返回值：返回元素在数组中首次出现的下标，如果找不到，返回-1，不会改变原数组。

#### 2.lastIndexOf()

```javascript
let arr = [1,2,3,2,1,2];
let index = arr.lastIndexOf(1);
console.log(index); // 4
```

作用：查找指定元素是否在数组中。

返回值：返回元素在数组总最后一次出现的下标，如果找不到，返回-1，不会改变原数组。

### 六、排序

#### 1.sort()

```javascript
let arr = [5,7,3,9,1,6];
arr.sort();// [1,3,5,6,7,9]
```

作用：将数组按照默认排序方式进行排序。

返回值：返回排序好的数组，会改变原数组。

#### 2.reverse()

```javascript
let arr = [5,7,3,9,1,6];
arr.reverse();// [6,1,9,3,7,5]
```

作用：将数组逆序排列

返回值：返回逆序后的数组，会改变原数组。

### 七、转换

#### 1.toString()

```javascript
let arr = [1,2];
let str = arr.toString();
console.log(str); // "1,2"
```

作用：将数组中的元素以字符串的方式输出。

返回值：返回转换好的字符串，不会改变原数组。

#### 2.join()

```javascript
let arr = [1,2,3]；
let str1 = arr.join("."); 
console.log(str1); //"1.2.3"
let str2 = arr.join("$"); 
console.log(str2); //"1$2$3"
```

作用：使用特定的分隔符将数组中的元素连接起来，并以字符串的方式输出。

返回值：返回转换好的字符串，不会改变原数组。

## 时间复杂度

- 更新查找的时候只需要提供下标，所以时间复杂度为O(1)。
- 增删的时候需要改动数组中的其他元素，所以时间复杂度为O(n)。

## 附：数组乱序

### 方法一

思路：
  - 得到数组最后一个元素的下标，然后开始逆序数组；
  - 获得从0到当前元素的随机元素，并让两个元素交换位置；
  - 创建中间变量，进行元素交换；
  - 由于数组是引用类型，所以我们在改变传入参数arr的同时也会修改原本的数组。此时，直接将arr返回，可以得到经过处理的乱序的数组。

```javascript
function shuffle(arr) {
    for (let i=arr.length-1; i>=0; i--) {
        let rIndex = Math.floor(Math.random()*(i+1));
        let temp = arr[rIndex];
        arr[rIndex] = arr[i];
        arr[i] = temp;
    }
    return arr;
}
```

### 方法二

思路：

sort()本意是排序函数，可根据其特性创建乱序数组。方法可直接调用，不传入参数，也可以传入一个比较函数作为参数。

**1. 不传参数**

  此方法不传入参数时，会使用默认排序方式。先调用每个元素的toString()方法，然后按照转换后字符串的Unicode编码来进行排序。

**2. 传入参数**

  传入函数参数，可以让调用者按照自己的意愿对元素进行排序。

```javascript
function compare(value1, value2) {
	return value1 < value2 ? 1 : -1;
}
```
上述代码意为：

- 如果函数返回1，排序后value1会位于value2之后；
- 如果函数返回-1，排序后value1会位于value2之前；
- 返回0则说明两个元素相等，排序后位置不会发生变化。


```javascript
arr.sort(function(a,b){ return Math.random()>.5 ? -1 : 1;});
```

若 value1 和 value2 的比较结果是随机的（如举例所示），会出现数组乱序的现象。调用 sort 方法，在排序过程中，每次执行会取得随机浮点数。根据随机数来调整每个元素的位置。最后得到乱序之后的数组。
