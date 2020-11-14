<!--
 * @Author: xiaohuolong
 * @Date: 2020-11-14 11:05:32
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-11-14 11:17:35
 * @FilePath: /ts.demo/src/array/README.md
-->
# 数组

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