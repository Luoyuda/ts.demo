/*
 * @Author: xiaohuolong
 * @Date: 2020-09-03 18:07:42
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-09-03 18:33:07
 * @FilePath: /ts.demo/generics.ts
 */
function id<T>(arg: T): T {
    return arg;
}
console.log(id(123))

const ids = <T, U>(arg: T, arg2: U): [U, T] => {
    return [arg2, arg]
}
console.log(ids(123, 2))
console.log(ids('123', '2'))
console.log(ids([123], [2]))
console.log(ids({a:1}, {b:2}))

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