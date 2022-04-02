/* =========================== Array =========================== */
export class myArray {
    constructor( ...value ) {
        this.length = 0
        this.name = "myArray"
        this.mount =  window.mount;
        this.value = [ ...value ]
    }
    static _from() {
        
    }
    static _isArray() {

    }
    static _of () {

    }
    // 前置方法
    before( v ){
        if (this.isType( v ) != 'function') throw new Error(`this not a function`);
        return this.mount ? this : this.value;
    }

    // 返回方法
    later( arr ){
        return this.mount ? arr : new myArray( arr );
    }

    // 判断类型
    isType( v, p ){
    /** 检测数据类型
    * @param  {any} v
    * @param  {Object} p
    * @return {anyType | true} 一个形参检测数据类型，两个形参判断anyType的原型是否属于true
    **/
        v = v || false;
        p = p || false;
        if (!v) return;
        return p ? v instanceof p : Object.prototype.toString.call(v).slice(8, -1).toLowerCase();        
    }

    // 查找
    _filter() {

    }

    _forEach( callBack ){
        let value = this.before( callBack );
        for ( let i = 0, leng = value.length ; i<leng ; i++ ){
            callBack(value[i], i);
        }
    }
    _map( callBack ) {
        let value = this.before( callBack );
        const arr = [];
        for ( let i = 0, leng = value.length ; i<leng ; i++ ){
            if(callBack(value[i])){
                arr.push( callBack(value[i], i) );
            }
        }
        return this.later( arr );
    }
    _includes() {

    }
    _at() {

    }
    _concat() {

    }
    _copyWithin() {

    }
   
    _every() {

    }
    _fill() {

    }
    _reduce() {

    }
    // 返回匹配到的第一项item。findIndex是返回匹配到的第一项item的index下标值。所以我放在一起写，return { item:value,index:value }
    _find() {

    }
    // 扁平化处理，flatMap是基于flat对每一项数据进行操作处理。所以这里传参要两个，第一个是扁平级数，第二个是回调函数。
    // 至于为什么会有map估计是考虑了性能吧
    _flat(index, callBack) {

    }
    
    _indexOf() {

    }
    _join() {

    }
    
    _lastIndexOf() {

    }
    _pop() {

    }
    _push() {

    }
    
    _reduceRight() {

    }
    _reverse() {

    }
    _shift() {

    }
    _slice() {

    }
    _some() {

    }
    _sort() {

    }
    _splice() {

    }
    _toLocaleString() {

    }
    _toString() {

    }
    _unshift() {

    }

    _entries() {

    }
    _keys() {
        new Error('系统内置迭代器无法实现')
    }
    _values() {
        new Error('系统内置迭代器无法实现')
    }
}
