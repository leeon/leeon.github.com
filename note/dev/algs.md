---
layout: page
title: Algorithms
tagline: 算法学习总结
group: dev
---

这里整理一些学习过的算法


#Sort

##Selection Sort
Idea: Scan from the left of array, Pick a `min` element each time and exchange `a[min]` with `a[i]`. Move the cursor and repeat.


Compare: `1/2 * N^2`

Swap: `N`

Input ：`Insensitive`


##Insertion Sort
Idea:Scan from left of array ,for each element `e[i]`, make sure that `e[i]` is more than every element in the left ,otherwise swap `e[i]` with `e[i-1]` until meets that.

Input ：`Insensitive`

#####Good case  
when the array is sorted

Compare: `N-1`

Swap: `0`

#####Bad case
when the array is in-versed

Compare: `1/2 * N^2`

Swap: `1/2 * N^2`

####Random Case
Compare: `1/4 * N^2`

Swap: `1/4 * N^2`

在实践经验中插入排序比选择排序快一倍。

插入排序在处理局部有序的数组的时候效率比较高

##Shell Sort

插入排序的瓶颈问题是，交换。当一个元素移动距离较大的时候要连续的两两交换。

希尔排序是改进的插入排序，利用了插入排序的特点，在处理局部有序的数组时，插入排序的效率很高。

目前还没有时间复杂度的证明

