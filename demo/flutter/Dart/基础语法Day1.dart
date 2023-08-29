import 'dart:ffi';

void main() {
  /// 集合 List
  List list = [1, 2, 3];
  print(list);

  /// Set
  Set set = {1, 2, 3};
  print(set);
  // assert(set is Set);
  print(set is Set);

  //
  var xPrint = Point();
  xPrint.printX();
}

/// 定义一个类
class Point {
  // 
  double x;
  ///
  double y;
  ///
  Point({double y})
        : x = 1 {
    this.x = x;
    this.y = y;
  }
  /// 
  void printX() => print(x);
}

// 抽象类
abstract class AbstractInfo {
  double x;
}

extension Ad on AbstractInfo {
  double get x => this.x;
}

mixin AClass {

}