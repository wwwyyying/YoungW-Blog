---
id: insertionsort
title: 插入排序
sidebar_label: 插入排序
---

import useBaseUrl from '@docusaurus/useBaseUrl'

## 插入排序
**插入排序**每次排一个数组项，以此方式构建最后的排序数组。假定第一项已经排序了。接着，它和第二项进行比较——第二项是应该待在原位还是插到第一项之前呢？这样，头两项就已正确排序，接着和第三项比较（它是该插入到第一、第二还是第三的位置呢），以此类推。

## 思路
1. 算法是从第二个位置（索引1）而不是第一个位置（索引0）开始的，我们默认第一项已经排序了
2. 然后，用i的值来初始化一个辅助变量并也将其值存储在一个临时变量中，便于之后将其插入到正确的位置上
3. 只要变量j比0大并且数组中前面的值比待比较的值大，我们就把这个值一道当前位置上并减小j。
4. 最终，能将该值插入到正确的位置上。

<img style="text-align:center" alt='' src={useBaseUrl("img/bubblesort/selection.PNG")} />

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

//插入排序
function insertionSort (array, compareFn = defaultCompare) {
  const { length } = array;
  for (let i = 1; i < length; i++) {
    let j = i;
    let temp = array[j];    
    while (j > 0 && compareFn(array[j-1], temp)===Compare.BIGGER_THAN) {
      array[j] = array[j-1];
      j--;
    }
    array[j] = temp;
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
array = insertionSort(array);
console.log(array.join());

```