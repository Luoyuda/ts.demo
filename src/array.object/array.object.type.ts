/*
 * @Author: xiaohuolong
 * @Date: 2020-09-03 15:16:10
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-11-14 11:31:41
 * @FilePath: /ts.demo/src/array.object/array.object.type.ts
 */

/** 
 * 数组类型
 * 1.「类型 + 方括号」表示法
 * 2. 数组泛型  Array<number>
 * 3. 接口表示数组
*/
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

/** 
 * 元组
 * 元组（Tuple）合并了不同类型的对象的数组。
*/
let tuple: [string , number | string]
// 需要类型对应，否则会报错
tuple = ['1', 1]
tuple = ['1', "1"]

/**
 * 对象类型
 */
interface Option {
    a: number
}
// 需要按照接口定义的参数声明
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