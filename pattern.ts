/*
 * @Author: xiaohuolong
 * @Date: 2020-11-11 17:22:45
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-11-12 14:20:55
 * @FilePath: /ts.demo/pattern.ts
 */
/**
 * 建造者模式 Builder Pattern
 * 将一个复杂对象分解成多个相对简单的部分，然后根据不同需要分别创建它们，最后构建成该复杂对象。
 * 使用场景
 * 需要生成的产品对象有复杂的内部结构，这些产品对象通常包含多个成员属性。
 * 需要生成的产品对象的属性相互依赖，需要指定其生成顺序。
 * 隔离复杂对象的创建和使用，并使得相同的创建过程可以创建不同的产品。
 */
console.log('------ 建造者模式 ------')
class Car {
    constructor(public engine: string, public chassis:string, public body:string){}
}

class CarBuilder {
    engine!: string
    chassis!: string
    body! : string
    setEngine(engine: string): CarBuilder{
        this.engine = engine
        return this
    }
    setChassis(chassis: string): CarBuilder{
        this.chassis = chassis
        return this
    }
    setBody(body: string): CarBuilder{
        this.body = body
        return this
    }
    build(){
        return new Car(this.engine, this.chassis, this.body)
    }
}

const car:Car = new CarBuilder().setBody('车身').setEngine('引擎').setChassis('底盘').build()
console.log(car)

/**
 * 简单工厂模式
 * 简单工厂让使用者不用知道具体的参数就可以创建出所需的 ”产品“ 类
 * 即使用者可以直接消费产品而不需要知道产品的具体生产细节。
 * 使用场景
 * 工厂类负责创建的对象比较少：由于创建的对象比较少，不会造成工厂方法中业务逻辑过于复杂。
 * 客户端只需知道传入工厂类静态方法的参数，而不需要关心创建对象的细节。
 */
console.log('------ 简单工厂模式 ------')

abstract class BMW {
    abstract run():void;
}

class BMW730 extends BMW {
    run(){
        console.log('run by BMW730')
    }
}

class BMW840 extends BMW {
    run(){
        console.log('run by BMW840')
    }
}

class BMWFactory {
    public static buildBMW(model: 'BMW730' | 'BMW840'):BMW {
        switch (model){
            case 'BMW730':
                return new BMW730()
            case 'BMW840':
                return new BMW840()
        }
    }
}

const bmw840 = BMWFactory.buildBMW('BMW840')
const bmw730 = BMWFactory.buildBMW('BMW730')
bmw840.run()
bmw730.run()


/**
 * 工厂方法模式
 * 工厂父类负责定义创建产品对象的公共接口，而工厂子类则负责生成具体的产品对象， 这样做的目的是将产品类的实例化操作延迟到工厂子类中完成，即通过工厂子类来确定究竟应该实例化哪一个具体产品类。
 * 使用场景
 * 一个类不知道它所需要的对象的类：在工厂方法模式中，客户端不需要知道具体产品类的类名，只需要知道所对应的工厂即可，具体的产品对象由具体工厂类创建；客户端需要知道创建具体产品的工厂类。
 * 一个类通过其子类来指定创建哪个对象：在工厂方法模式中，对于抽象工厂类只需要提供一个创建产品的接口，而由其子类来确定具体要创建的对象，利用面向对象的多态性和里氏代换原则，在程序运行时，子类对象将覆盖父类对象，从而使得系统更容易扩展。
 */
console.log('------ 工厂方法模式 ------')

abstract class Factory {
    abstract produce(): BMW;
}

class BMW730Factory extends Factory {
    produce(){
        return new BMW730()
    }
}

class BMW840Factory extends Factory {
    produce(){
        return new BMW840()
    }
}

const bmw8401 = new BMW730Factory().produce()
const bmw7301 = new BMW840Factory().produce()
bmw8401.run()
bmw7301.run()


/**
 * 抽象工厂
 * 提供一个创建一系列相关或相互依赖对象的接口，而无须指定它们具体的类。
 * 使用场景
 * 一个系统不应当依赖于产品类实例如何被创建、组合和表达的细节，这对于所有类型的工厂模式都是重要的。
 * 系统中有多于一个的产品族，而每次只使用其中某一产品族。
 * 系统提供一个产品类的库，所有的产品以同样的接口出现，从而使客户端不依赖于具体实现。
 */
console.log('------ 抽象工厂 ------')

abstract class FactoryBMW {
    abstract produce730BMW(): BMW730;
    abstract produce840BMW(): BMW840;
}

class ConcreteBMWFactory extends FactoryBMW {
    produce730BMW(){
        return new BMW730()
    }
    produce840BMW(){
        return new BMW840()
    }
}
const fa: ConcreteBMWFactory = new ConcreteBMWFactory()
const bmw8402 = fa.produce840BMW()
const bmw7302 = fa.produce730BMW()
bmw8402.run()
bmw7302.run()

/**
 * 单例模式
 * 有一些对象我们往往只需要一个，不需要重复创建
 * 使用场景
 * 需要频繁实例化然后销毁的对象。
 * 创建对象时耗时过多或耗资源过多，但又经常用到的对象。
 * 系统只需要一个实例对象，如系统要求提供一个唯一的序列号生成器或资源管理器，或者需要考虑资源消耗太大而只允许创建一个对象。
 */
console.log('------ 单例模式 ------')

class Singleton {
    private static singleton: Singleton
    private constructor(){}
    public static getInstance(): Singleton{
        if (!Singleton.singleton) {
            Singleton.singleton = new Singleton();
        }
        return Singleton.singleton
    }
}

const instance1 = Singleton.getInstance()
const instance2 = Singleton.getInstance()
console.log(instance1 === instance2)

/**
 * 适配器模式
 * 解决两个软件实体间的接口不兼容的问题
 * 使用场景
 * 以前开发的系统存在满足新系统功能需求的类，但其接口同新系统的接口不一致。
 * 使用第三方提供的组件，但组件接口定义和自己要求的接口定义不同。
 */
console.log('------ 适配器模式 ------')

interface Logger {
    send(message: string): Promise<void>;
}
interface CloudLogger {
    sendToServer(message: string): Promise<void>;
}

class AliLogger implements CloudLogger {
    sendToServer(message: string): Promise<void>{
        return new Promise((resolve, reject) => {
            console.log(`ali-logger: ${message}`)
            resolve()
        })
    }
}

class CloudLoggerAdapter implements Logger {
    protected logger: CloudLogger
    constructor(logger: CloudLogger){
        this.logger = logger
    }
    send(message: string):Promise<void>{
        return this.logger.sendToServer(message)
    }
}

class NotificationService {
    protected logger: Logger;
    
    constructor (logger: Logger) {    
        this.logger = logger;
    }
    public send(message: string): Promise<void> {
        return this.logger.send(message);
    }
}

class GlobalLogger implements Logger {
    send(message: string):Promise<void>{
        return new Promise((resolve, reject) => {
            console.log(`global-logger: ${message}`)
            resolve()
        })
    }
}

const aliLogger = new AliLogger();
aliLogger.sendToServer('sendToServer')
const cloudAdapter = new CloudLoggerAdapter(aliLogger)
cloudAdapter.send('cloudAdapter-send')
const notification = new NotificationService(cloudAdapter)
notification.send('notification-send')
const globalNotification = new NotificationService(new GlobalLogger())
globalNotification.send('global-notification-send')

/**
 * 观察者模式
 * 它定义了一种一对多的关系，让多个观察者对象同时监听某一个主题对象
 * 这个主题对象的状态发生变化时就会通知所有的观察者对象，使得它们能够自动更新自己。
 * 使用场景
 * 一个对象的行为依赖于另一个对象的状态。或者换一种说法，当被观察对象（目标对象）的状态发生改变时，会直接影响到观察对象的行为。
 */
console.log('------ 观察者模式 ------')

interface Observer {
    notify: Function
}

class ConcreteObserver implements Observer {
    constructor(private name: string){}
    notify(){
        console.log(`${this.name} has been notified`)
    }
}

class Subject {
    private observers: Observer[]
    constructor(observers: Observer[]){
        this.observers = observers
    }

    public addObserver(observer: Observer): void{
        console.log(observer, 'push')
        this.observers.push(observer)
    }

    public deleteObserver(observer: Observer): void{
        const index = this.observers.indexOf(observer)
        if(index <= -1) return
        console.log("delete", observer);
        this.observers.splice(index, 1)
    }

    public notifyObservers(): void{
        console.log("notify all");
        this.observers.forEach(observer => observer.notify())
    }    
}

const subject: Subject = new Subject([])
const xy: Observer = new ConcreteObserver('xy')
const yx: Observer = new ConcreteObserver('yx')
const xx: Observer = new ConcreteObserver('xx')
subject.addObserver(xy)
subject.addObserver(yx)
subject.addObserver(xx)
subject.notifyObservers()
subject.deleteObserver(xx)
subject.notifyObservers()

/**
 * 发布订阅模式
 * 消息的发送者（称为发布者）不会将消息直接发送给特定的接收者（称为订阅者）。
 * 而是将发布的消息分为不同的类别，然后分别发送给不同的订阅者。
 * 使用场景
 * 对象间存在一对多关系，一个对象的状态发生改变会影响其他对象。
 * 作为事件总线，来实现不同组件间或模块间的通信。
 */
console.log('------ 发布订阅模式 ------')

type EventHandler = (...args: any[]) => any;
interface C {
    [propName: string]: EventHandler[]
}

class EventEmitter {
    private c:C = {}
    subscribe(topic: string, ...handlers: EventHandler[]){
        if(!this.c[topic]) this.c[topic] = []
        this.c[topic] = [...this.c[topic], ...handlers]
    }

    unsubscribe(topic: string, handler: EventHandler): boolean{
        if(!topic) return false
        if(!handler) return false
        const topics = this.c[topic]
        if(!topics) return false 
        const index = topics.indexOf(handler)
        topics.splice(index, 1)
        return true
    }

    publish(topic: string, ...args: any[]){
        if(!topic) return false
        const topics = this.c[topic]
        if(!topics) return false 
        return topics.map(handler => {
            try {
                return handler(...args)
            }catch(err){
                console.log(err)
                return null
            }
        })
    }

}

const eventEmitter:EventEmitter = new EventEmitter()
const fn = () => console.log(4, '我被删除了吗')
eventEmitter.subscribe('ts', (...args) => console.log(1,...args))
eventEmitter.subscribe('ts', (...args) => console.log(2,...args))
eventEmitter.subscribe('ts', (...args) => console.log(3,...args))
eventEmitter.subscribe('ts', fn)
eventEmitter.publish('ts', '!!!', '???')
eventEmitter.unsubscribe('ts', fn)
eventEmitter.publish('ts', '!!!!!!', '???')


/**
 * 策略模式
 * 定义了一系列的算法，把它们一个个封装起来，并且使它们可以互相替换。
 * 策略模式的重心不是如何实现算法，而是如何组织、调用这些算法，从而让程序结构更灵活、可维护、可扩展。
 * 使用场景
 * 一个系统需要动态地在几种算法中选择一种时，可将每个算法封装到策略类中。
 * 多个类只区别在表现行为不同，可以使用策略模式，在运行时动态选择具体要执行的行为。
 * 一个类定义了多种行为，并且这些行为在这个类的操作中以多个条件语句的形式出现，可将每个条件分支移入它们各自的策略类中以代替这些条件语句。
 */

interface Strategy {
    auth(...args: any[]): any;
}

class Authenticator {
    private strategy: Strategy | null
    constructor(){
        this.strategy = null
    }
    setStrategy(strategy: Strategy){
        this.strategy = strategy
    }
    authenticate(...args: any[]){
        if(!this.strategy || !this.strategy.auth) return console.log('未配置处理对象')
        return this.strategy.auth(...args)
    }
}

class WxAuthStrategy implements Strategy {
    auth(token: string){
        return console.log(token === 'xy' ? '登录成功' : '登录失败')
    }
}

class QQAuthStrategy implements Strategy {
    auth(username: string, password: string){
        return console.log(username === 'xy' && password === 'xy' ? '登录成功' : '登录失败')
    }
}

const authenticator = new Authenticator()
authenticator.authenticate()
authenticator.setStrategy(new WxAuthStrategy())
authenticator.authenticate('xy')
authenticator.authenticate('xy','xy')
authenticator.authenticate('xxy','xy')
authenticator.setStrategy(new QQAuthStrategy())
authenticator.authenticate('xy')
authenticator.authenticate('xy','xy')
authenticator.authenticate('xxy','xy')

/**
 * 职责链模式
 * 使多个对象都有机会处理请求，从而避免请求的发送者和接受者之间的耦合关系。
 * 使用场景
 * 可处理一个请求的对象集合应被动态指定。
 * 想在不明确指定接收者的情况下，向多个对象中的一个提交一个请求。
 * 有多个对象可以处理一个请求，哪个对象处理该请求运行时自动确定，客户端只需要把请求提交到链上即可。
 */
console.log('------- 职责链模式 -------')
interface IHandler {
    addMiddleware(h: IHandler):IHandler;
    get(url:string, callback:(data:any) => void): void;
}

abstract class AbstractHandler implements IHandler {
    next!: IHandler;
    addMiddleware(h: IHandler):IHandler{
        this.next = h
        return this.next
    }
    get(url:string, callback:(data:any) => void){
        console.log('this', this)
        if(this.next){
            return this.next.get(url, callback)
        }
    }
}

class AuthMiddleware extends AbstractHandler {
    isAuthenticated: boolean
    constructor(token:string){
        super()
        this.isAuthenticated = token === 'xy'
    }
    get(url:string, callback:(data:any) => void){
        console.log('auth: ', url);
        if(this.isAuthenticated){
            return super.get(url, callback)
        }else{
            throw new Error('验证失败')
        }
    }
}

// 定义Logger中间件
class LoggerMiddleware extends AbstractHandler {
    get(url: string, callback: (data: any) => void) {
        console.log('/GET Request to: ', url);
        return super.get(url, callback);
    }
}

class Route extends AbstractHandler {
    private UrlMap: { [key: string]: any }
    constructor(){
        super()
        this.UrlMap = {
            'todo': ['1', '2', '3'],
            'ran': Math.random()
        }
    }
    get(url: string, callback: (data:any) => void){
        super.get(url, callback)
        if(this.UrlMap[url]){
            callback(this.UrlMap[url])
        }
    }
}

const route = new Route()
route.addMiddleware(new AuthMiddleware('xy')).addMiddleware(new LoggerMiddleware())

route.get('todo', data => console.log(data))
route.get('ran', data => console.log(data))

/**
 * 模板方法模式
 * 由两部分结构组成：抽象父类和具体的实现子类。
 * 通常在抽象父类中封装了子类的算法框架，也包括实现一些公共方法以及封装子类中所有方法的执行顺序。
 * 使用场景
 * 算法的整体步骤很固定，但其中个别部分易变时，这时候可以使用模板方法模式，将容易变的部分抽象出来，供子类实现。
 * 当需要控制子类的扩展时，模板方法只在特定点调用钩子操作，这样就只允许在这些点进行扩展。
 */
console.log('------- 模板方法模式 -------')

abstract class PrintMethod {
    data!: string
    print(data: string){
        this.data = data
        this.parse()
        this.do()
        this.log()
    }
    do(){}
    parse(){
        console.log(`this.data => ${this.data}`)
        this.data += ' parse - by PrintMethod'
    }
    log(){
        console.log(`this.out => ${this.data}`)
    }
}

class PrintMessage extends PrintMethod {
    do(){
        console.log(`do => ${this.data}`)
        this.data += ' do - by PrintMessage'
    }
}

class PrintMsg extends PrintMethod {
    do(){
        console.log(`do => ${this.data}`)
        this.data += ' do - by PrintMsg'
    }
    parse(){
        console.log(`do => ${this.data}`)
        this.data += ' parse - by PrintMsg'
    }
}

const p1 = new PrintMessage()
p1.print('123')

const p2 = new PrintMsg()
p2.print('321')