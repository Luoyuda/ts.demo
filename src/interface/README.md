<!--
 * @Author: xiaohuolong
 * @Date: 2020-11-14 11:36:49
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-11-14 13:28:22
 * @FilePath: /ts.demo/src/interface/README.md
-->
# 接口

接口是对行为的抽象表达，具体由类去实现，需要严格按照设定的接口属性进行实例化。

## *类型别名

接口和类型别名都可以用来描述对象的形状

### 接口与类型别名的区别

1. 类型别名可以用于一些其他类型，比如原始类型、联合类型和元组
2. 接口可以扩展类型别名，而反过来是不行的。
3. 类可以以相同的方式实现接口或类型别名，但类不能实现使用类型别名定义的联合类型
4. 类型别名不同，接口可以定义多次，会被自动合并为单个接口。

## 属性配置

1. 可选属性 在接口属性后加上 ?
2. 任意属性 [propName: string]
3. 只读属性 只能在创建的时候被赋值，readonly

```ts
interface Person2{
    readonly id: number; // 只读类型
    name: string;
    age?: number | undefined; // 可选属性
    say():string;
    [propName: string]: any; // 任意属性
}
```

## 接口描述数组、对象、字符串和函数

```ts

interface StringArray {
    [index: number]: string
}
type StringArray1 = string[]
const strings1: StringArray = ['1', '2']
const strings2: StringArray1 = ['1', '2']
console.log(strings1)
console.log(strings2)

interface String {
    [index: number]: string;
    [index: string]: string;
}
type String2 = string
const string1:String = '2123'
const string2:String2 = '2123'
console.log(string1[1] === string1['1'])
console.log(string2[1])

interface ObjectTest {
    a: number
}
type ObjectTest1 = {
    a: number
}
const test:ObjectTest = {
    a: 1
}
const test1:ObjectTest1 = {
    a: 1
}
console.log(test)
console.log(test1)

interface Func {
    (a: number): string
}
type Func2 = (a: number) => string
const func:Func = a => `a: ${a}`
const func2:Func2 = a => `a: ${a}`
console.log(func(1))
console.log(func2(1))
```

## 接口继承

接口间可以互相继承

```ts
interface Base {
    a: string
}
const base:Base = {
    a: '123'
}
interface Conf extends Base {
    b: number
}
// 等价
// type Conf = Base & { b: number }
const conf1: Conf = {
    a: '123',
    b: 1
}
```

