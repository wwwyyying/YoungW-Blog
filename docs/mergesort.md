---
id: mergesort
title: 归并排序
sidebar_label: 归并排序
---

import useBaseUrl from '@docusaurus/useBaseUrl'

## 归并排序
**归并排序**是一种分而治之算法。其思想是将原始数组切分成较小的数组，直到每个小数组只有一个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组。

## 思路
由于是分治法，归并排序也是递归的。我们要将算法分为两个函数：第一个负责将一个大数组分为多个小数组并调用用来排序的辅助函数。

归并排序将一个大数组转化为多个小数组直到其中只有一个项。

1. 由于算法是递归的，我们需要一个停止条件，在这里此条件是判断数组的长度是否为1。如果是，则直接返回这个长度为1 的数组，因为它已排序了
2. 如果数组长度比1大，那么得将其分成小数组。为此，首先得找到数组的中间位，找到后我们将数组分成两个小数组，分别叫作left和right
3. left数组由索引0至中间索引的元素组成，而right数组由中间索引至原始数组最后一个位置的元素组成。这两个数组将会对自身调用mergeSort函数直到left数组和right数组的大小小于等于1。

merge函数负责合并和排序小数组来产生大数组，直到回到原始数组并已排序完成。merge函数接收两个数组作为参数，并将它们归并至一个大数组。排序发生在归并过程中。

1. 首先，需要声明归并过程要创建的新数组以及用来迭代两个数组（left和right数组）所需的两个变量
2. 迭代两个数组的过程中，我们比较来自left数组的项是否比来自right数组的项小。
3. 如果是，将该项从left数组添加至归并结果数组，并递增用于迭代数组的控制变量；否则，从right数组添加项并递增用于迭代数组的控制变量
4. 接下来，将left数组所有剩余的项添加到归并数组中，right 数组也是一样
5. 最后，将归并数组作为结果返回。
6. 
<img alt='' src={useBaseUrl("img/bubblesort/merge.PNG")} />

## 代码实现
```javascript
const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1
};

function defaultCompare(a, b){
  if (a===b){
    return 0;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}

//归并排序
function mergeSort (array, compareFn = defaultCompare) {
  if (array.length > 1) {
    //const {length} = array;
    const middle = Math.floor(array.length / 2);
    const left = mergeSort(array.slice(0, middle), compareFn);
    const right = mergeSort(array.slice(middle), compareFn);
    array = merge(left, right, compareFn);
  }
  return array;
}

function merge(left, right, compareFn = defaultCompare) {
  let i = 0;
  let j = 0;
  let array = [];
  while(i<left.length && j < right.length) {
    array.push(compareFn(left[i],right[j])===Compare.LESS_THAN ? left[i++] : right[j++]);
  }
  return array.concat(i<left.length ? left.slice(i) : right.slice(j));
}

function createNonSortedArray(size){
  const array = [];
  for(let i=size;i>0;i--){
    array.push(i);
  }
  return array;
}

let array = createNonSortedArray(5);
console.log(array.join());
array = mergeSort(array);
console.log(array.join());

```
