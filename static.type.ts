/** 
 * 布尔值
 * boolean
*/
let isDone: boolean = false
/** 
 * 数值型
 * number
*/
let six: number = 6
let infinity: number = Infinity
/** 
 * 字符串
 * string
*/
let str: string = '123'
let Str: string = `Str = ${str}`
/** 
 * 空值
*/
function consoleMsg(): void{
    console.log('msg')
}
consoleMsg()
/** 
 * undefined
 * null
*/
let u: undefined
let n: null = null
console.log(typeof u)
console.log(typeof n)
/**
 * Symbol
 */
let sym3: Symbol = Symbol("key");
console.log(sym3)
/**
 * 任意类型 
 * any
 * 可以赋值为任意类型的类型
 * 
*/
let anyThing: any = 'hello'
anyThing = 10
/** 
 * 类型推论
 * 在没有明确指定类型的时候，会通过定义的值推断其类型；
 * 如果没有赋值，则会被推断成 any 类型
*/
var num
num = 10
num = '10'
/** 
 * 联合类型
 * 表示值可以为多种类型中的一种，用 | 分隔
*/
var num2: number | string | boolean = '123'
num2 = 1
num2 = true

/** 
 * 枚举
 * Enum 用于取值被限定在一定范围内的场景
*/
enum Status { load, unload }
console.log(Status['load'])

/**
 * Never 类型表示的是那些永不存在的值的类型
 */
const error = (msg:string):never => {
    throw new Error(msg)
}
// error('我是个错误')