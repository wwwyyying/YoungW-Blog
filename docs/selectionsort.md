---
id: selectionsort
title: 选择排序
sidebar_label: 选择排序
---

import useBaseUrl from '@docusaurus/useBaseUrl'

## 选择排序
**选择排序**算法是一种原址比较排序算法。选择排序大致的思路是找到数据结构中的最小值并将其放置在第一位，接着找到第二小的值并将其放在第二位，以此类推。

## 思路
1. 外循环迭代数组，并控制迭代轮次。
2. 我们假设本迭代轮次的第一个值为数组最小值。
3. 从当前i的值开始至数组结束，我们比较是否位置j的值比当前最小值小；如果是，则改变最小值至新最小值
4. 当内循环结束，将得出数组第n小的值。
5. 最后，如果该最小值和原最小值不同，则交换其值。

<img alt='' src={useBaseUrl("img/bubblesort/selection.PNG")} />

数组底部的箭头指示出当前迭代轮寻找最小值的数组范围（内循环），示意图中的每一步则表示外循环

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

function swap(array,a,b){
  /* const temp = array[a];
  array[a] = array[b];
  array[b] = temp; */  //经典方式

  [array[a], array[b]] = [array[b], array[a]];  //ES6
}

//选择排序
function selectionSort(array, compareFn = defaultCompare) {
  const { length } = array;
  let indexMin;
  for ( let i = 0; i < length - 1; i++) {
    indexMin = i;
    for ( let j = i; j < length; j++) {
      if ( compareFn(array[indexMin], array[j]) === Compare.BIGGER_THAN) {
        indexMin = j;
      }
    }
    if (i !== indexMin) {
      swap(array, i, indexMin);
    }
  }
  return array;
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
array = selectionSort(array);
console.log(array.join());


```
