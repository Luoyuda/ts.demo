/*
 * @Author: xiaohuolong
 * @Date: 2020-09-03 15:16:10
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-09-03 15:18:06
 * @FilePath: /ts.demo/array.type.ts
 */

/** 
 * 数组类型
 * 1.「类型 + 方括号」表示法
 * 2. 数组泛型  Array<number>
 * 3. 接口表示数组
*/
interface NumberArray {
    [index: number]: number;
}
var numbers: number[] = [1,1,1,1,3]
var number1: Array<number> = [1,1,1,1,3]
var number2: NumberArray = [1,1,1,1,3]
console.log(numbers)
console.log(number1)
console.log(number2)
var strings: string[] = ['1','1','1','1','3']
console.log(strings)

/** 
 * 元组
 * 元组（Tuple）合并了不同类型的对象的数组。
*/
let tuple: [string , number | string]
tuple = ['1', 1]
