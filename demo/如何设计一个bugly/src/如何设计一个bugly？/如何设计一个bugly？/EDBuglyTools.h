//
//  EDBuglyTools.h
//  如何设计一个bugly？
//
//  Created by tangQiang on 2022/5/12.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface EDBuglyTools : NSObject


/// 单例对象
+ (instancetype)sharedInstance;

- (void)startMonitor;

@end

NS_ASSUME_NONNULL_END
