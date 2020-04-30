---
id: bubblesort
title: 冒泡排序
sidebar_label: 冒泡排序
---

import useBaseUrl from '@docusaurus/useBaseUrl'

## 冒泡排序
**冒泡排序**比较所有相邻的两个项，如果第一个比第二个大，则交换它们。元素项向上移动到正确的顺序，就好像气泡升至表面一样，冒泡排序因此得名。

## 思路
1. 外循环会从数组的第一位迭代至数组的最后一位，它控制了在数组中经过多少轮排序（应该是数组中每项都经过一轮，轮数和数组长度一致）。
2. 内循环将从第一位迭代至倒数第二位，内循环实际上进行的是当前项与下一项的比较。
3. 如果这两项顺序不对，则交换它们。

<img alt='' src={useBaseUrl("img/bubblesort/bubblesort.PNG")} />

注意当算法执行外循环的第二轮时，数字4和5已经是正确排序的了，但是在后续比较中，它们还在一直进行着比较。因此，我们可以稍微改进一下冒泡排序算法。

如果从内循环减去外循环中已经跑过的轮数，就可以避免内循环中所有不必要的比较。

<img alt='' src={useBaseUrl("img/bubblesort/modified.PNG")} />


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

//冒泡排序
function bubbleSort (array, compareFn = defaultCompare) {
  const { length } = array;
  for (let i = 0;i < length; i++) {
    for (let j = 0; j < length - 1; j++) {
      if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
        swap(array, j, j + 1);
      }
    }
  }
  return array;
}

//改进后的冒泡排序
function modifiedBubbleSort (array, compareFn = defaultCompare) {
  const { length } = array;
  for ( let i = 0; i < length; i++) {
    for ( let j = 0; j < length - 1 - i; j++){
      if(compareFn(array[j], array[j + 1])===Compare.BIGGER_THAN){
        swap(array, j, j + 1);
      }
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
array1 = bubbleSort(array);
array2 = modifiedBubbleSort(array);
console.log(array1.join());
console.log(array2.join());

```
