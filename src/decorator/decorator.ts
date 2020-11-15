/*
 * @Author: xiaohuolong
 * @Date: 2020-09-04 14:48:20
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-11-09 14:41:15
 * @FilePath: /ts.demo/decorator.ts
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
            console.log(123)
        }
    }
}
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
        descriptor.writable = flag
    }
}
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
/**
 * 属性装饰器
 * 参数装饰器只能用来监视一个方法的参数是否被传入。
 * @param target 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
 * @param propertyName 成员的名字。
 */
function defaultValue(value: string) {
    return function (target: any, propertyName: string) {
        console.log(propertyName)
        target[propertyName] = value;
    }
}

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
    @readonly(true)
    greet() {
        return "Hello, " + this.greeting;
    }
    @readonly(false)
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
