---
layout: post
title: "Sort--选择排序"
description: ""
category: tech
tags: 算法 Sort
---

> 算法课上实现求解Convex Hull问题的时候，采用Graham算法的第二步，要对所有的点求到起始点的极角，并且排序。自己动手写了一个非常脑残的QuickSort。决定，接下来的时间，仔细的再总结一下经常用到的各种排序算法。

**排序**就是把一系列元素按照某种特定的规则来进行重新组织顺序。比如对一些列整数可以根据其数值大小来进行排序。对于一系列字符串，可以按照字符串的长度进行排序。对于一些列的文件，可以根据文件容量的大小进行排序。

    int[] a = getIntegerList();
    Quick.sort(a);
    String[] str = getStringList();
    Quick.Sort(str);
    File[] files = getFileList();
    Quick.Sort(str);

一系列数据可排序的前提是：元素之间彼此可以比较的。java语言中的`Comparable<T>`接口很好的描述了这一特征。所有实现这个借口的类型，都有一个`comparaTo(Comprarable that)`的方法。比如JAVA中整型的比较方法 `Integer`类的实现如下：

    //from JDK Integer.java
    public int compareTo(Integer anotherInteger) {
        return compare(this.value, anotherInteger.value);
    }
    public static int compare(int x, int y) {
        return (x < y) ? -1 : ((x == y) ? 0 : 1);
    }
一般约定，状态有三种，分别是`1`、`0`、`-1`,在上面代码中1表示x>y,0表示x=y,-1则表示x<y

我们在编写自己的排序算法的时候，为了保持好的兼容性，就可以按照的规范来编写。


###选择排序

选择排序是最基本也是想法最朴素的排序，生活中也处处有体现，比如老师给我们排队的时候，会选择个子最小的站最前面，然后剩下的学生里面，个子最小的同学站在第二，依次类推。

####算法步骤：

+ Step1: compare 从左到右扫描数组，从当前元素的右边选择最小的元素。
+ Step2: swap 将最小的元素与当前位置元素交换,继续扫描

可以发现，在扫描过程中，当前位置`i`的左边是已经排好的元素，不会再动，右边不断的选出最小的元素。

####代码实现：
    
    public class SelectionSort {

        public static void sort(Comparable[] a) {
            int N = a.length;
            for (int i = 0; i < N; i++) {
                int min = i;
                for (int j = i + 1; j < N; j++) {
                    if (less(a[j], a[min])) {
                        exch(a, j, min);
                    }
                }
            }
        }
        // if v is less than w
        public static boolean less(Comparable v, Comparable w) {
            return (v.compareTo(w) < 0);
        }
        //swap element
        public static void exch(Comparable[] a, int i, int j) {
            Comparable swap = a[i];
            a[i] = a[j];
            a[j] = swap;
        }
    }
    
####算法分析
选择排序是与输入无关的算法，当输入改变，算法的效率不会受到影响。
#####比较次数 
比价总次数为 （N-1）+（N-2）+（N-3）+...+1 = `1/2 * n^2`
#####交换次数
选择排序的交换次数是线性的，每一轮遍历只进行一次交换，因此次数是 `N`次