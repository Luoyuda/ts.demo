<!--
 * @Author: xiaohuolong
 * @Date: 2020-11-14 11:05:32
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-11-14 11:35:22
 * @FilePath: /ts.demo/src/array.object/README.md
-->
# 数组和对象

## 数组类型

可以有三种方式去声明数组
1. 「类型 + 方括号」表示法
2. Array<type>
3. 接口表示数组

```ts
// 接口
interface NumberArray {
    [index: number]: number;
}
var number2: NumberArray = [1,1,1,1,3]
console.log(number2)
// 类型方括号
var numbers: number[] = [1,1,1,1,3]
console.log(numbers)
// Array<type>
var number1: Array<number> = [1,1,1,1,3]
console.log(number1)
// 被类型推断成 string[]
var strings = ['1','1','1','1','3']
console.log(strings)
```
```js
var numbers = [1, 1, 1, 1, 3];
var number1 = [1, 1, 1, 1, 3];
var number2 = [1, 1, 1, 1, 3];
console.log(numbers);
console.log(number1);
console.log(number2);
var strings = ['1', '1', '1', '1', '3'];
console.log(strings);
```

## 元组

元组可用于定义具有有限数量的未命名属性的类型。每个属性都有一个关联的类型。使用元组时，必须提供每个属性的值。

```ts
let tuple: [string , number | string]
// 需要类型对应，否则会报错
tuple = ['1', 1]
tuple = ['1', "1"]
```
```js
let tuple;
tuple = ['1', 1];
tuple = ['1', "1"];
```

## 对象

可以通过指定类型去声明对象

```ts
// 需要按照接口定义的参数声明
interface Option {
    a: number
}
const b: Option = {
    a: 1
}
/**
 * {} 类型描述了一个没有成员的对象。
 * 当你试图访问这样一个对象的任意属性时，会报错
*/
const c = {}
/**
 * type 泛型
 */
type Config<T> = {
    b: T
}
const conf: Config<number> = {
    b: 1
}
const conf2: Config<string> = {
    b: "1"
}
```
```js
const b = {
    a: 1
};
/**
 * {} 类型描述了一个没有成员的对象。
 * 当你试图访问这样一个对象的任意属性时，会报错
*/
const c = {};
const conf = {
    b: 1
};
const conf2 = {
    b: "1"
};
```