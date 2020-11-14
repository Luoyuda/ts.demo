/*
 * @Author: xiaohuolong
 * @Date: 2020-09-03 15:15:17
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-11-14 13:04:54
 * @FilePath: /ts.demo/src/interface/interface.ts
 */
/** 
 * 对象类型
 * 接口
 * 接口是对行为的抽象表达，具体由类去实现，
 * 实现需要严格按照设定的接口属性进行实例化
 * 属性配置
 * 1. 可选属性 在接口属性后加上 ?
 * 2. 任意属性 [propName: string]
 * 3. 只读属性 只能在创建的时候被赋值，readonly
 * 例如 一个人的对象的接口表达如下
*/
interface Person2{
    readonly id: number;
    name: string;
    age?: number | undefined;
    say():string;
    [propName: string]: any;
}
// 接口继承
interface Woman extends Person2{
    sex: string
}

let woman: Woman = {
    id: 3,
    name: 'woman',
    sex: 'female',
    age: 18,
    say(){
        return `${this.sex} - ${this.name}`
    }
}
console.log(woman)
console.log(woman.say())
// 接口继承类
class Man implements Person2{
    id = 2
    name = 'Man-1'
    say(){
        return `I am ${this.name}`
    }
}
console.log(new Man().say())

let curry: Person2 = {
    id: 1,
    name: 'Curry',
    age: 30,
    a: '1',
    say(){
        return `I am ${this.name}`
    }
}
console.log(curry)
console.log(curry.say())

// 接口描述数组、对象、字符串和函数

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