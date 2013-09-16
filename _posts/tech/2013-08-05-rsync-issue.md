---
layout: post
title: "Rsync算法介绍"
description: "rsync算法是由Andrew Tridgell发明的文件同步算法，应用在Linux和Unix操作系统中，如今的很多增量同步解决方案都是借鉴了这种算法，它巧妙的实现了不同机器上文件的高效同步。"
category: tech
tags: 同步 cloud 算法
---
上学期在实验室，一直在做服务端数据同步方面相关的工作，中间在看到一篇关于Dropbox技术的介绍中第一次了解到<a target=_blank href="http://rsync.samba.org/tech_report/">Rsync</a>这个概念，这篇论文是1996年发布的，至今还有很大的影响。于是当时查了很多rsync的资料并且阅读了英文原文，在翻译的过程中参考了很多 <a target=_blank href="http://blog.csdn.net/tobeandnottobe/article/details/6719848">CSDN一篇译文</a>，但是其中最关键的一部分**校验和检索**，很多资料翻译的不恰当，恰恰忽略掉了rsync的一个二级检索细节，所以自己加以补充。本文在翻译Rsync论文<a target=_blank href="http://rsync.samba.org/tech_report/">原文</a>的基础上，在特别部分做了一定的注解，希望不会打乱文章的结构。Andrew这篇论文写的非常棒，按照实际的问题逐层进行了分析，条理很清晰，在阅读的时候，自己的提高也很大。

建议学计算机的同学应该完整的读完Andrew的论文，个人认为Rsync算法最佳的`设计`在于通过传输文件的`差异`来**重构一个文件**，这个正启发了我们在解决`增量同步`的这个问题上的解决方案。然而能够使得算法真正的可用并且高效的**核心**是**滚动校验和的计算**（详细见论文第3部分）。它使得除了第一次的校验和计算之外，每一次的校验和计算都只需要很少的计算量。

之前对于很多云同步的功能，我的理解一直是数据库加普通的文件存储构成，后来发现一些优秀的产品都是按照块进行文件存储，比如QQ通讯录，这样针对不同大小的用户数据，不但可以很好的管理和备份，而且可以更好的使用增量同步。


##摘要
本文介绍了用以将一个文件内容从一台机器同步到另一台机器上的算法。假定这两台机器是通过低带宽，高延迟的双向通信链路设备连接的。该算法会先找出源文件和目标文件中相同的部分，并只将那些算法认为不相同的数据进行传输。实际上，这个算法会在两个文件不在同一台机器上的情况下，计算出两个文件差异集合。该算法的适用场景是同步的文件内容相似，并且没有非常大的差异，但是即便是对于那些同步前后差异非常大的文件，该算法也能很好的完成同步工作，而且同步效率相对而言也是较好。

##1.问题
假设有两个文件，A和B，你想更新文件B的内容，使得其和文件A的内容相同。显然，最简单的方法是将A复制到B。

现在假设，这两个文件之间通过一个缓慢的通信链路传输，例如，一个拨号的IP路由器。如果A文件很大，那么将其复制到B的过程将是缓慢的。为了使这个过程速度更快，在发送文件之前，你可以先将文件A的内容进行压缩，但是通常这样的处理方案只能提高*2~4*倍的效率。

现在假设A和B文件的内容是非常相似的，或者他们都衍生于某个相同的原始文件。要真正加快同步的速度，就需要将文件的这种相似性的优势利用起来。一个通常的方法是发送A和B之间的内容差异并记录列表，然后根据这个差异列表，重建B文件内容。

问题是，使用通常的方法生成两个文件之间的内容差异集合，必须建立在两个文件都可以被读取的前提上。因此，这就要求两个文件在传输的一端都提前准备好。如果两个文件不能同时在一台计算机上，通常的算法就不能工作了（一旦文件完全复制过来，文件差异列表就不需要了）。这正是rsync算法要解决的问题。

rsync算法能够有效地计算源文件和目标文件中匹配的内容部分，这些相同的部分不需要在链路上发送，需要的只是对目标文件所对应部分的一个引用。只有源文件中不能和目标文件匹配的部分才需要完整的发送。之后接收端可以使用现有目标文件的被引用部分和源文件中需完整传输的内容构造出源文件的副本。

一般，为了能够进一步的改善速度，要发送的数据可以使用任何一个常用的压缩算法进行压缩再传输。

##2.	rsync算法
假设我们有两个普通用途的计算机α和β。电脑α可以访问A文件，电脑β可以访问B文件，其中A和B文件内容**“相似”**，在α和β之间有一个缓慢的网络链接通路。
那么，rsync算法包括以下步骤：

（1）在机器β上，将文件B分割成一系列固定大小为`S`字节的块，每一个块彼此不重叠。通常，该文件的最后一个块可能会小于`S`字节。

（2）对于每个块，机器β会计算两个校验和：一个弱“滚动”的32位校验*（见下文）*和一个强的128位的MD4校验。

（3）机器β将这些计算得的校验和发送给α。

（4）机器α通过搜索整个A文件（从第一个偏移开始，遍历所有`S`大小的block，不仅仅遍历偏移为S倍数的block），找到所有和B文件有相同的弱或者强的校验和的block。这个工作可以通过下面描述的滚动校验的特殊属性在一次简单的遍历中非常迅速的完成。

（5）机器α给机器β发送一个指令序列，用来构建文件A的一个副本。每个指令要么是B文件中某个block的引用要么是详细的数据内容。这些数据内容都是源文件A中与目标文件B任何block都无法匹配的数据。

最后的结果是机器β获得了一份文件A的拷贝，但是只有源文件中那些无法与B内容匹配的部分才会通过链路发送过来（加上小部分存储校验和与block索引的数据）。该算法也只需要一个链路的往返，最大限度地减少链路延迟的影响。

该算法的最重要的细节是滚动校验和以及关联的多备用搜索机制，它能保证偏移校验搜索过程非常迅速地进行。这些将在下文作更详细的讨论。

##3.	滚动校验和
在rsync算法中使用的弱滚动校验和算法需要具备这样的特性：给出`X1 ... Xn`的校验和以及`X1`到`Xn+1`的字节流的值可以很容易的计算出`X2 .. Xn+1`的校验和。

我们在实现中使用的弱校验和算法来自于Mark Adler的`Adler - 32`校验算法的启发。校验算法公式如下：

![](http://rsync.samba.org/tech_report/img3.gif)

![](http://rsync.samba.org/tech_report/img4.gif)

![](/assets/images/pages/rsync1.png)
 
其中 `s（k, l）`就是字节流`Xk`到`Xl`的滚动校验和。为了简单速度的计算出结果，我们一般设置M = `2^16`。
此校验算法的重要特性是非常有效地利用了递推关系，可以计算连续值。
 
![](http://rsync.samba.org/tech_report/img6.gif)

![](http://rsync.samba.org/tech_report/img7.gif)

因此可以通过很少的计算就能实现从文件的任意一个位置开始以“滚动”的方式计算长度为S的block校验和。
尽管上述算法比较简单，但是这个校验值却已经足够用于两个文件块内容的第一级匹配。我们在实践中发现，两个块内容不相同但是校验和相同的概率是相当低的。这是很重要的，因为当弱校验和得到匹配的时候就需要进行强校验和的计算，而后者是需要更多的计算代价的。

##4.	校验和搜索
机器α一旦收到B文件的块内容的校验和列表，它就开始从A文件中任何一个位置开始寻找那些校验和与B中校验和相等的block。基本策略是从第一个字节开始，依次计算长度为`S`字节的块的32位滚动校验和，对于计算出来的每个校验和，搜索校验和的列表进行匹配。要做到这一点，我们在实现中使用一个简单的3级搜索计划。

**第一级**使用了`32位滚动校验`和对应的`16位哈希值`和一个`2^16`项的哈希表。校验和数值的列表*（例如来自文件B的校验和）*是根据其32位滚动校验和的哈希值进行排序的。哈希表中的每一项指向的是校验和列表中拥有相同hash值的第一个元素,如果没有这样的元素，则该项包含一个空值。

>注：上面按照原文翻译，逻辑并步清晰。实际上是这样的，rsync对每一个生成的32位滚动校验都会计算出一个16位哈希值（为了检索滚动校验），因此会生成一个拥有2^16 个项目的哈希表。比如文件块A生成了校验和A，并且计算出了此校验和的16位哈希，则根据计算出的哈希值，将该校验和数据添加到对应的哈希表项中。经过一些列同样的计算，当计算文件块F，时发现其得到的校验和F的16位哈希值正好和校验和A的哈希值冲突，则将校验和F的数据以链表的形式添加到校验和A之后。因此哈希表中某些项可能为空，可能有一个值，也可能包含一个链表，这样才有了二级搜索的开始。

从文件的每一个偏移量开始，所有的32位滚动校验和与其对应的16位hash值都要计算一次。只要当前哈希值的哈希表项是不是空值，第二个层次检查就要被调用。

**第二个**层次的检查从哈希表项所指向的校验和列表条目开始，扫描排列好的校验和列表，寻找和当前数值匹配的32位校验和。当遇到16位哈希值不同的条目时，扫描结束。如果搜索成功匹配，第三个层次检查被调用。

**第三个**层次检查需要计算从当前偏移位置开始的block的强校验和，然后将结算得的结果和当前hash列表中的匹配条目比较强校验和。如果这两个强校验和相匹配，我们认为我们已经找到了A中一个匹配了B文件的块。事实上块内容是有可能不同的，但这个概率是很小，在实践中这是一个合理的假设。

当找到一个匹配，α会给β发送A文件中当前偏移位置和上一次匹配结束位置之间的数据内容，后面紧跟着加上B文件中所匹配block的索引信息。该数据会立即发送，这使得我们可以保证计算与通信同时进行。

如果在某个位置没有找到匹配，就会计算下一个位置block的滚动校验和并继续进行搜索。如果找到一个匹配，搜索就会从当前匹配块的结尾重新启动 。当这两个文件非常相似时，这种策略可以节省大量计算。此外，在常见的情境下，当文件A的一部分与文件B中多个block匹配的时候，在运行过程中将这些block的索引编码也是一件简单的事情。

> 在此引用 <a target=_blank href="http://coolshell.cn/articles/7425.html">酷壳 – CoolShell.cn</a>中一个图解，非常清晰

![](http://coolshell.cn//wp-content/uploads/2012/05/rsync-algorithm.jpg)


##5.	流水线
以上各节描述了在远程系统上构建一个文件的副本的过程。如果我们有几个文件复制，我们可以通过流水线的过程得到一个相当大的延迟优势。

这需要机器β启动两个独立的进程，其中一个进程生成和发送的校验和给 机器α，另外一个进程负责收取来自的差异信息并且重建文件工作。

如果通信链路是缓冲的，那么这两个过程可以独立进行，并保证了在大部分时间两个方向都能充分利用链接。

##6.	结果
为了测试算法，我们用两个版本的Linux 系统内核源文件创建了不同的tar文件，两个内核版本为`1.99.10`和`2.0.0`。这些tar文件大小约为24MB，包含五个发布的补丁。

`1.99.10`版本的2441个文件中，其中291文件在`2.0.0`版本发生了改变， 19个文件已被删除，并且添加了25个新文件。

使用标准的GNU diff工具对两个文件计算出来的“差异”，产生了超过32000行的输出共计2.1 MB。

下表显示不同block大小的情况下，应用rsync算法对两个文件进行同步的结果 。
 
![](/assets/images/pages/rsync2.png)
 
在每一种情况下，对两个文件应用rsync算法所花费的CPU时间都低于使用“diff”工具的时间。
表中的列分别表示：

**（1）块大小**    计算校验和的数据块大小。

**（2）匹配**    在文件A中找到与B成功匹配的block的次数

**（3）标签命中**   文件A中滚动校验和16位哈希值与文件B的中对应的校验和哈希值相匹配的次数。

**（4）错误警告**     滚动校验和相匹配但是强校验不匹配的次数。

**（5）数据**     文件中传输数据的数量，单位为bytes。

**（6）写入**     机器α写入数据的字节数，包括协议头。近似于所有写入的数据。

**（7）读取**     机器α读入数据的字节数，包括协议头。近似于所有的校验和信息。

结果表明，当块的大小超过300字节时，只有小部分（约5％）的文件被传输。传输的数量也少于使用diff工具进行远程文件更新所传输的文件大小。

校验和本身也占用了一定的空间，尽管比每种情况下传输的数据量少很多。每组校验和消耗20个字节：其中包括4个字节的滚动校验加上`16`字节`128`位的`MD4`校验和。

错误警报的占成功匹配的比例小于`1/1000`，证明`32`位滚动校验在筛选出错误匹配的过程中效果相当不错。

标签命中数表示校验和搜索算法的第二个层次搜索大约每隔50个字符被调用一次。这个频率是相当高的，因为文件中的块的总数占标签哈希表的大小的比例很大。对于较小的文件，我们期待标签的命中率更接近匹配的数量。对于非常大的文件，我们也许应该增加哈希表的大小。

下表显示，对于一组小的多文件进行测试得到的类似的结果。在这种情况下，文件没有被事先打包成一个tar文件。相反，rsync算法通过参数被调用，递归下降的遍历目录树。测试文件来自于一个叫做Samba软件包的两个版本源代码。总的源代码大小为`1.7MB`，两个版本之间的差异是`4155`行输出。共`120 KB`。
 
![](/assets/images/pages/rsync3.png)


##7.	可用性
Rsync算法的一个实现已经编写完成并且在[ftp://rsync.samba.org/pub/rsync](ftp://rsync.samba.org/pub/rsync)提供下载，它提供了方便的类似于常用的UNIX命令RCP的接口。