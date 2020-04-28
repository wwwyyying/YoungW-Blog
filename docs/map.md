---
id: map
title: 字典
sidebar_label: 字典
---

import useBaseUrl from '@docusaurus/useBaseUrl'

## 字典

定义：字典是一种以 **键-值 对** 形式存储的数据结构

### 特点
1. 字典是一种非线性存储结构
2. 字典中的元素是可变的，不是必须的，键值是不重复的
3. 键值是可hash

### 代码实现
```javascript
// 首先定义一个字典类
class Dictionary{
  constructor() {
    this.data = {};
    this.count = 0;
  }
  // 添加元素方法
  add (key, value) {
    if (!this.data[key]) {
      this.count ++;
      this.data[key] = value;
    }
    return true;
  }
  // 删除元素方法
  remove (key) {
    if(this.data[key]) {
      delete this.data[key];
      this.count --;
    }
    return true;
  }
  // 更新元素方法 有则更新，无则添加
  update (key, newValue) {
    if(this.data[key]){
    	this.data[key] = newValue;
    } else {
      this.add(key, newValue)
    }
  }
  // 查找元素方法
  find (key) {
    return this.data[key];
  }
  // 显示所有元素方法
  showAll () {
    Object.keys(this.data).forEach(key => console.log(`${key} --> ${this.data[key]}`))
  }
  // 记录总个数方法
  total () {
    return this.count;
  }
  // 清空方法
  clear () {
    this.data = {};
  }
  // 查找是否含有方法 类似于 indexOf
  has (key) {
    return !!this.data[key]
  }
  // 字典排序
  sort () {
    let result = {};
    Object.keys(this.data).sort().forEach(key => {
      result[key] = this.data[key]
    });
    this.data = result;
  }
}
```

1. 字典是一种非线性存储结构

通过上方的代码我们可以看到，我们存储在字典中的数据并不像数组和链表那样有顺序性，而是分散在一个对象中。所以说字典的存储是非线性的。

2. 字典中的元素是可变的，不是必须的，键值是不重复的

首先说一下为什么字典中的元素是可变的，字典中的元素可以和数组中的元素画等号。都是属于某个结构存储的数据，既然是数据，我们当然可以随意修改他们的值。

## Map

### Map和Object的不同

Object 本质上是键值对的集合。但是只能使用字符串当做键。这给它的使用带来了很大的限制。

Map 提供了一种完善的 Hash 结构实现。可以使用对象当键来存储数据。

### 方法
1. set： 存储

2. get： 获取

3. has： 是否存在

4. size： 返回成员总数

5. delete： 删除某个键

6. clear： 清空

```javascript
const map = new Map();
map.set('a', 1) // {a: 1}
map.size // 1
map.has('a') // true
map.has('b') // false
map.get('a') // 1
map.get('c') // undefined
map.clear() // {}
map.delete('a') // false map已经清空，并没有a元素，所以返回false
map.set('obj', '哈哈') // {obj: '哈哈'}
map.delete('obj') // true
```

遍历：
```javascript
const map = new Map();
map.keys() // 返回map的所有键
map.values() // 返回map的所有值
map.entries() // 返回map的所有键值
map.forEach() // 遍历map的所有成员
```

3.键值是可 hash

```javascript
let map = new Map()

let a = {}
let b = {}

map.set(a, 1)
map.set(b, 2)
console.log(map) // Map { {} => 1, {} => 2 }
```

最后的输出值我们可以看到是有两个值，也就是说，我们 map 中对应的 a、b 的 key 值存储的是他们的哈希地址，并不是 {} 这个空对象。所以在 map 中才会有两个值存在。

### Map和WeakMap的不同
1. 只接收对象作为键值，（不包括 null）。不接收其他类型的值为键名
2. 不可遍历
3. 无法清空

因为 WeakMap 的键名所引用的对象都是弱引用。这种情况下，垃圾回收机制是不将此引用考虑进去的。当所引用的对象在其他地方的引用都被清除之后，WeakMap 里的键名对象会被清除。不用手动删除引用。

