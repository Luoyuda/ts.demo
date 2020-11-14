/*
 * @Author: xiaohuolong
 * @Date: 2020-09-03 15:16:10
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-11-14 11:16:48
 * @FilePath: /ts.demo/src/array/array.type.ts
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
