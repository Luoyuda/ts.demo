/*
 * @Author: xiaohuolong
 * @Date: 2020-09-03 15:16:50
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-09-03 15:18:23
 * @FilePath: /ts.demo/function.ts
 */
/** 
 * 函数声明
 * 1. 函数声明
 * 2. 函数表达式
 * 参数选项
 * 1. 可选参数 ?
 * 2. 参数默认值 =
 * 3. 剩余参数 ...
*/
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

// 重载 重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。
function reverse(x: number): number | string 
function reverse(x: string): number | string 
function reverse(x:any): number | string {
    if (!(<string>x).length) {
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
