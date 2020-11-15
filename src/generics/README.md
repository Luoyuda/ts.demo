# 泛型

泛型（Generics）是允许同一个函数接受不同类型参数的一种模板。相比于使用 any 类型，使用泛型来创建可复用的组件要更好，因为泛型会保留参数类型。

```ts
// T 代表 Type，在定义泛型时通常用作第一个类型变量名称。 
function id<T>(arg: T): T {
    return arg;
}
console.log(id<number>(123))
console.log(id<string>('123'))
console.log(id(123)) // 类型推断为 number
console.log(id('123')) // 类型推断为 string
```

常用泛型变量
* K（Key）：表示对象中的键类型；
* V（Value）：表示对象中的值类型；
* E（Element）：表示元素类型。


```ts
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
```

## 泛型接口

```ts
interface Log {
    <T>(value: T): T
}
// 等同于
// type Log = <T>(value: T) => T;
const log:Log = (str) => {
    return str
}
console.log(log('log: 123'))
console.log(log(123423))
```

## 泛型类

```ts
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
```

## 泛型工具类型

1. `typeof`：获取一个变量声明或对象的类型
2. `keyof`：取某种类型的所有键，其返回类型是联合类型
3. `in`：遍历枚举类型
4. `infer`：在条件类型语句中，可以用 infer 声明一个类型变量并且对它进行使用
5. `extends`：继承
6. `Partial`：配置成可选项
7. `Required`：配置成必须

```ts
// typeof
interface Option1 {
    a: number;
    b: string;
}

const option: Option1 = { a: 1, b: '1'}
type Option2 = typeof option
const option2: Option2 = { a: 1, b: '1'}

// keyof
interface Option3 {
    a: number;
    b: string;
}

type Option4 = keyof Option3 // "a" | "b"
type Option5 = keyof Option3[] // number | "length" | "toString" | "toLocaleString" | "pop" | "push" | "concat" | "join" | "reverse" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | ... 14 more ... | "includes"
type Option6 = keyof { [x: string]: Option3 }

// in
type Keys = "a" | "b" | "c"
type Option7 = {
    [k in Keys]: number
}
const option7: Option7 = {
    a: 1,
    b: 2,
    c: 2
}

// infer
type Option8<T> = T extends () => infer R ? R : boolean;
type ReturnType1<T> = T extends (
    ...args: any[]
) => infer R ? R : any;

let res: ReturnType1<() => [number | string]>
let option9: Option8<number>; // => boolean
let option10: Option8<''>; // => boolean
let option11: Option8<() => Promise<number>>; // => Promise<number>
let option12: Option8<() => string>; // => string

// extends

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

// Partial
interface PullDownRefreshConfig {
    threshold: number;
    stop: number;
}
// 所有参数可选
type PullDownRefreshConfigOptions = Partial<PullDownRefreshConfig>
let obj:PullDownRefreshConfig = {
    threshold: 1,
    stop: 2
}
let options:PullDownRefreshConfigOptions = {
    threshold: 1,
}

// Required
interface Con {
    threshold?: number;
    stop: number;
}
// 所选参数必须
type ConReq = Required<Con>

let con:Con = {
    // threshold: 1,
    stop: 2
}

let cons:ConReq = {
    threshold: 1,
    stop: 2
}
```