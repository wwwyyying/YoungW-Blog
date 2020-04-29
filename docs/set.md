---
id: set
title: 集合
sidebar_label: 集合
---

import useBaseUrl from '@docusaurus/useBaseUrl'

## 集合
### 定义
1. 集合是由一组**无序**且**唯一（即不能重复）**的项组成的。与数学中的有限集合概念相同
2. 集合中的每个元素称为集合中的成员。

<img alt='' src={useBaseUrl("img/set/set.jpg")} />

### 成员特点
1. **确定性**：成员是否在集合中是确定的
2. **互异性**：集合中不能包含相同的元素
3. **无序性**：集合中的成员是无序的

### 逻辑结构
集合结构：集合内的成员都是没有关联的

## 代码实现
```javascript
class Set {
  constructor() {
    this.data = [];
  }
  // 添加元素
  add (value) {
    if (!this.data.includes(value)) {
      this.data.push(value)
    }
  }
  // 查找元素位置
  findIndex (value) {
    // 因为集合中的元素都是不重复的，所以可以直接使用首次出现的下标
    return this.data.indexOf(value)
  }
  // 删除元素
  remove (value) {
    if (this.data.includes(value)) {
      this.data.splice(this.findIndex(value), 1)
    }
		return true    
  }
  // 获取当前集合元素数量
  size () {
    return this.data.length;
  }
  // 清空当前集合
  clear () {
    this.data = [];
  }
  // 查找集合中是否含有某个元素
  has (value) {
    return this.data.includes(value)
  }
}
```

## 求集合的交并差子集
### 并集
对于给定的两个集合，返回一个包含两个集合中所有元素的新集合。
<img alt='' src={useBaseUrl("img/set/union.jpg")} />

### 交集
对于给定的两个集合，返回一个包含两个集合中共有元素的新集合。
<img alt='' src={useBaseUrl("img/set/jiao.jpg")} />

### 差集
对于给定的两个集合，返回一个包含所有存在于第一个集合且不存在于第二个集合的元素的新集合。
<img alt='' src={useBaseUrl("img/set/cha.jpg")} />

### 补集
对于给定的集合 A 和 B，A 为 B 的子集，返回存在于 B 且不存在于 A 中的元素。
<img alt='' src={useBaseUrl("img/set/bu.jpg")} />

### 子集
验证一个给定集合是否是另一集合的子集。
<img alt='' src={useBaseUrl("img/set/zi.jpg")} />

```javascript
class Set {
  constructor() {
    this.data = [];
  }
  // 子集
  isChild (newSet) {
    // newSet长度不等于当前集合长度，且newSet的每一个元素当前集合中都存在
    return this.data.length !== newSet.data.length && newSet.data.every(item => this.data.indludes(item))
  }
  // 并集
  mergeSet (newSet) {
    // 如果item存在于newSet中，但是不存在当前集合中，将元素记录
    newSet.forEach(item => {
      if (!this.data.has(item)) {
        this.data.push(item)
      }
    })
    return this.data
  }
  // 差集
  diffSet (newSet) {
    // 返回属于当前集合但是不属于newSet集合的元素
    return this.data.filter(item => !newSet.has(item))
  }
  // 交集
  interSet (newset) {
    // 返回同属于两个集合的元素
    return this.data.fileter(item => newSet.has(item))
  }
  // 补集
  complementSet (newSet) {
    if (!this.isChild(newSet)) {
      return false
    }
    return this.diffSet(newSet)
  }
}
```

## Set
### 方法
1. add： 添加某个值，返回Set结构本身
2. delete： 删除某个值，返回一个布尔值
3. has： 判断元素是不是当前集合的成员，返回一个布尔值
4. clear： 清空当前集合，没有返回值
5. size： 返回当前集合的成员总数

```javascript
const set = new Set();
set.add(1) // 添加成员 1
set.add(2) // 添加成员 2
set.delete(1) // 删除成员 1
set.has(2) // 判断 2 是不是set的成员
set.size() // 返回set的成员总数
set.clear() // 将set的所有成员清空
```

### 遍历
1. keys： 返回键名列表
2. values： 返回键值列表
3. entries： 返回键值对列表
4. forEach： 遍历每个成员

```javascript
const set = new Set([1,2,3])

set.keys() // 1,2,3
set.values() // 1，2，3
set.entries() // [1,1] [2,2] [3,3]
set.forEach((value, key) => console.log(`${key} -> ${value}`))
// 1 -> 1  
// 2 -> 2  
// 3 -> 3
```

## 附
### 数组去重

```javascript
const arr = [1,2,3,1,2,3]
arr = [...new Set(arr)] // [1,2,3]
```

### 将一个N*N的数组实现从右上到左下打印
```javascript
const arr = [
  [1,2,3,4],
  [5,6,7,8],
  [9,10,11,12],
  [13,14,15,16]
]

function rotateArr(arr) {
  // 。。。一系列操作
}

// 输出的结果为
4
3,8
2,7,12
1,6,11,16
5,10,15
9,14
13
```
<img alt='' src={useBaseUrl("img/set/matrix.jpg")} />

代码：
```javascript
function rotateArr(arr) {
  let len = arr.length; // 获取到N的长度
  let min = -len // 定义一个最小值为 min
  for (let index = len - 1; index > min; index--) {
    // 将每个index作为打印的初始值，需要从上到下打印数据
    let middle = index
    for (let i = 0; i < len; i++) {
      if(arr[i][middle]) 
        console.log(arr[i][middle])
      }
      middle ++
    }
  }
}
```

