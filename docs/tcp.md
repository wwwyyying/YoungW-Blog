---
id: tcp
title: TCP协议详解
sidebar_label: TCP
---
import useBaseUrl from '@docusaurus/useBaseUrl'

## 一、概念

TCP是面向连接的、可靠的、基于字节流的传输协议。

- 面向连接：所谓的连接，就是指客户端和服务器的连接，在双方互相通信之前，TCP需要三次握手建立连接。
- 可靠性：TCP花了非常多的功夫保证连接的可靠，这个可靠性体现在**有状态**和**可控制**两个方面。
  - 有状态：TCP会精准记录哪些数据发送了，哪些数据被对方接收了，哪些没有被接收，而且保证数据包按序到达，不允许半点差错。
  - 可控制：当意识到丢包了或者网络环境不佳，TCP会根据具体情况调整自己的行为，控制自己的发送速度或者重发。
- 面向字节流：TCP为了维护状态，将一个个IP包变成了字节流。

与之相比，UDP则是面向无连接、无状态、不可控、基于数据包的传输层协议。

## 二、TCP报文头

<img alt='' src={useBaseUrl("img/tcp/header.png")} />

各字段及其含义：

1. ```Source Port```和```Destination Port```
  分别占用16位，表示源端口号和目的端口号，用于区别主机中的不同进程，而IP地址是用来区分不同的主机。源端口号和目的端口号配合上IP首部中的源IP地址和目的IP地址就能唯一的确定一个TCP连接。
2. ```Sequence Number```
  用来标识从TCP发送端到TCP接收端发送的数据字节流，它表示在这个报文段中的第一个数据字节在数据流中的序号。主要用来解决网络报文乱序的问题。
3. ```Acknowledgment Number```
  32位确认序列号包含发送确认的一端所期望收到的下一个序号。因此，确认序号应当是上一次已成功接收到的数据字节号加1。不过，只有当标志位中的ACK标志为1时，该确认序列号的字段才有效。主要用来解决不丢包的问题。
4. ```Offset```
  给出首部中32bit字的数目，需要这个值是因为任选字段的长度是可变的。这个字段占4bit（最多能表示15个32bit的字，即4*15=60个字节的首部长度）。因此TCP最多有60字节的首部。然而，没有任选字段，正常的长度是20字节。
5. ```TCP Flags```
  TCP首部中有6个标志位，它们中的多个可同时设置为1，主要是用于操控TCP状态机，依次为URG，ACK，PSH，RST，SYN，FIN。每个标志位的含义如下：
    - URG：此标志表示TCP包的紧急指针域有效，用来保证TCP连接不被中断，并且督促中间层设备要尽快处理这些数据。
    - ACK：此标志表示应答域有效，就是前面所说的TCP应答号将会包含在TCP数据包中。ACK为1时表示应答域有效，为0时无效。
    - PSH：此标志表示push操作。所谓push操作就是指在数据包到达接收端以后，立即传送给应用程序，而不是在缓冲区中排队。
    - RST：此标志表示连接复位请求，用来复位那些产生错误的连接，也被用来拒绝错误和非法的数据包。
    - SYN：此标志表示同步序号，用来建立连接。SYN标志位和ACK标志位搭配使用。
    - FIN：此标志表示发送端已到达数据末尾，也就是说双方的数据传送完成，没有数据可以传送了，发送FIN标志位的TCP数据包后，连接将被断开。
6. ```Window```
  滑动窗口大小，用于进行流量控制。
7. 校验和
  奇偶校验，此校验和是对整个的TCP报文段，包括TCP头部和TCP数据，以16位字进行计算所得。由发送端计算和存储，并由接收端进行验证。
8. 紧急指针
  只有当URG标志位为1时紧急指针才有效。紧急指针是一个正的偏移量，和顺序字号中的值相加表示紧急数据最后一个字节的序号。TCP的紧急方式是发送端向另一端发送紧急数据的一种方式。
9. 选项和填充
  最常见的可选字段是最长报文大小，又称为MSS，每个连接方通常都在通信的第一个报文段中指明这个选项，它表示本段所能接受的最大报文段的长度。选项长度不一定是32位的整数倍，所以要加填充位，即在这个字段中加入额外的零，以保证TCP头是32的整数倍。
10. 数据部分
  TCP报文段中的数据部分是可选的。在一个连接建立和一个连接终止时，双方交换的报文段仅有TCP首部。如果一方没有数据要发送，也使用没有任何数据的首部来确认收到的数据。在处理超时的许多情况中，也会发送不带任何数据的报文段。

## 三、三次握手

  所谓三次握手是指建立一个TCP连接时需要客户端和服务器端总共发送三个包以确认连接的建立。在socket编程中，这一过程由客户端执行connect来触发。

### 3.1 为什么需要三次握手

  IP是位于网络层的无连接的通讯协议，IP协议只负责将IP包发送给目的地，但不确保能成功发送到目的地，所以在传输层采用有连接的方式，来确保数据的送达。

### 3.2 具体流程

<img alt='' src={useBaseUrl("img/tcp/woshou")} />

**解释**

- 第一次握手：客户端将SYN标志位置为1，随机产生一个值```seq=x```，并将该数据包发送给服务器端，客户端进入```SYN_SENT```状态，等待服务器端确认。
- 第二次握手：服务器端收到数据包后由标志位```SYN=1```知道客户端请求建立连接，服务器端将标志位```SYN```和```ACK```都置为1，```ack=x+1```，随机产生一个值```seq=y```，并将该数据包发送给客户端以确认连接请求，服务器端进入```SYN_RCVD```状态。
- 第三次握手：客户端收到确认后，检查```ack```是否为x+1，```ACK```是否为1，如果正确则将标志位```ACK```置为1，```ack=y+1```，并将该数据包发送给服务器端，此时客户端进入```ESTABLISHED```状态，服务器端检查```ack```是否为y+1，```ACK```是否为1，如果正确则连接建立成功，服务器端进入```ESTABLISHED```状态，完成三次握手，随后客户端与服务器端就可以开始传输数据了。

### 3.3 为什么不是两次握手

  **根本原因：无法确认客户端的接收能力**

  如果是两次，如果客户端发送了SYN报文想握手，但是这个包滞留在了当前的网络中迟迟没有到达，TCP以为这是丢了包，于是重传，两次握手建立好了连接。
  看似没有问题，但是连接关闭后，如果这个滞留在网络中的包到达了服务器端，这时候由于是两次握手，服务器端只要接收到然后发送相应的数据包，就默认连接，但是现在客户端已经断开了，这就带来了连接资源的浪费。

### 3.4 安全隐患

**1. 首次握手——SYN超时**
  在服务器端收到客户端的SYN之后，回复SYN-ACK的时候未收到ACK确认，导致服务器端不断重传，直到超时。

**2. SYN Flood攻击**
  恶意程序会在短时间对服务器不断发起建立连接请求，但是不相应服务器请求，导致服务器不断重发，占用资源，导致崩溃。

**3. 应对SYN Flood攻击的方式**

- SYN队列满后，通过```tcp_syncookies```参数回发SYN Cookie
- 若为正常连接，则客户端会回发SYN Cookie，建立连接

### 3.5 建立连接后，客户端故障

**保活机制**：向客户端发送探测报文，如果未收到响应则继续发送，直到收到响应或达到保活探测数时中断连接。

## 四、四次挥手

  四次挥手即终止连接，就是指断开一个TCP连接时，需要客户端和服务端总共发送4个包以确认连接的断开。在socket编程中，这一过程由客户端或服务器端任一方执行close来触发。

### 4.1 为什么进行四次挥手

  由于TCP连接是全双工的，因此每个方向都必须要单独进行关闭。这一原则是当一方完成数据发送任务后，发送一个FIN来终止这一方向的连接，收到一个FIN只是一味着这一方向上没有数据流动了，即不会再收到数据了，但是在这个TCP连接上仍然能够发送数据，直到这一方向也发送了FIN。

### 4.2 具体流程

<img alt='' src={useBaseUrl("img/tcp/woshou")} />

**解释**

- 第一次挥手：客户端认为没有数据要再发送给服务器端，它就向服务器发送一个FIN报文段，申请断开客户端到服务器端的连接。发送后客户端进入```FIN_WAIT_1```状态。
- 第二次挥手：服务器端收到客户端释放连接的请求后，向客户端发送一个确认报文段，表示已经接收到了客户端释放连接的请器具，以后不再接受客户端发送过来的数据。但是因为连接是全双工的，所以此时服务器端还可以向客户端发送数据。服务器端进入```CLOSE_WAIT```状态。客户端收到确认后，进入```FIN_WAIT_2```状态。
- 第三次挥手：服务器端发送完所有数据后，向客户端发送FIN报文段，申请断开服务器端到客户端的连接，发送后进入```LAST_ACK```状态。
- 第四次挥手：客户端接收到FIN请求后，向服务器端发送一个确认应答，并进入```TIME_WAIT```状态。该状态会持续一段时间，这个时间为报文段在网络中的最大生存时间，如果该时间内服务器没有重发请求的话，客户端就进入```CLOSED```状态。如果收到服务器的重发请求就重新发送确认报文段。服务器端收到客户端的确认报文段后进入```CLOSED```状态，这样全双工的连接就被释放了。

## 五、流量控制

  对于发送端和接收端而言，TCP需要把发送的数据放到**发送缓冲区**，把接收的数据放到**接收缓冲区**。而流量控制要做的事情，就是通过接收缓冲区的大小，控制发送端的发送。如果对方的接收缓冲区满了，就不能再继续发送了。

### 5.1 滑动窗口机制

TCP滑动窗口分为两种：**发送窗口**和**接收窗口**。

**发送窗口**

发送端的滑动窗口的结构如下：
<img alt='' src={useBaseUrl("img/tcp/sendW.jpg")} />

其中包含四大部分：

- 已发送且已确认
- 已发送但未确认
- 未发送但可以发送
- 未发送也不可发送

<img alt='' src={useBaseUrl("img/tcp/sendW2.jpg")} />

发送窗口就是图中被框住的范围。SND即send，WND即window，UNA即unacknowledged，表示未被确认，NXT即next，表示下一个发送的位置。

**接收窗口**

接收端的滑动窗口的结构如下：
<img alt='' src={useBaseUrl("img/tcp/receW.jpg")} />

REV即receive，NXT表示下一个接收的位置，WND表示接收窗口的大小。

### 5.2 流量控制过程

这里以一个简单的例子来模拟一下流量控制的过程。

首先双方三次握手，初始化各自的窗口大小，均为200字节。

假如当前发送端给接收端发送100个字节，那么此时对于发送端而言，SND.NXT当然要右移100个字节，也就是说当前的**可用窗口**减少了100个字节。

现在这100个字节到达了接收端，被放到接收端的缓冲队列中。不过此时由于大量负载的原因，接收端处理不了这么多字节，只能处理40个字节，剩下的60个字节被留在了缓冲队列中。

注意，此时接收端的情况是处理能力不够用了，所以接收端的接收窗口应该缩小，具体来说，缩小60个字节，由200个字节变成了140个字节，因为缓冲队列还有60个字节没被应用拿走。

因此，接收端会在ACK的报文首部带上缩小后的滑动窗口140字节，发送端对应地调整发送窗口的大小为140个字节。

此时，对于发送端而言，已经发送且确认的部分增加40字节，也就是SND.UNA右移40个字节，同时**发送窗口**缩小为140个字节。

这就是流量控制的过程，尽管回合再多，整个控制的过程和原理是一样的。

## 六、拥塞控制

前面所说的流量控制发生在发送端和接收端之间，并没有考虑到整个网络环境的影响，如果说当前网络特别差，特别容易丢包，那么发送端就应该注意一些了。这就是**拥塞控制**需要处理的问题。

对于拥塞控制来说，TCP每条连接都需要维护两个核心状态：

- 拥塞窗口
- 慢启动阈值

涉及到的算法有：

- 慢启动
- 拥塞避免
- 快速重传
- 快速恢复

接下来，我们来一一拆解这些状态和算法。

### 6.1 拥塞窗口

拥塞窗口是指目前自己还能传输的数据量大小。之前介绍了接收窗口的概念，这两者的区别是：接收窗口是接收端给的限制，而拥塞窗口是发送端给的限制。

此时```发送窗口大小 = min(接收窗口，拥塞窗口)```，取两者的较小值。而拥塞控制就是来控制拥塞窗口的变化。

### 6.2 慢启动

刚开始进入传输数据的时候，我们不知道网络到底是稳定的还是拥堵的，因此拥塞控制首先采用一种保守的算法来慢慢地适应整个网络，这种算法叫**慢启动**。具体过程如下：

- 首先，三次握手，双方宣告自己的接收窗口大小。
- 双方初始化自己的拥塞窗口大小。
- 在开始传输的一段时间，发送端没接收到一个ACK，拥塞窗口大小加1。也就是说，每经过一个RTT，拥塞窗口大小翻倍。如果说初始窗口为10，那么第一轮10个报文传完且发送端收到ACK后，拥塞窗口大小变为20，第二轮变为40，第三轮变为80，以此类推。

但是它不会无止境地翻倍下去，它的阈值叫做**慢启动阈值**，当拥塞窗口的大小到达这个阈值之后，就由**拥塞避免**来控制拥塞窗口的大小了。

### 6.3 拥塞避免

原来每收到一个ACK，拥塞窗口加1，现在到达阈值了，它只能增加```1 / 拥塞窗口```。一轮RTT下来，最后拥塞窗口的大小总共才增加1。

也就是说，以前一个RTT下来，拥塞窗口大小翻倍，现在只是增加1而已。

### 6.4 快速重传

**快速重传**

在TCP传输的过程中，如果发生了丢包，即接收端发现数据段不是按序到达的时候，接收端的处理是重复发送之前的ACK。

比如第5个包丢了，即使第6、7个包到达了接收端，接收端也一律返回第4个包的ACK。当发送端收到3个重复的ACK时，意识到丢包了，于是马上进行重传，不用等到一个RTO的时间到了才重传。

这就是**快速重传**，它解决的是**是否重传**的问题。

**选择重传**

那你可能会问了，既然要重传，那么只重传第5个包，还是第5、6、7个包都重传呢？这时可以记录一下哪些包到了，哪些包没到，针对性地重传。

在收到发送端的报文后，接收端回复一个ACK报文，那么在这个报文首部的可选项中，就可以加上```SACK```这个属性，通过```left edge```和```right edge```告知发送端已经收到了哪些区间的数据报。因此，即使第5个包丢包了，当收到第6、7个包之后，接收端依然会告诉发送端，这两个包到了。剩下的第5个包没到，就重传这个包。

这就是**选择重传**，它解决的是**如何重传**的问题。

### 6.5 快速恢复

当然，发送端收到三次重复ACK之后，发现丢包了，会认为现在的网络已经有些拥堵了，自己就会进入**快速恢复**阶段。

在这个阶段，发送端如下改变：

- 慢启动阈值降低为当前拥塞窗口大小的一半
- 拥塞窗口大小变为慢启动阈值
- 拥塞窗口大小线性增加

## 七、Nagle算法和延迟确认

### 7.1 Nagle算法

试想这样一个场景，发送端不停给接收端发送很小的包，一次只发1个字节，那么发1000个字节需要发1000个次。这样频繁的发送是存在问题的，不光是传输的时延消耗，发送和确认本身也是需要耗时的，频繁的发送接收带来了巨大的时延。

而避免小包的频繁发送，就是Nagle算法要做的事情，具体规则如下：

- 当第一次发送数据时不用等待，就算是1byte的小包也立即发送
- 后面的发送满足下面条件之一就可以发了  
  - 数据包大小达到了最大段大小（MSS)
  - 之前所有包的ACK都已接收到

### 7.2 延迟确认

试想这样一个场景，当我接收到了发送端的一个包，然后在极短的时间内又接收到了第二个包，那我是一个个地回复，还是稍微等一下，把两个包的ACK合并后一起回复呢？

**延迟确认**所做的事情就是后者，稍稍延迟，然后合并ACK，最后才回复给发送端。TCP要求这个延迟的时延必须小于500ms，一半操作系统实现都不会超过200ms。

不过需要注意的是，有一些场景是不能延迟确认的，收到了就要马上回复：

- 接收到了大于一个frame的报文，且需要调整窗口大小
- TCP处于quickack模式
- 发现了乱序包

## 八、快速打开的原理（TFO）

TCP快速打开也就是优化了TCP的握手流程，使用SYN Cookie实现。对于除首轮握手之外的握手来讲，在拿到客户端的Cookie并验证通过以后，可以直接返回HTTP响应，充分利用了1个RTT的时间**提前进行数据传输**，积累起来还是一个比较大的优势。

**具体流程**

- 首轮握手：
  - 首先客户端发送SYN给服务端，服务端接收到
  - 注意，现在服务端不是立刻回复SYN+ACK，而是通过计算得到一个```SYN Cookie```，将这个Cookie放到TCP报文的```Fast Open```选项中，然后才给客户端返回
  - 客户端拿到这个Cookie的值缓存下来。后面正常完成三次握手
- 后面的三次握手：
  - 客户端会将之前缓存的**Cookie、SYN和HTTP请求**发送给服务端，服务端验证Cookie的合法性，如果不合法直接丢弃；如果合法就正常返回SYN+ACK
  - 重点：现在服务端就能向客户端发送HTTP响应了！这是最显著的改变，三次握手还没建立，仅仅验证了Cookie的合法性，就可以返回HTTP响应了。当然，客户端的ACK还得正常传过来

<img alt='' src={useBaseUrl("img/tcp/fast.jpg")} />
