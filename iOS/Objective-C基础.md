# 1. 第一个OC程序
1. 打开`xcode`
`Create a new Xcode project` - `macOS` - `Command Line Tool`
2. `NSLog`打印
```
#import <Foundation/Foundation.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        // insert code here...
        NSLog(@"Hello, World!");
    }
    return 0;
}
```
# 2. 基础语法
1. 整型、浮点型、布尔型
```
#import <Foundation/Foundation.h>

//这时main函数
int main(int argc, const char * argv[]) {
    @autoreleasepool {
        // insert code here...
        NSLog(@"Hello, World!");
        // 整型
        int a = 10;
        NSLog(@"%d", a); //打印整型 10
         
        double b = 10.1;
        NSLog(@"%f", b); //打印浮点型 10.10000
        
        BOOL c = TRUE;
        NSLog(@"%hhd", c); //打印布尔型 1
        
        NSInteger d = 3; //NSInteger会自动选择 int或者long
        NSLog(@"%ld", (long)d); //3
    }
    return 0;
}
```
# 3. 字符串、数组、字典
1. 字符串
```
#import <Foundation/Foundation.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSString *str = @"Hello oc";
        //打印长度
        NSLog(@"%lu", (unsigned long)str.length); //8
        //字符串拼接
        NSLog(@"%@", [NSString stringWithFormat:@"%@-%d", str, 10]); //Hello oc-10
        //大小写转换
        NSLog(@"%@", [str uppercaseString]); //HELLO OC
        //截取字符串
        NSLog(@"%@", [str substringFromIndex: 2]); //llo oc
        NSLog(@"%@", [str substringToIndex: 2]); //He
        NSLog(@"%@", [str substringWithRange: NSMakeRange(2, 3)]); //llo
        
        //替换字符串
        NSLog(@"%@", [str stringByReplacingOccurrencesOfString: @"o" withString:@"*"]); //Hell* *c
    }
    return 0;
}
```
2. 数组
```
#import <Foundation/Foundation.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSArray *array = @[@1, @2.0, @"abc"];
        
        NSLog(@"%@", array[1]); //2
        
        //for in循环
        for(id item in array) {
            NSLog(@"%@", item);
        }
        //for循环
        for(int i=0; i < array.count; i++) {
            NSLog(@"%d-%@",i, array[i]); //0-1 1-2 2-abc
        }
        //通过元素找下标
        NSLog(@"%lu", [array indexOfObject:@"abc"]); //2
        //可变数组
        NSMutableArray *muArray = [NSMutableArray arrayWithArray:array];
        //添加元素
        [muArray addObject:@"de"];
        //删除元素
        [muArray removeObject: @1];
        for(id item in muArray) {
            NSLog(@"%@", item); //2 abc de
        }
    }
    return 0;
}
```
3. 字典
```
#import <Foundation/Foundation.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSDictionary *dir = @{
            @"name": @"张三",
            @"age": @"18",
            @"sex": @"male"
        };
        
        for (NSString *key in [dir allKeys]) {
            NSLog(@"%@-%@", key, [dir valueForKey:key]); //name-张三 age-18 sex-male
        }
        
        for (NSString *value in [dir allValues]) {
            NSLog(@"%@", value); //张三 18 male
        }
    }
    return 0;
}
```
# 4. 面向对象
1. 第一个面向对象程序
```
//  Person.h
#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Person : NSObject

//属性
@property(copy, nonatomic) NSString *name;
@property(copy, nonatomic) NSString *sex;
@property(assign, nonatomic) NSInteger *age;
@property(strong, nonatomic) NSArray *children;

//方法
//+表示静态方法，-表示实例方法。
//:之后为参数
+(void)say;
-(void)eat:(NSString *)food;
-(NSString *)sleep:(NSString *)time;

@end

NS_ASSUME_NONNULL_END
```
```
//  Person.m
#import "Person.h"

@implementation Person

+(void)say {
    NSLog(@"说话");
}
-(void)eat:(NSString *)food {
    NSLog(@"吃%@", food);
}
-(NSString *)sleep:(NSString *)time {
    NSLog(@"%@点睡觉", time);
    return @"睡着了";
}

@end
```
```
//  main.m
#import <Foundation/Foundation.h>
#import "Person.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        
        Person *p= [[Person alloc]init];
        p.age = 10;
        p.sex = @"male";
        p.name = @"zhangsan";
        p.children = @[@"张三", @"李四"];
        
        [Person say]; //说话
        [p eat:@"苹果"]; //吃苹果
        NSLog(@"%@", [p sleep:@"11"]); //11点睡觉 睡着了
        
    }
    return 0;
}
```
2. 继承与多态
```
//  Student.h
#import <Foundation/Foundation.h>
#import "Person.h"

NS_ASSUME_NONNULL_BEGIN

@interface Student : Person

@property(copy, nonatomic) NSString *stuNo;

@end

NS_ASSUME_NONNULL_END
```
```
//  Student.m
#import "Student.h"

@implementation Student

-(NSString *)sleep:(NSString *)time {
    NSLog(@"学生%@点睡觉", time);
    return @"学生睡着了";
}

@end
```
```
//  main.m
#import <Foundation/Foundation.h>
#import "Person.h"
#import "Student.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {       
        [Student say]; //说话
        Student *stu = [[Student alloc]init];
        stu.stuNo = @"001";
        [stu eat:@"苹果"]; //吃苹果
        NSLog(@"%@", [stu sleep:@"11"]); //学生11点睡觉 学生睡着了
        Person *stu2 = [[Student alloc]init]; //多态
        NSLog(@"%@", [stu2 sleep:@"10"]); //学生10点睡觉 学生睡着了     
    }
    return 0;
}
```
3. `get`与`set`方法
 `get`与`set`方法不能同时定义
```
//Student.m
#import "Student.h"

@implementation Student

-(void)setStuNo:(NSString *)stuNo{
    _stuNo = stuNo;
    NSLog(@"set StuNo");
}

-(NSString *)stuNo{
    NSLog(@"set StuNo");
    return _stuNo;
}
@end
```
4. 私有方法
在`.m`中定义，没有在`.h`中声明的方法为私有方法。
```
//Student.m
#import "Student.h"

@implementation Student

-(void)study{
    NSLog(@"好好学习");
}

-(NSString *)sleep:(NSString *)time {
    [self study];
    //...
}

@end
```
5. `description`
```
//  Student.m
#import "Student.h"

@implementation Student

- (NSString *)description
{
    return [NSString stringWithFormat:@"当前学生的信息为%@", self.stuNo];
}

@end
```
```
//  main.m
#import <Foundation/Foundation.h>
#import "Student.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        Student *stu = [[Student alloc]init];
        stu.stuNo = @"001";
        NSLog(@"%@", stu); //当前学生的信息为001  
    }
    return 0;
}
```
6. 构造函数
```
//  Person.h

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Person : NSObject

//属性
@property(copy, nonatomic) NSString *name;
@property(copy, nonatomic) NSString *sex;
@property(assign, nonatomic) NSInteger *age;
@property(strong, nonatomic) NSArray *children;

-(instancetype)initWithName:(NSString *)name Sex:(NSString *)sex Age:(NSInteger)age Children:(NSArray *)children;

@end

NS_ASSUME_NONNULL_END
```
```
//  Person.m
#import "Person.h"

@implementation Person

-(instancetype)initWithName:(NSString *)name Sex:(NSString *)sex Age:(NSInteger)age Children:(NSArray *)children{
    if(self = [super init]){
        self.name = name;
        self.sex = sex;
        self.age = age;
        self.children = children;
    }
    return self;
}

@end
```
```
//  main.m
#import <Foundation/Foundation.h>
#import "Person.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        Person *p2= [[Person alloc]initWithName:@"李四" Sex:@"female" Age:12 Children:@[@"A", @"B"]];
        NSLog(@"%@", p2.name);
        NSLog(@"%@", p2.sex);
        NSLog(@"%d", p2.age);
        NSLog(@"%@", p2.children);        
    }
    return 0;
}
```
# 5. 高级语法
1. `category`分类
第一种扩展
`New File` - `Objective-C File` - `File Type: Category`、`Class: NSString`
```
//  NSString+Hello.h

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface NSString (Hello)

-(void) say;

@end

NS_ASSUME_NONNULL_END
```
```
//  NSString+Hello.m

#import "NSString+Hello.h"

@implementation NSString (Hello)

-(void) say{
    NSLog(@"Hello");
}

@end
```
```
//  main.m

#import <Foundation/Foundation.h>
#import "NSString+Hello.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSString *str = @"abc";
        [str say]; //Hello
    }
    return 0;
}
```
第二种扩展
```
//  Person.m

#import "Person.h"

@interface Person() 

@end

@implementation Person

@end
```
2. `protocol`协议
`New File - Objective-C File - File Type: Protocal`
```
//  buyTicket.h
#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol buyTicket <NSObject>

@required
-(void)buy;

@optional
-(void)sell;

@end

NS_ASSUME_NONNULL_END
```
```
//  AClass.h

#import <Foundation/Foundation.h>
#import "buyTicket.h"

NS_ASSUME_NONNULL_BEGIN

@interface AClass : NSObject <buyTicket>

@end

NS_ASSUME_NONNULL_END
```
```
//  AClass.m

#import "AClass.h"

@implementation AClass

-(void)buy{
    NSLog(@"A买票");
}

@end
```
```
//  BClass.h

#import <Foundation/Foundation.h>
#import "buyTicket.h"

NS_ASSUME_NONNULL_BEGIN

@interface BClass : NSObject <buyTicket>

@end

NS_ASSUME_NONNULL_END
```
```
//  BClass.m

#import "BClass.h"

@implementation BClass

-(void)buy{
    NSLog(@"B买票");
}

@end
```
```
//  Boss.h

#import <Foundation/Foundation.h>
#import "buyTicket.h"

NS_ASSUME_NONNULL_BEGIN

@interface Boss : NSObject

@property (weak, nonatomic) id<buyTicket> tickerDelegate;

-(void)buyTicket;
 
@end

NS_ASSUME_NONNULL_END
```
```
//  Boss.m

#import "Boss.h"

@implementation Boss

-(void)buyTicket{
    if([self.tickerDelegate respondsToSelector:@selector(buy)]) {
        [self.tickerDelegate buy];
    }
}

@end
```
```
//  main.m
//  协议

#import <Foundation/Foundation.h>
#import "Boss.h"
#import "AClass.h"
#import "BClass.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        //代理模式
        Boss *boss = [[Boss alloc]init];
        AClass *a = [[AClass alloc]init];
        BClass *b = [[BClass alloc]init];
        
        boss.tickerDelegate = a;
        [boss buyTicket]; //A买票
        boss.tickerDelegate = b;
        [boss buyTicket]; //B买票
    }
    return 0;
}
```
3. `Block`
```
#import <Foundation/Foundation.h>
typedef int(^Block2)(int, int);

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        //第一种创建方式
        int(^myBlock)(int, int) = ^(int a, int b){
            return a + b;
        };
        int b = myBlock(2, 5);
        NSLog(@"%d", b); //7
        
        //第二种创建方式
        Block2 block2 = ^(int a, int b){
            return a * b;
        };
        int b2 = block2(2, 5);
        NSLog(@"%d", b2); //10

        //可以修改__block修饰的变量
        __block int n = 3;
        void(^block3)() = ^(){
            n *= 2;
        };
        block3();
        NSLog(@"%d", n); //6
    }
    return 0;
}
```
如果在`block`中使用`self`，`self`中的类又包含`block`属性，这样会造成循环引用。
可以通过将`self`转化为一个用`__weak`修饰的`weakSelf`，避免循环引用。
4. `Foundation`
```
#import <Foundation/Foundation.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        //结构体
        CGPoint point = CGPointMake(200, 200);
        CGSize size = CGSizeMake(200, 200);
        CGRect rect = CGRectMake(0, 0, 200, 300);
        
        //NSValue
        NSNumber *number = [NSNumber numberWithInt:20];
        [number intValue];
        
        NSValue *v1 = [NSValue valueWithPoint:point];
        NSValue *v2 = [NSValue valueWithSize:size];
        NSValue *v3 = [NSValue valueWithRect:rect];
        NSArray *arr = @[v1, v2, v3];
        
        //NSDate
        NSDate *date = [[NSDate alloc]init];
        NSLog(@"%@", date); //Mon Mar  8 21:03:10 2021
        
        NSDateFormatter *formatdate = [[NSDateFormatter alloc]init];
        formatdate.dateFormat = @"yyyy/MM/dd HH:mm:ss";
        NSLog(@"%@", [formatdate stringFromDate:date]); //2021/03/08 21:06:56
    }
    return 0;
}
```
5. `KVC`
```
//  Person.h
#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Person : NSObject

@property (nonatomic, copy, readonly) NSString *name;

@end

NS_ASSUME_NONNULL_END
```
```
//  main.m
#import <Foundation/Foundation.h>
#import "Person.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        Person *p = [[Person alloc]init];
        //p.name = @"张三"; //Assignment to readonly property
        //NSLog(@"%@", p.name);
        
        [p setValue:@"张三" forKey:@"name"];
        NSLog(@"%@", [p valueForKey: @"name"]); //张三
    }
    return 0;
}
```
