---
title: Swift闭包
date: 2021-12-16 18:10:30
tags:
---

## 什么是闭包？(闭包 = 包含的函数代码块 + 所处的上下文环境)

闭包简单的说就是***自包含的函数代码块***以及***所处的上下文环境***。自包含的函数代码块其实就可以认为与匿名函数无异，而所处的上下文环境，却是闭包区别于匿名函数的地方，闭包可以捕获其所在上下文任意常量和变量的引用。Swift、OC等高级语言会为你管理捕获过程中涉及到的所有内存操作(值捕获)。

### Swift值捕获以及与OC值捕获的区别

闭包可以在其被定义的上下文中捕获常量和变量。即使定义这些常量和变量的原作用域已经不存在，闭包仍然可以在闭包函数体内引用和修改这些值。无论是Swift还是OC对于值的捕获都需要考虑两种情况，***值类型的捕获***与***引用类型的捕获***，下面就这两种情况分别说明

#### Swift 闭包值捕获

Swift中，可以捕获值的闭包的最简单形式是嵌套函数，也就是定义在其他函数的函数体内的函数。嵌套函数可以捕获其外部函数所有的参数以及定义的常量和变量。
***值类型捕获***：为了优化一个值不会被闭包改变，或者在闭包创建后不会改变，Swift可能会改为捕获并保存一份对值的拷贝；而其它情况，则是捕获的值的引用；Swift也会负责被捕获变量的所有内存管理工作，包括释放不再需要的变量。
***引用类型捕获***：直接引用地址，与OC并没有区别

具体体现可以看看代码：

```
    var i = 1
    let clourse = {
        i += 1
        print("闭包内: \(i)")
    }
    i += 1
    print("闭包外: \(i)")
    clourse()
    // 结果
    // 闭包外: 2
    // 闭包内: 3
```
#### OC Block值捕获

***值类型捕获***：OC中，对于值类型会直接保存一份对值的拷贝外部修改值，并不会影响block内部值的变化，也不能在Block内部直接修改，会报错。如果需要变化，则需要添加__block修饰符修饰此变量，将其在编译的时候转换一个结构体指针，这样就能同步修改block内外的值。(OC Block值捕获)；以上讨论的都是局部变量，对于全局变量、静态变脸、静态局部变量等就不同了;
***引用类型捕获***：直接引用地址，与Swift并没有区别。

具体体现可以看看代码：

```
    __block int i = 1;
    void(^block)(void) = ^{
        i += 1;
        NSLog(@"闭包内%d", i);
    };
    i += 1;
    NSLog(@"闭包外%d", i);
    block();
    // 结果
    // 闭包外: 2
    // 闭包内: 3
```

## Swift 闭包的类型以及OC Block类型

无论是Swift的闭包还是OC Block，其实都是引用类型。至于为什么，赋值给不同变量打印下对象地址，一目了然了。OC block本质上是一个对象，内部有isa指针，类似于NSObject. 在MRC时代，Block根据其存储的位置分为堆、栈以及全局Block，而在ARC下，所有的栈block复制到堆中，成为了堆block，以便ARC下更加方便的对Block进行内存管理；而Swift的闭包其实是ARC下的产物，估计设计之初就更接近匿名函数，同时swift设计出的语法糖以更加优雅和简洁的方式来使用闭包，包括尾随闭包、逃逸闭包以及自动闭包。

### Swift 闭包的类型

#### 尾随闭包

如果某一闭包作为函数最后一个参数传递时，可以将闭包表达式书写在函数的原括号之后，这个时候这种闭包的形式就叫尾随闭包，与此同时如果函数只有闭包一个参数，可以将函数的圆括号省略。
```
    func someFunctionThatTakesAClosure(closure: () -> Void) {
        // 函数体部分
    }

    // 以下是不使用尾随闭包进行函数调用
    someFunctionThatTakesAClosure(closure: {
        // 闭包主体部分
    })

    // 以下是使用尾随闭包进行函数调用
    someFunctionThatTakesAClosure() {
        // 闭包主体部分
    }

    // 只有一个参数的时候省略圆括号
    someFunctionThatTakesAClosure {
        // 闭包主体部分
    }
```
通过尾随闭包语法，优雅地在函数后封装了闭包的具体功能。

#### 逃逸闭包

当一个闭包作为参数传到一个函数中，但是这个闭包在函数返回之后才被执行，我们称该闭包从函数中逃逸。当你定义接受闭包作为参数的函数时，你可以在参数名之前标注 @escaping，用来指明这个闭包是允许“逃逸”出这个函数的。
```
    var completionHandlers: [() -> Void] = []
    func someFunctionWithEscapingClosure(completionHandler: @escaping () -> Void) {
        completionHandlers.append(completionHandler)
    }
```
对于逃逸闭包应该去显示的指定或者标记为逃逸闭包，如果没有标记，编译器会编译错误。

#### 自动闭包

自动闭包是一种自动创建的闭包，用于包装传递给函数作为参数的表达式。这种闭包不接受任何参数，当它被调用的时候，会返回被包装在其中的表达式的值。这种便利语法让你能够省略闭包的花括号，用一个普通的表达式来代替显式的闭包。
自动闭包让你能够延迟求值，因为直到你调用这个闭包，代码段才会被执行。延迟求值对于那些有副作用（Side Effect）和高计算成本的代码来说是很有益处的，因为它使得你能控制代码的执行时机。下面的代码展示了闭包如何延时求值。

> 注意事项：过度使用 autoclosures 会让你的代码变得难以理解。上下文和函数名应该能够清晰地表明求值是被延迟执行的。

### OC Block类型

Object-C根据其在虚拟内存空间的存储位置将Block划分为：栈Block、堆Block以及全局Block；ARC下，为保证Block的生命周期，在编译的时候，会对Block进行拷贝，并复制到堆上。

#### 栈Block

栈Block顾名思义就是存储在栈区的block，其作用域很明显在当前方法栈中，方法调用完成后，弹栈，对应的block也将随之销毁。以下是栈block的实现: 

```
    // 方法调用
    [self testBlock:^{
        self.view.backgroundColor = UIColor.redColor;
    }];

    // 方法
    - (void)testBlock:(void(^)(void))block {
        NSLog(@"栈block%@", block);
        block();
    }

    // 结果
    代码中 NSLog(@"栈block%@", block);
    // <__NSMallocBlock__>
    console中 po NSLog(@"栈block%@", block);
    // <__NSStackBlock__>
```

> 注意事项：上述中将block作为函数参数，且不会造成循环引用，这是因为上述的方法中的block为栈block，随着方法调用结束，block最终被弹栈。那为什么上述NSLog会打印出堆block呢？这是因为ARC下所有的栈block均会在编译器编译时候复制到堆中，故打印出来是堆block.

#### 堆Block

堆Block顾名思义就是存储在堆区的block；block本质上是一个对象，故在堆区会有其类似于对象的内存管理。详情可以看看[Block内存管理](https://www.zybuluo.com/MicroCai/note/57603)

#### 全局Block

全局Block顾名思义就是存储在全局区的block; 那什么时候block会被定义为全局Block呢？只有在捕获全局变量、静态全局变量以及静态局部变量的block，才会被设计为全局block，主要还是保证block的生命周期与其捕获的变量生命周期对应。

```
    // 全局变量
    int i = 0;
    // 静态全局变量
    static int j = 0;

    // 静态局部变量
    static int k = 0;
    void(^block)(void) = ^{
        NSLog(@"%d-%d-%d", i, j, k);
    };
    block();

    // 结果：
    // <__NSGlobalBlock__>
```

## Swift 闭包的循环引用以及 OC Block的循环引用

Swift与Object-C的内存管理机制：自动引用计数(ARC), 当一个对象被强引用，那这个对象的引用计数将会+1；当强引用变量销毁，则引用计数将会-1；当一个对象的引用计数为0，这个对象将会面临销毁。而此时可能存在一种状况，一个对象强引用另个一个对象的同时，另一个对象也强引用此对象，它们相互引用，形成了一个环，这就是循环引用。简单点来说：***只有相互引用才会引发循环引用***

### Swift 闭包的循环引用

先来看一个案例：
```
    self.someFunctionWithNonescapingClosure {
        self.view.backgroundColor = UIColor.red
    }
    func someFunctionWithNonescapingClosure(closure: @escaping () -> Void) {
        closure()
    }
```
以上的方式编码方式会不会造成循环引用呢？显然是不会，为什么因为此时闭包与self并不会构成循环引用。
闭包参数在函数弹栈后，并不被self持有，故不会造成循环引用。

现在我们加几行代码再看看：
```
    // 属性
    var closure: (() -> Void)?
    // 方法
    self.someFunctionWithNonescapingClosure {
        self.view.backgroundColor = UIColor.red
    }
    func someFunctionWithNonescapingClosure(closure: @escaping () -> Void) {
        self.closure = closure
        // closure()
    }
    // 调用
    self.closure()
```
以上的方式编码方式会不会造成循环引用呢？显然是会，为什么因为此时闭包与self构成循环引用。那如何解决呢？
Swift提供了两种方案来解决循环引用: weak与unowned；
```
    // 方法1
    self.someFunctionWithNonescapingClosure { [weak self] in
        self?.view.backgroundColor = UIColor.red
    }

    // 方法2
    self.someFunctionWithNonescapingClosure { [unowned self] in
        self.view.backgroundColor = UIColor.red
    }
```
这两种方法的区别在哪呢？
1. weak: swift引入了新的语法可选值，被weak修饰的变量，在销毁时，会自动的将weak修饰的对象置为nil，不会野指针错误。
2. unowned: 则不会置为niL，会野指针错误

### OC Block的循环引用

OC Block的场景与Swift的一样，只是解决循环引用的时候关键字不太一样而已：__weak 与 __unsafe_unretained；
1. __weak, 本质上是观察者模式, 一旦对象被释放后, 指针地址自动置为 nil；
2. __unsafe_unretained 弱引用对象都用 assign 修饰, 不会增加引用计数. 但是对象被释放, 地址不会改变, 继续访问, 会引起野指针

## 参考引用

1. [Swift闭包官方文档](https://swiftgg.gitbook.io/swift/swift-jiao-cheng/07_closures)
2. [Block内存管理](https://www.zybuluo.com/MicroCai/note/57603)
