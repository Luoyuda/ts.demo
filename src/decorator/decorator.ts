/*
 * @Author: xiaohuolong
 * @Date: 2020-09-04 14:48:20
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-11-15 17:58:20
 * @FilePath: /ts.demo/src/decorator/decorator.ts
 */
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
            console.log(this.newProperty, this.greeting)
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
p.say()
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
// r.add = () => {} // 报错 Cannot assign to read only property
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
// console.log(y.say('1')) // 报错： 必须参数未输入
console.log(Param)
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

@classDecorator
class Greeter {
    @defaultValue('default') propName!: string;
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    @validate
    hi(@required message: string, @required msg?: string){
        return message + msg
    }
    @readonly(false)
    greet() {
        return "Hello, " + this.greeting;
    }
    @readonly(true)
    @log
    print(...args:any[]) {
        return `print: ${args.join(',')}`
    }
}

const greeter = new Greeter('123')
console.log(greeter.greet())
console.log(greeter.print(1, 2, '3', true))
console.log(greeter.propName)
greeter.propName = '123'
console.log(greeter.propName)
console.log(greeter.hi('321','123'))
console.log(Param)

console.log('装饰器工厂')
// 方法装饰器
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