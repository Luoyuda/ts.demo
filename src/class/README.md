<!--
 * @Author: xiaohuolong
 * @Date: 2020-11-15 07:53:47
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-11-15 08:30:00
 * @FilePath: /ts.demo/src/class/README.md
-->
# 类

类定义了一件事物的抽象特点，包含它的属性和方法

## 属性与方法

```ts
class P { 
    private leg:number = 2
    protected hand:number = 2
    constructor(private name:string){
    }
    say():string {
        return `我是${this.name}，我有${this.leg}条腿和${this.hand}条手`
    }
}
```
```js
class P {
    constructor(name) {
        this.name = name;
        this.leg = 2;
        this.hand = 2;
    }
    say() {
        return `我是${this.name}，我有${this.leg}条腿和${this.hand}条手`;
    }
}
```
## 修饰符

1. public 共有属性，可以在实例对象/子类/子类实例对象访问到的属性
2. private 私有属性，只能在定义的类内部调用的属性。
3. protected 受保护属性，只能在类及其子类中访问
4. readonly 只读属性，只读属性必须在声明时或构造函数里被初始化，只能读取的属性
5. static 修饰符修饰的方法称为静态方法，它们不需要实例化，而是直接通过类来调用

```ts
class Dog {
    // 创建属性需要给默认值，或者在构造函数中给值，或者 ?leg 表示其为可选
    public leg:number = 4
    private head:number = 1
    protected tail:number = 1
    readonly body:number = 1
    static eye:number = 2
    // 直接在构造函数中传递修饰符直接创建对应属性
    constructor(public color: string){}
    showPrivate(){
        console.log(this.head)
    }
    showProtect(){
        console.log(this.tail)
    }
}

class BigDog extends Dog {
    showProtect(){
        console.log(`${this.tail} by bigDog`)
    }
}

const dog:Dog = new Dog('red')
const bigDog:BigDog = new BigDog('green')
console.log(dog.leg)
// 私有属性只能内部调用
dog.showPrivate()
// console.log(dog.head) // 报错
// 受保护属性能能在类和子类中访问
dog.showProtect()
// 只读属性不能改写
// dog.body = 1 
bigDog.showProtect()
// 静态属性只能通过类调用
console.log(Dog.eye)
// console.log(dog.eye) // 报错
```
```js
class Dog {
    // 直接在构造函数中传递修饰符直接创建对应属性
    constructor(color) {
        this.color = color;
        // 创建属性需要给默认值，或者在构造函数中给值，或者 ?leg 表示其为可选
        this.leg = 4;
        this.head = 1;
        this.tail = 1;
        this.body = 1;
    }
    showPrivate() {
        console.log(this.head);
    }
    showProtect() {
        console.log(this.tail);
    }
}
Dog.eye = 2;
class BigDog extends Dog {
    showProtect() {
        console.log(`${this.tail} by bigDog`);
    }
}
const dog = new Dog('red');
const bigDog = new BigDog('green');
console.log(dog.leg);
// 私有属性只能内部调用
dog.showPrivate();
// console.log(dog.head) // 报错
// 受保护属性能能在类和子类中访问
dog.showProtect();
// 只读属性不能改写
// dog.body = 1 
bigDog.showProtect();
// 静态属性只能通过类调用
console.log(Dog.eye);
// console.log(dog.eye) // 报错
```

## 封装、继承、多态

1. 封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
2. 继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性， 类通过 extends 关键字，且在构造函数中调用 super() 来实现继承
3. 多态（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。
4. 存取器（getter & setter）：用以改变属性的读取和赋值行为

```ts
class P { 
    private leg:number = 2
    protected hand:number = 2
    constructor(private name:string){
    }
    say():string {
        return `我是${this.name}，我有${this.leg}条腿和${this.hand}条手`
    }
}
let person = new P('person');
// 面向对象（OOP）的三大特性：封装、继承、多态
// 封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
// 继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
// 类通过 extends 关键字，且在构造函数中调用 super() 来实现继承
class Chinese extends P {
    // readonly country:string = '中国'
    constructor(name:string, readonly country:string = '中国'){
        // super关键字，它代表父类
        super(name)
    }
    where(){
        return `我来自${this.country}`
    }
    // 多态
    say():string {
        return `我是中国人`
    }
}

// 多态（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。比如 Cat 和 Dog 都继承自 Animal，但是分别实现了自己的 eat 方法。此时针对某一个实例，我们无需了解它是 Cat 还是 Dog，就可以直接调用 eat 方法，程序会自动判断出来应该如何执行 eat
// 存取器（getter & setter）：用以改变属性的读取和赋值行为
class Japanese extends P {
    private _country:string = 'XX'
    constructor(name:string){
        super(name)
    }
    // 多态
    say():string {
        return `我是日本人`
    }
    // 存取器
    get country(): string {
        return `我来自${this._country}`;
    }
    set country(country: string) {
        this._country = country;
    }
}
let xiaYu = new Chinese('xiaYu')
let J = new Japanese('J')
// 多态
console.log(xiaYu.say())
console.log(J.say())
// 存取器
console.log(J.country) //我来自XX
J.country = 'JP'
console.log(J.country) //我来自JP
```

## 抽象类

抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现

```ts
abstract class P2 {
    constructor(public address:string) {}
    public abstract where():string
}
class C extends P2 {
    constructor(address:string){
        super(address)
    }
    where():string{
        return `from ${this.address}`
    }
}
var c = new C('C')
console.log(c.where())
```

## 类与接口的关系

1. 接口可以约束类成员有哪些属性以及属性类型
2. 接口只能约束共有成员，不能约束构造函数 (public)
3. 接口可以继承类，抽离所有的成员属性 (public, private, protected)

```ts
interface Run {
    run():string
}
interface Eat {
    eat():string
}
// 接口继承接口
interface Dog extends Run, Eat {}
class Jump {
    jump(){}
}
// 接口
interface IJump extends Jump {}
// 类实现接口
class Person implements Run,Eat,Jump {
    run():string{
        return "run by 2 leg"
    }
    eat():string {
        return "eat by 2 hand"
    }
    jump():string {
        return "jump by 2 leg"
    }
}
let p = new Person()
console.log(p.run())
console.log(p.eat())
console.log(p.jump())
```
