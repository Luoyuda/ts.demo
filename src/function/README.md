# 函数

`typescript` 中的函数参数，需要按定义的规则传入参数，否则编译器会报错

## 声明方式

1. 函数声明（两种声明方式的区别在于函数声明存在变量提升问题）
2. 函数表达式

```ts
function add1(x: number, y: number): number{
    return x + y
}
const add2 = function (x: number, y: number): number{
    return x + y
}
console.log(add1(1, 2) === add2(1, 2))
```
```js
function add1(x, y) {
    return x + y;
}
const add2 = function (x, y) {
    return x + y;
};
console.log(add1(1, 2) === add2(1, 2));
```

## 参数类型和返回类型

需要给函数的参数和返回值的定义其类型

```ts
function add1(x: number, y: number): number{
    return x + y
}
```

## 函数类型

可以定义函数的类型，可以把同类型的函数赋值给它

```ts
let add3: (x: number, y: number) => number;

function add4(x: number, y: number): number {
    return x + y;
}

add3 = add4
console.log(add3(1, 2) === add4(1, 2))
```

## 参数

1. 可选参数 ? （可选参数要放在普通参数的后面）
2. 参数默认值 =
3. 剩余参数 ...

```ts
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
```
```js
function add5(a, b, c) {
    return (a + b) + (c ? c : 0);
}
console.log(add5(1, 2, 3) === add5(3, 3));
function add6(a, b, c = 0) {
    return a + b + c;
}
console.log(add6(1, 2, 3) === add6(3, 3));
function add7(...args) {
    return args.reduce((prev, current) => prev + current, 0);
}
console.log(add7(1, 2, 3) === add7(3, 3));
```

## 函数重载

重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。

```ts
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
```
```js
function add8(x, y) {
    if (typeof x === "string" || typeof y === "string") {
        return x.toString() + y.toString();
    }
    return x + y;
}
console.log(add8(1, 2), add8('1', 2), add8(1, '2'), add8('1', '2'));
```