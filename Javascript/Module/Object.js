/* =========================== Object =========================== */
class Object{
    constructor( value ) {
        this.length = 0
        this.name = "myObject"
        this.value = value
    }
    static assign() {

    }
    static create() {

    }
    static defineProperties() {

    }
    static defineProperty() {

    }
    static freeze() {

    }
    static fromEntries() {

    }
    static getOwnPropertyDescriptor() {

    }
    static getOwnPropertyDescriptors() {

    }
    static getOwnPropertyNames() {

    }
    static getOwnPropertySymbols() {

    }
    static getPrototypeOf() {

    }
    static is() {

    }
    static isExtensible() {

    }
    static isFrozen() {

    }
    static isSealed() {

    }
    
    static preventExtensions() {

    }
    static seal() {

    }
    static setPrototypeOf() {

    }
    static entries() {

    }
    static keys() {

    }
    static values() {
        
    }
    
    /** 返回实参的数据类型。
    * @return { string }
    **/ 
    getTargetProperty( v = undefined ) {
        return Object.prototype.toString.call( v ).slice(8, -1).toLowerCase();
    }

    /** 前置方法 - 是否包含
    * @param  { Object }   property1
    * @param  { Array }    property2
    * @param  { Function } callBack
    * @return { error('抛出异常') | next('空操作') }
    **/ 
    before( property1, property2, callBack ) {
        const type = this.getTargetProperty( property1 );
        const expression = property2.includes( type ) || property2.includes('any');
        if( expression ){
            if( callBack( expression ) ) throw new Error( callBack( expression ) );
        }
    }

    hasOwnProperty( property = '' ) {
        this.before(property, ['string'], result => {
            if( result ) return `hhhh`;
        })
        const isExist = []; 
        const handler = this.value;
        handler.__proto__ = {
            [Symbol.iterator] : Array.prototype[Symbol.iterator]
        }
        for (const value of isExist) {
            isExist.push( value )
        }
        return isExist.includes( property )
    }

    // 当前对象是否为另外一个对象的原型
    isPrototypeOf( prototype ) {
        return prototype instanceof this;
    }

    // 该属性是否可枚举
    propertyIsEnumerable( property = '' ) {
        
    }
}
