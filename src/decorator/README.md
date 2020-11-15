# 装饰器

* 它是一个表达式
* 该表达式被执行后，返回一个函数
* 函数的入参分别为 target、name 和 descriptor
* 执行该函数后，可能返回 descriptor 对象，用于配置 target 对象

## 类装饰器

类装饰器是指接受一个类构造函数作为参数的函数，并且返回 `undefined` 、参数中提供的构造函数或一个新的构造函数。返回 `undefined` 等同于返回参数中的构造函数

```ts
/**
 * 类装饰器
 * 是一个表达式，返回一个函数
 * 入参为(target, name, descriptor)
 * 执行后返回 descriptor 对象用于配置 target
*/
function classDecorator<T extends { new (...args:any[]): {} }>(constructor:T) {
    return class extends constructor {
        newProperty = "new property"
        greeting = "override"
        say(){
            console.log(123)
        }
    }
}
@classDecorator
class P {
    say() {
        console.log(321)
    }
}
const p = new P()
p.say() // new property override
```

## 方法装饰器

方法装饰器是一个接受三个参数的函数：包含这个属性的对象、属性名和一个可选参数。返回 `undefined`、参数提供的属性描述对象或一个新的属性描述对象。返回 `undefined` 等同于返回参数提供的属性描述对象

```ts
/**
 * 方法装饰器
 * @param target 构造函数
 * @param key 属性值
 * @param descriptor 成员的属性描述符
 * descriptor对象原来的值如下
    {
        value: specifiedFunction,
        enumerable: false,
        configurable: true,
        writable: true
    }
*/
function log(target:any, key:any, descriptor:any) {
    const fn = descriptor.value
    descriptor.value = function(...args:any[]){
        console.log(`log : ${args.join(',')}`)
        return fn(...args)
    }
}

function readonly(flag: boolean){
    return function (target:any, key:any, descriptor:any) {
        descriptor.writable = !flag
    }
}
class R {
    @readonly(true)
    @log
    add(a: number, b: number) {
        console.log(a + b)
    }
}
const r = new R()
r.add(1, 2) // log : 1, 2  3
r.add = () => {} // 报错 Cannot assign to read only property
```

## 属性装饰器

属性装饰器接受两个参数的函数，包括这个属性的对象和这个属性的属性名，不会返回一个属性描述对象

```ts
/**
 * 属性装饰器
 * @param target 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
 * @param propertyName 成员的名字。
 */
function defaultValue(value: string) {
    return function (target: any, propertyName: string) {
        console.log(propertyName)
        target[propertyName] = value;
    }
}
class T {
    @defaultValue('default') propName!: string;
}
const t = new T();
console.log(t.propName)
```
## 参数装饰器

参数装饰器是一个接受三个参数的函数，一个包含了被装饰参数的方法的对象、方法的名字和参数在参数列表中的索引，返回值会被直接忽略

```ts
/**
 * 
 * @param value 方法参数装饰器
 * 参数装饰器表达式会在运行时当作函数被调用，传入下列3个参数：
 * @param target 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
 * @param methodName 参数的名字。
 * @param paramIndex 参数在函数参数列表中的索引。
 */
type Params = {
    [propName: string]: number[]
}
const Param:Params = {

} 
function required(target:any, methodName: string, paramIndex: number) {
    let arr:number[] = Param[methodName] || []
    arr.push(paramIndex)
    Param[methodName] = arr
}
function validate(target:any, key:any, descriptor:any){
    const fn = descriptor.value
    descriptor.value = function(...args:any[]){
        const param: number[] = Param[key] || []
        if(param){
            param.forEach((item:number) => {
                if(!args[item]){
                    throw new Error('必须参数未输入')
                }
            })
        }
        return fn(...args)
    }
}
class Y {
    @validate
    say(@required message: string, @required msg?: string){
        return message + msg
    }
}
const y = new Y()
console.log(y.say('1', '2'))
console.log(y.say('1')) // 报错： 必须参数未输入
console.log(Param)
```

## 装饰器工厂

装饰器工厂是一个接受任意数量参数的函数，必须返回上述任何一种装饰器

```ts
function logMethod(target:any, key:any, descriptor:any) {
    const fn = descriptor.value
    descriptor.value = function(...args:any[]){
        console.log(`log : ${args.join(',')}`)
        return fn(...args)
    }
}
function logProperty(target: any, key: string){
    let _val = target[key]

    let getter = function() {
        console.log(`get => => ${key}`)
        return _val
    }
    let setter = function(val: string) {
        console.log(`set => => ${key} ${val}`)
        _val = val
    }
    console.log(key)
    if(delete target[key]){
        Object.defineProperty(target, key, {
            get: getter,
            set: setter
        })
    }
}
function logParams(target:any, methodName: string, paramIndex: number){
    console.log(target)
    console.log(`${methodName}() param ${paramIndex}`)
}
function Log(...args: any[]){
    args = args.filter(item => item !== undefined)
    switch (args.length){
        case 1:
            console.log(`new ${args[0].name}`)
        break
        case 2:
            console.log(`属性装饰器`)
            return logProperty(args[0], args[1])
        break
        case 3:
            if(typeof args[2] === 'number'){
                console.log(`参数装饰器`)
                return logParams(args[0], args[1], args[2])
            }
            console.log(`方法装饰器`)
            return logMethod(args[0], args[1], args[2])
        break
        default:
            throw new Error('报错报错')
    }
}

@Log
class U {
    @Log 
    a?: string;

    @Log
    say(@Log a: string){
        console.log('hi' + a)
    }
}
const u = new U()
console.log(u)
console.log(u.say('hh'))
u.a = '1'
console.log(u.a)
```