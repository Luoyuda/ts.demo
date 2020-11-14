# 数据类型

## 基本数据类型

### boolean

布尔类型表示一个值是否正确，值可以为 `true` 或 `false`
```ts
let isDone: boolean = false
```
```js
let isDone = false;
```

### number

所有的数字在 `Typescript` 中都是浮点数，这些浮点数都是 `number` 类型
```ts
let six: number = 6
let infinity: number = Infinity
```
```js
let six = 6;
let infinity = Infinity;
```

### string

`string` 类型表示文本
```ts
let str: string = '123'
let Str: string = `Str = ${str}`
```
```js
let str = '123';
let Str = `Str = ${str}`;
```

### void

`void` 表示一个空值，表示不是任何一个类型
```ts
function consoleMsg(): void{
    console.log('msg')
}
consoleMsg()
```
```js
function consoleMsg() {
    console.log('msg');
}
consoleMsg();
```

### undefined null

`undefined` 是全局作用域的一个属性，它会赋值给那些被声明但未初始化的变量
`null` 是一个字面量，它可以被复制给那些表示没有值的变量

```ts
let u: undefined
let n: null = null
console.log(typeof u)
console.log(typeof n)
```
```js
let u;
let n = null;
console.log(typeof u);
console.log(typeof n);
```

### any

可以表示任意的值，可以使用它逃过类型检查🐶

```ts
let anyThing: any = 'hello'
anyThing = 10
```

```js
let anyThing = 'hello';
anyThing = 10;
```

### symbol

`symbol` 表示一个独一无二的值

```ts
let sym2: Symbol = Symbol("key");
let sym3: Symbol = Symbol("key");
console.log(sym3)
console.log(sym2 == sym3)
```

```js
let sym2 = Symbol("key");
let sym3 = Symbol("key");
console.log(sym3);
console.log(sym2 == sym3);
```

### enum

枚举：一组有名字的常量集合，只读类型，不允许修改，默认从0开始

```ts
enum Status { load, unload }
```
```js
var Status;
(function (Status) {
    Status[Status["load"] = 0] = "load";
    Status[Status["unload"] = 1] = "unload";
})(Status || (Status = {}));
```
🌰
```ts
enum Role {
    superAdmin1=1,
    superAdmin2,
    admin1,
    admin2,
    vip,
    user
}

function checkRole(role: number){
    if(role === Role.superAdmin1 || role === Role.superAdmin2){
        console.log('super admin')
    }else if(role === Role.admin1 || role === Role.admin2){
        console.log('admin')
    }else if(role === Role.vip){
        console.log('vip')
    }else{
        console.log('user')
    }
}
```
```js
var Role;
(function (Role) {
    Role[Role["superAdmin1"] = 1] = "superAdmin1";
    Role[Role["superAdmin2"] = 2] = "superAdmin2";
    Role[Role["admin1"] = 3] = "admin1";
    Role[Role["admin2"] = 4] = "admin2";
    Role[Role["vip"] = 5] = "vip";
    Role[Role["user"] = 6] = "user";
})(Role || (Role = {}));
function checkRole(role) {
    if (role === Role.superAdmin1 || role === Role.superAdmin2) {
        console.log('super admin');
    }
    else if (role === Role.admin1 || role === Role.admin2) {
        console.log('admin');
    }
    else if (role === Role.vip) {
        console.log('vip');
    }
    else {
        console.log('user');
    }
}
```
如果使用的是常量枚举 `checkRole` 不变
```ts
const enum Role {
    superAdmin1=1,
    superAdmin2,
    admin1,
    admin2,
    vip,
    user
}
```
```js
function checkRole(role) {
    if (role === 1 /* superAdmin1 */ || role === 2 /* superAdmin2 */) {
        console.log('super admin');
    }
    else if (role === 3 /* admin1 */ || role === 4 /* admin2 */) {
        console.log('admin');
    }
    else if (role === 5 /* vip */) {
        console.log('vip');
    }
    else {
        console.log('user');
    }
}
```

### never

`never` 表示的是那些永不存在的值的类型
```ts
const error = (msg:string):never => {
    throw new Error(msg)
}
// error('我是个错误')
```
```js
const error = (msg) => {
    throw new Error(msg);
};
// error('我是个错误')
```

## 类型推论

在没有明确指定类型的时候，会通过定义的值推断其类型；如果没有赋值，则会被推断成 any 类型

```ts
var num // 会被推断成 any 类型
num = 10
num = '10'
var num1 = 10 // 会被推断成 number 类型
```

## 联合类型

表示值可以为多种类型中的一种，用 | 分隔

```ts
var num2: number | string | boolean = '123'
num2 = 1
num2 = true
num2 = undefined // 报错 Type 'undefined' is not assignable to type 'string | number | boolean'.
```
```js
var num2 = '123';
num2 = 1;
num2 = true;
```

