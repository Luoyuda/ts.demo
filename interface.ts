/*
 * @Author: xiaohuolong
 * @Date: 2020-09-03 15:15:17
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-09-03 15:41:15
 * @FilePath: /ts.demo/interface.ts
 */
/** 
 * 对象类型
 * 接口
 * 接口是对行为的抽象表达，具体由类去实现，
 * 实现需要严格按照设定的接口属性进行实例化
 * 属性配置
 * 1. 可选属性 在接口属性后加上 ?
 * 2. 任意属性 [propName: string]
 * 3. 只读属性 只能在创建的时候被赋值，readonly
 * 例如 一个人的对象的接口表达如下
*/
interface Person2{
    readonly id: number,
    name: string,
    age?: number | undefined,
    say():string,
    [propName: string]: any,
}
// 接口继承
interface Woman extends Person2{
    sex: string
}

let woman: Woman = {
    id: 3,
    name: 'woman',
    sex: 'female',
    age: 18,
    say(){
        return `${this.sex} - ${this.name}`
    }
}
console.log(woman)
console.log(woman.say())
// 接口继承类
class Man implements Person2{
    id = 2
    name = 'Man-1'
    say(){
        return `I am ${this.name}`
    }
}
console.log(new Man().say())

let curry: Person2 = {
    id: 1,
    name: 'Curry',
    age: 30,
    a: '1',
    say(){
        return `I am ${this.name}`
    }
}
console.log(curry)
console.log(curry.say())
