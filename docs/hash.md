---
id: hash
title: 散列表
sidebar_label: 散列表
---

import useBaseUrl from '@docusaurus/useBaseUrl'

## 哈希表定义
1. 散列表也叫哈希表（以下统称哈希表），是根据关键码值而直接进行访问的数据结构；
2. 把关键码值映射到表中的方法 — 哈希函数；
3. 存放记录的表 — 实际存储结构 。

哈希表其实就是通过哈希函数来确定一个位置，然后再表中的这个位置来存储数据。

<img alt='' src={useBaseUrl("img/hash/hash.jpg")} />

## 代码实现

哈希表最重要的是哈希函数，存储的过程也是计算哈希函数的过程。

哈希表实现思路：

1. 创建存储位置 — 建立一个数组用来存放元素；
2. 创建哈希函数 — 这是哈希表最重要的一步；
3. 通过计算后的位置存储元素。

```javascript
class HashMap {
  constructor() {
    // 创建一个数组用来存放元素
    this.list = [];
  }
  // 创建哈希函数 并通过传入key值 得到code值
  hashCode(key) {
    return key.length % 10
  }
  // 创建存储元素的方法
  put(key,value) {
    this.list[this.hashCode(key)] = value;
  }
  // 创建获取元素的方法
  get(key){
    return this.list[this.hashCode(key)];
  }
  // 删除表中的元素
  remove (key) {
    this.list[this.hashCode(key)] === undefined;
  }
  // 清空表
  clear() {
    this.list = [];
  }
}
// 初始化散列表
const hashMap = new HashMap();
// 存入一个元素
hashMap.put('animal', 'dog');
// 获取元素
hashMap.get('animal'); // 输出dog
```

## 哈希函数
### 直接给定地址法

例如：人口统计表，统计 1-100 岁的人数。这种表可以直接使用年龄作为地址，无需经过哈希计算。

```javascript
function hashCode(age) {
  return age;
}
```

### 数字分析法

```javascript
/* 一个班级的学生要统计出生日期
年。月。日
96.10.07
96.12.16
96.05.17
96.05.11
96.12.08
96.11.13
……
*/
```

这种情况下的数据经过分析，只有前三位的重复性是比较大的，取前三位造成的冲突可能会比较大，所以我们尽量不用前三位，只用后三位会比较好。

### 平方取中法

```javascript
function hashCode(key) {
  const len = `${key.length * key.lenth}`;
  return len.slice(1,len.length - 1)
}
hashCode('my name is xiaobai');//得到的结果为 324取最中间的一位 === 2
```

### 取余法

如：以哈希表存储长度作为除数取余。

```javascript
// 如果 哈希表最大存储长度为 30
function hashCode(key) {
  return key % 30
}
```

### 随机数法

```javascript
function HashCode(key) {
  return Math.floor(Math.random() * key.length);
}
// 得到一个随机的位置
```

## 哈希冲突
冲突就是两个 key 经过哈希函数处理后得到了一样的值。无论我们设计得有多么精细，都逃脱不了冲突的命运。所以，我们需要一些手段来避免或者是解决这种冲突现象。

### 链地址法

如果我们在添加元素的过程中发现要添加的位置已经有了一个元素存在，那么我们可以将这个地址的结构改变为链表存储。

如：
<img alt='' src={useBaseUrl("img/hash/link1.jpg")} />

可修改为：

<img alt='' src={useBaseUrl("img/hash/link2.jpg")} />

### 多哈希法

多设计几种哈希函数：

```javascript
function hashCode1() {};
function hashCode2() {};
function hashCode3() {};
function hashCode4() {};
……
```

一种哈希函数导致冲突的可能性比较大，但是设计两种甚至多种哈希函数虽说还是有冲突几率，但是可以将这种几率降到最低。

<img alt='' src={useBaseUrl("img/hash/multi.jpg")} />

### 开放地址法

fi(key) = (f(key)+di) MOD m (di=1,2,3,...,m-1)

m 为表的长度，d 为每次的增量。

这种方式称为线性探测再散列 — 每次发现冲突后向后移动一个位置。
<img alt='' src={useBaseUrl("img/hash/open.jpg")} />

### 桶地址法
为表中的每个地址关联一个桶，如果桶已经满了，就使用开放地址法处理。

## 复杂度
- 时间复杂度：O(1).哈希表的执行效率是使用空间来换取时间的。获取元素只需要知道 key对应的 hash 值，所以时间复杂度为 O(1)
- 空间复杂度：O(n).如果需要添加 n 个元素到哈希表中，至少需要映射 n 次，所以一个哈希表的期望空间复杂度为 O(n)
