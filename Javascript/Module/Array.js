/* =========================== Array =========================== */
export class myArray {
    constructor( ...value ) {
        this.length = 0
        this.name = "myArray"
        this.mount =  window.mount;  // 是否挂载
        this.value = [ ...value ]
    }
    // 将伪数组 or 其它类型转为数组
    static _from(origin, iteration, context) {
        if( !['string','arguments','map','set','array'].includes(type) ) return [];
        const newArray = [];
        const type = Object.prototype.toString.call( origin ).slice(8, -1).toLowerCase();
        switch(type){
            case 'array':
                console.log('array')
            break;
            default:
                console.log('无')
        }
        return [].map.call(item=>iteration)
    }
    // 判断是否为数组
    static _isArray(v) {
        if ( Object.prototype.toString.call(v).slice(8, -1).toLowerCase() == 'array' ) return true; return false;
    }
    // 返回一个新数组
    static _of (...v) {
        return [...v]
    }
    // 前置方法
    before( v ){
        if (this.isType( v ) != 'function') throw new Error(`this not a function`);
        return this.mount ? this : this.value;
    }

    // 返回方法
    later( arr ) {
        return this.mount ? arr : new myArray( ...arr );
    }

    // 判断类型
    isType( v, p ) {
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
    _filter( callBack ) {
        let value = this.before( callBack );
        const arr = [];
        for ( let i = 0, leng = value.length ; i<leng ; i++ ){
            if(callBack(value[i])){
                arr.push( value[i] );
            }
        }
        return this.later( arr );
    }

    _forEach( callBack ) {
        let value = this.before( callBack );
        for ( let i = 0, leng = value.length ; i<leng ; i++ ){
            callBack(value[i], i);
        }
    }

    _map( callBack ) {
        let value = this.before( callBack );
        const arr = [];
        for ( let i = 0, leng = value.length ; i<leng ; i++ ) {
            if (callBack(value[i])) {
                arr.push( callBack(value[i], i) );
            }
        }
        return this.later( arr );
    }

    // 一个返回假则返回假
    _every( callBack ) {
        let value = this.before( callBack );
        for ( let i = 0, leng = value.length ; i < leng; i++ ) {
            if (!callBack(value[i])) {
                return false;
            }
        }
        return true;
    }
    _some() { }

    _reduce() {

    }

    // 返回匹配到的第一项item。findIndex是返回匹配到的第一项item的index下标值。所以我放在一起写，return { item:value,index:value }
    _find() {

    }

    // 扁平化处理，flatMap是基于flat对每一项数据进行操作处理。所以这里传参要两个，第一个是扁平级数，第二个是回调函数。
    // 至于为什么会有map估计是考虑了性能吧
    _flat(index, callBack) {

    }

    _includes( value ) {
        return this.value.findIndex(item=>item == value) != -1;
    }

    _at(index = 0) {
        if( index >= 0 ) return this.value[index]; 
        return this.value[ this.value.length + index ];
    }

    _concat() {

    }

    _copyWithin() {

    }
    
    /** 填充数组
    * @param  { any }    任意内容
    * @param  { Number } 开始位置
    * @param  { Number } 结束位置
    * @return { Array }  会修改原数组
    **/ 
    _fill( val, start, end) {
        const value = this.before( ()=>{} );
        start = start || 0;
        end = end || value.length - 1;
        value.forEach((item, key)=>{
            console.log(start,end,key)
            if( key >= start && key <= end ){
                value[key] = val
            }
        })
        return value;
    }
  
    
    _indexOf() {

    }
    _join() {

    }
    
    _lastIndexOf() {

    }

    /* 
    * 删除数组的 [ 最后一个/第一个 ] 元素并返回删除的元素。
    * @param  { any } 任意实参    
    * @return { Number }  返回数组成员数量
    */   
    _pop(){
        const value = this.before( ()=>{} );
        const leng = value.length;
        if( !leng ) return undefined;
        return value.splice(leng - 1, 1)
    }
    _shift() {
        const value = this.before( ()=>{} );
        const leng = value.length;
        if( !leng ) return undefined;
        return value.splice(0, 1)
    }

    /* 
    * 向数组[开头/末尾]添加一个或多个元素，并返回新的长度
    * @param  { any } 任意实参  
    * @return { Number }  该数组长度
    */   
    _unshift( ...value ) {
        const val = this.before( ()=>{} );
        this.value = [ ...value, ...val ]
    }
    _push( ...value ) {
        const val = this.before( ()=>{} );
        this.value = [ ...val, ...value ]
    }
    
    _reduceRight() {

    }
    _reverse() {

    }
   
    _slice() {

    }
   
    _sort() {

    }
    _splice() {

    }
    _toLocaleString() {

    }

    /* 
    * 将数组转为字符串
    * @return { String }  返回字符串化的数组
    */   
    _toString() {
        const value = this.before( ()=>{} );
        return `${ value }`
    }
    _entries() {
        new Error('系统内置迭代器无法实现')
    }
    _keys() {
        new Error('系统内置迭代器无法实现')
    }
    _values() {
        new Error('系统内置迭代器无法实现')
    }
}
