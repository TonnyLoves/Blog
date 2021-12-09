---
title: iOS自动布局机制以及如何正确获取内容高度
date: 2021-11-27 17:05:40
tags:
---

## iOS自动布局机制(Autolayout)



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
