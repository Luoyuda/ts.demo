/*
 * @Author: xiaohuolong
 * @Date: 2020-09-03 15:16:50
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-11-14 23:20:02
 * @FilePath: /ts.demo/src/function/function.ts
 */
/** 
 * 函数声明
 * 1. 函数声明
 * 2. 函数表达式
*/
function add1(x: number, y: number): number{
    return x + y
}
const add2 = function (x: number, y: number): number{
    return x + y
}
console.log(add1(1, 2) === add2(1, 2))

// 函数类型
let add3: (x: number, y: number) => number;

function add4(x: number, y: number): number {
    return x + y;
}

add3 = add4
console.log(add3(1, 2) === add4(1, 2))

/**
* 参数选项
* 1. 可选参数 ?
* 2. 参数默认值 =
* 3. 剩余参数 ...
*/
function add5(a: number, b: number, c?: number){
    return (a + b) + (c ? c : 0)
}
console.log(add5(1, 2, 3) === add5(3, 3))

function add6(a: number, b: number, c: number = 0){
    return a + b + c
}
console.log(add6(1, 2, 3) === add6(3, 3))

function add7(...args: number[]): number{
    return args.reduce((prev, current) => prev + current, 0)
}
console.log(add7(1, 2, 3) === add7(3, 3))

// 函数重载
type Com = string | number
function add8(x: number, y: number): number
function add8(x: string, y: string): string
function add8(x: number, y: string): string
function add8(x: string, y: number): string
function add8(x: Com, y: Com): Com{
    if(typeof x === "string" || typeof y === "string"){
        return x.toString() + y.toString()
    }
    return x + y
}
console.log(add8(1, 2), add8('1', 2), add8(1, '2'), add8('1', '2'))

function sum(x: number, y: number): number{
    return x + y
} 
//注意这里的左边 => 是ts中是用来表示输入类型 而右边的 => 是 es6 的箭头函数
let sum2: (x: number, y: number) => number = (x, y) => x + y
console.log(sum(1, 2))
console.log(sum2(2, 2))
// 接口也可以表示函数的形状
interface Say {
    (x?: string, y?: string): string
}
let say: Say = (x: string = 'Hello', y) => `${x}-${y || 'MI'}`
console.log(say('Hi', 'XiaYu'))
console.log(say())
let push: (array: number[], ...item: number[]) => number[] = (arr, ...items) => items.map(item => arr.push(item))
console.log(push([], 1, 2, 4, 3))

// 重载 
function reverse(x: number): number | string 
function reverse(x: string): number | string 
function reverse(x:any): number | string {
    if (!<string>(x).length) {
        return Number(x.toString().split('').reverse().join(''));
    }else {
        return x.split('').reverse().join('');
    }
}

console.log(reverse(123), reverse('456'))

type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}

console.log(getName('1323'))
console.log(getName(()=>'222'))


// 类型断言：可以用来手动指定一个值的类型。断言成一个联合类型中不存在的类型是不允许的
const getLenByList = (str: string | number): number => {
    if((str as string).length){
        return (<string>str).length
    }else{
        return str.toString().length
    }
}
console.log(getLenByList(123321))
console.log(getLenByList('123321'))

// 对象解构需要用这种方式声明类型
const add = function ({ one, two }: { one: number, two: number }): number{
    return one + two
}
console.log(add({
    one: 1,
    two: 2
}))
