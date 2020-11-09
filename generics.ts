/*
 * @Author: xiaohuolong
 * @Date: 2020-09-03 18:07:42
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-11-09 15:28:46
 * @FilePath: /ts.demo/generics.ts
 */
// T表示泛型，具体什么类型是调用这个方法的时候决定的
// 表示参数是什么类型就返回什么类型
function id<T>(arg: T): T {
    return arg;
}
console.log(id<number>(123))
console.log(id<string>('123'))

const ids = <T, U>(arg: T, arg2: U): [U, T] => {
    return [arg2, arg]
}
type O = {
    a: number
}
type F<T> = {
    a: T
}
console.log(ids<number, number>(123, 2))
console.log(ids<string, number>('123', 2))
console.log(ids<number, string>(2, '123'))
console.log(ids<number[], number[]>([123], [2]))
console.log(ids<number[], string[]>([123], ['2']))
console.log(ids<O, O>({a:1}, {a:2}))
console.log(ids<F<number>, F<string>>({a:1}, {a:'2'}))

type Log = <T>(value: T) => T;
// 等同于
// interface Log {
//     <T>(value: T): T
// }
const log:Log = (str) => {
    return str
}
console.log(log('log: 123'))
console.log(log(123423))

type Log2<T> = (value: T) => T;
// 等同于
// interface Log2<T> {
//     (value: T):T
// }
const log2:Log2<string> = (str) => {
    return `log2: ${str}`
}
console.log(log2('123'))

// 泛型类
class Log3<T>{
    run(value: T){
        return value
    }
}
console.log(new Log3<number>().run(123))
console.log(new Log3<string>().run('123'))
const log3 = new Log3()
console.log(log3.run(123))
console.log(log3.run('123'))

// 类型约束
interface Length {
    length: number
}
function logLength<T extends Length>(value: T){
    return value.length
}
console.log(logLength({ length: 2 })) // 2
console.log(logLength([])) // 0
console.log(logLength('1')) // 1

// 对象属性约束
// 泛型约束对象中的属性
function getProp<T,K extends keyof T>(obj:T,key: K) {
    return obj[key]
}

console.log(getProp({a:1}, 'a'))
console.log(getProp([1], 0))
console.log(getProp('abc', 0))

type P<T> = R<T>;
type R<T = {}> = {
    name: T;
};

const a: R<string> = { name: '123' } // ok
const b: P<number> = { name: 1 } // ok
const c: P<[string, number]> = { name: ['1', 2] } // ok
console.log(a)
console.log(b)
console.log(c)


type A = {
    size: number
}
function trace<T extends A>(arg: T): T {
    console.log(arg.size);
    return arg;
}

trace({
    size: 10
})

class Generic<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
    constructor(zeroValue: T, add: (x: T, y: T) => T){
        this.zeroValue = zeroValue
        this.add = add
    }
}

let myGenericNumber = new Generic<number>(0, (x, y) => x + y);
let myGenericString = new Generic<string>('0', (x, y) => x + y);

console.log(myGenericNumber.add(1,2))
console.log(myGenericString.add('1','2'))

