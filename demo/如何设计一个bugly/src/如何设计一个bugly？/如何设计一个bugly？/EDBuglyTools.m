//
//  EDBuglyTools.m
//  如何设计一个bugly？
//
//  Created by tangQiang on 2022/5/12.
//

#import "EDBuglyTools.h"
#import <execinfo.h>

void handleUncaughtException(NSException *exception) {
    void* buffer[64];
    char **strings;
    strings = backtrace_symbols(buffer, 64);
    for (int i = 0; i < 64; i++) {
        NSLog(@"%s", (char *)strings[i]);
    }
    
    void* bufferAddr[64];
    backtrace(bufferAddr, 64);
    for (int i = 0; i < 64; i++) {
        NSLog(@"0x%lx", (uintptr_t)bufferAddr[i]);
    }
}

@implementation EDBuglyTools

/// 单例对象
+ (instancetype)sharedInstance {
    static EDBuglyTools *instance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        instance = [[EDBuglyTools alloc] init];
    });
    return instance;
}

/// 开始监听NSException
- (void)startMonitor {
    NSSetUncaughtExceptionHandler(&handleUncaughtException);
}

@end
