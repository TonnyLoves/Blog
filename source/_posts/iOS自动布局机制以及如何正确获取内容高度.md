---
title: iOS自动布局机制以及如何正确获取内容高度
date: 2021-11-27 17:05:40
tags:
---

## iOS自动布局机制(Autolayout)

### AutoLayout原理介绍

Auto Layout 是苹果公司在iOS6发布的界面布局技术，为了适配不同大小屏幕及屏幕变化而推出的一种技术方案，旨在实现一次编写布局界面UI，自动适应所有屏幕布局，并随着iOS SDK的迭代逐步完善了各种布局API、提供多种使用Auto Layout的布局方式。实际上Auto Layout算法本身并非有Apple发明，Auto Layout源于Cassary约束解析工具包。该算法由Alan Borning、Kim Marriott、Peter Stuckey、Yi Xiao于1997年发布，该算法的主要思想是：将基于约束系统的布局规则（本质上是表示视图布局关系的线性方程组）转化为表示规则的视图几何参数。

### AutoLayout布局机制

创建视图树，描述视图之间的约束、设置优先级、设置视图内容，Layout Engine计算出视图位置、尺寸，绘制出对应的图层。
Auto Layout布局过程涉及延迟机制，并非一有约束更新就马上进行布局重绘，当有约束更改时，系统的默认做法是延迟更新，目的是实现批量更改约束、绘制视图，避免频繁遍历视图层级，优化性能。当更新约束太慢影响到后序代码逻辑，也可强制马上更新。如下图所示：

{% asset_img BlackBox.jpeg Auto Layout 布局机制 %}

图中***intrinsicContentSize***参与了layout Engine中的布局计算，所以这是为什么系统控制在采用自动布局的时候会回调***intrinsicContentSize***方法，这就是为什么有些系统空间UIButton, UILabel以及UIImageView能通过其获取控件大小。

### AutoLayout生命周期(Layout Engine)

AutoLayout的生命周期其实就是一次运行循环中，从约束的变化到从Layout Engine中复制出Frame的过程。具体流程如下：
1. RunLoop监听**Constrints Change**

    Constrints Change主要做了两件事：
    1). 更新约束:
        * 激活或失效约束
        * 修改constant和priority
        * 添加或移除View
    2). 重新计算布局
        * 接收到新的Frame值，但是这时候还未更新UI
        * 调用setNeedsLayout，标记待更新

2. **Deferred Layout**阶段，视图的位置、尺寸值会在这个过程计算，设置到对应视图上，并绘制出来；
    Deferred Layout pass主要：
    1). 更新约束:(确保将要发生改变的视图能够在此时更新，在遍历视图树重新摆放视图之前及时更新)
        * 从下到上，调用View的updateConstraints(批处理)
    2). 重新赋值Frames, 更新UI
        * 从上到下，调用待更新View的layoutSubviews
        * 从layout engine中复制frame，并赋值给对应的view
3. 下一次RunLoop继续监听


如下图所示: 

{% asset_img LayoutEngine.jpeg Auto Layout 生命周期 %}

总而言之，Runloop在整个AutoLayout生命周期中，发挥了重要作用；包括监听约束变化、延迟更新以及渲染到界面的时机等。

## 如何正确获取内容高度

基于UITextView高度控制引发的一些问题(textView高度计算不准)及思考，以及对应的解决办法。以下就以UITextView来介绍几种获取内容高度的方法以及各自需要注意的地方，同是了解相关方法的实现机制以及在布局中的作用。

### String的 boundingRect 方法

boundingRect方法可用于计算指定宽度，文本属性(字体大小、行间距以及行高等)的文本高度；

```
func boundingRect(with size: CGSize, options: NSStringDrawingOptions = [], attributes: [NSAttributedString.Key : Any]? = nil, context: NSStringDrawingContext?) -> CGRect
```
    1. size: 指定需要文本的宽度，高度可随意，最终会将高度计算出来，计算出来的高度使用ceil()进行像素对齐；
    2. options:  
        1. usesLineFragmentOrigin: 整个文本将以每行组成的矩形为单位计算整个文本的尺寸;
        2. usesFontLeading: 使用字体的行间距来计算文本占用的范围，即每一行的底部到下一行的底部的距离计算;
        3. usesDeviceMetrics: 将文字以图像符号计算文本占用范围，而不是以字符计算。也即是以每一个字体所占用的空间来计算文本范围  
        4. truncatesLastVisibleLine: 当文本不能适合的放进指定的边界之内，则自动在最后一行添加省略符号。如果 NSStringDrawingUsesLineFragmentOrigin 没有设置，则该选项不生效
    3. attributes: 文本属性能决定字体大小、行间距以及行高等可能影响字体高度的属性
    4. context: 缺省内容

### View 的 sizeToFit 与 sizeThatFits 方法

<code>sizeToFit</code>方法可用于计算出最优的大小，必须先约束好view的宽度,并且内部调用<code>sizeToFits</code>，同时调整view的大小；

```
textView.sizeToFit() // 通过frame直接获取高度
```

sizeToFits方法可用于计算出最优而且不会改变自己的size，可以用过参数指定view的宽度。

```
textView.sizeThatFits(size: CGSize) -> CGSize // 可指定宽度, 通过返回值获取CGSize
```

### View 的 intrinsicContentSize 方法

<code>intrinsicContentSize</code>方法View内部的大小，但并不是所有的View都是重写了这个方法，默认值为<code>CGSize(-1, -1)</code>;重写方法可以通过返回<code>sizeToFits</code>的大小(来源于QMUI中Button的实现)；自动布局AutoLayout会回调此方法，获取到未设置size的View的大小.系统自带的控件中UIView,以及UIScrollView均不会重写<code>intrinsicContentSize</code>，View的大小由自身及subview的constraints等确定。

```
let size = view.intrinsicContentSize  // 获取UILabel,UIButton,UIImageView的内在大小
```

### Font 的行高 lineHeight 方法

font.lineHeight获取单行高度，可通过指定的行数计算行高，此高度与boundingRect方法一致。
```
let height = font.lineHeight // 获取到单行行高
```

## 参考资料

[1. Font与字体大小](http://www.saitjr.com/ios/textlayout-font-and-size.html#%E5%AD%97%E4%BD%93%E5%A4%A7%E5%B0%8F%E8%AE%A1%E7%AE%97)

[2. Advanced Auto Layout(官方文档)](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/AutolayoutPG/ModifyingConstraints.html#//apple_ref/doc/uid/TP40010853-CH29-SW1)
