/* =========================== Array =========================== */
export class myArray {
    constructor( ...value ) {
        this.length = 0;
        this.name = "myArray"
        this.mount =  window.mount;  // 是否要挂载到window基础类上
        this.value = [ ...value ];
        // 挂拟迭代器
        this.__proto__[Symbol.iterator] = () =>{
            let index = 0;
            let that = this;
            return {
                next(){
                    if( index > (that.value.length - 1)){
                        return {
                            done: true,
                            value: undefined
                        }
                    }
                    return {
                        done: false,
                        value: that.value[ index ++ ]
                    }
                }
            }
        }
    }

    /** 将伪数组 or 其它类型转为数组
    * @param  { Array  |  String |  Set | Symbol |  arguments : 伪数组 } origin
    * @param  { Function } iteration
    * @param  { Object } context
    * @return { New Array }
    **/ 
    static _from( origin, iteration, context ) {
        if( !['string','arguments','map','set','array'].includes( origin ) ) return [];
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

    /** 判断是否为数组
    * @param  { any } v
    * @return { Boolean }
    **/ 
    static _isArray(v) {
        if ( Object.prototype.toString.call(v).slice(8, -1).toLowerCase() == 'array' ) return true; return false;
    }

    /** 返回一个新数组
    * @param  { anys } v
    * @return { New Array }
    **/ 
    static _of (...v) { 
        return [...v];
    }

    /** 前置方法
    * @param  { Function } v
    * @return { Array }
    **/ 
    before( v ) {
        if (this.isType( v ) != 'function') throw new Error(`this not a function`);
        return this.mount ? this : this.value;
    }

    /** 返回方法
    * @param  { Array } arr
    * @return { Array }
    **/ 
    later( arr ) {
        return this.mount ? arr : new myArray( ...arr );
    }

    /** 判断类型
    * @param  { any }  
    * @param  { any }  
    * @return { StringType | Boolean }
    **/ 
    isType( v = false, p = false) {
        if (!v) return;
        return p ? v instanceof p : Object.prototype.toString.call(v).slice(8, -1).toLowerCase();        
    }
    
    /** 数组循环遍历
    * @param  { Function } callBack
    **/ 
    _forEach( callBack ) {
        let value = this.before( callBack );
        for ( let i = 0, leng = value.length ; i<leng ; i++ ){
            callBack(value[i], i);
        }
    }

    /** 数组循环遍历
    * @param  { Function } callBack
    * @return { New Array } 返回新数组
    **/ 
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

    /** 查找指定元素
    * @param  { Function } callBack
    * @return { New Array } 返回新数组
    **/ 
    _filter( callBack ) {
        let value = this.before( callBack );
        const arr = [];
        for ( let i = 0, leng = value.length ; i<leng ; i++ ){
            if (callBack(value[i])){
                arr.push( value[i] );
            }
        }
        return this.later( arr );
    }

    /** 一个条件为假则返回false。 some则相反。
    * @param  { Function } callBack
    * @return { Boolean } 
    **/ 
    _every( callBack ) {
        let value = this.before( callBack );
        for ( let i = 0, leng = value.length ; i < leng; i++ ) {
            if (!callBack(value[i])) { // if (callBack(value[i])) {
                return false;               //  return true;
            }                          //}
        }
        return true; // return false;
    }

    _reduce( callBack ) {

    }

    // 返回匹配到的第一项item。findIndex是返回匹配到的第一项item的index下标值。所以我放在一起写，return { item:value,index:value }
    _find( callBack ) { 
        let value = this.before( callBack );
        for ( let i = 0, leng = value.length ; i < leng; i++ ) {
            if (callBack(value[i])) {
                return {
                    item:value[i],
                    index:i
                }
            }
        }
    }

    // 扁平化处理，flatMap是基于flat对每一项数据进行操作处理。所以这里传参要两个，第一个是扁平级数，第二个是回调函数。
    // 至于为什么会有map估计是考虑了性能吧
    _flat(index, callBack) {

    }

    _includes( value ) {
        return this.value.some( item => item == value );
        // return this.value.findIndex(item=>item == value) != -1;
    }

    /** 通过索引返回数组内成员
    * @param  { Number } index
    * @return { any }
    **/ 
    _at( index = 0 ) {
        if( index >= 0 ) return this.value[index]; 
        return this.value[ this.value.length + index ];
    }
    
    /** 生成新数组
    * @param  { any } ...value
    * @return { new Array }
    **/ 
    _concat( ...value ) {
        return [...this.value, ...value]
    }

    _copyWithin() {

    }
    
    /** 填充数组
    * @param  { any }    任意内容
    * @param  { Number } 开始位置
    * @param  { Number } 结束位置
    * @return { Array }  会修改原数组
    **/ 
    _fill( val, start = 0, end ) {
        const value = this.before( ()=>{} );
        end = end || value.length - 1;
        value.forEach(( item, key ) => {
            if( key >= start && key <= end ){
                value[key] = val
            }
        })
        return value;
    }
  

    /**  返回首次 value 在数组array中被找到的 索引值。
    * @param  {Any}    val    需要查找的值。
    * @param  {Number} fromIndex 开始查询的位置。
    * @return {Number}  
    */    
    _indexOf( val, fromIndex = 0 ) {
        let value = this.before( ()=>{} );
        let index = -1;
        value.forEach((item, key) => {
            if(Number( fromIndex ) >= key &&  item == Number(val)) {
                index = key;   
            }
        })
        return index;
    }

    /* 
    * 将 array 中的所有元素转换为由 separator 分隔的字符串。
    * _.join(['a', 'b', 'c'], '~');
    * // => 'a~b~c'
    * @param {String}  separator 分隔元素。
    * @return {String}  
    */   
    _join( separator ) {
        let val, value = this.before( ()=>{} );
        value.forEach((item, key)=>{
            if (key == 0) val = `${item}`;
            if (key != value.length)  val = `${val}${separator}${item}`;
        })
        return val;
    }
    

    _lastIndexOf() {

    }

    /* 
    * 删除数组的 [ 最后一个_pop /第一个 _shift ] 元素并返回删除的元素。
    * @param  { any } 任意实参    
    * @return { Number }  返回数组成员数量
    */   
    _pop(){
        const value = this.before( ()=>{} );
        const leng = value.length;
        if( !leng ) return undefined;
        return value.splice(leng - 1, 1) // return value.splice(0, 1)
    }
  
    /* 
    * 向数组[开头 _unshift / _push 末尾]添加一个或多个元素，并返回新的长度
    * @param  { anys } 任意实参  
    * @return { Number }  该数组长度
    */   
    _push( ...value ) {
        const val = this.before( ()=>{} );
        this.value = [ ...val, ...value ] // this.value = [ ...value, ...val ]
    }
   
    _reduceRight() {

    }

    _reverse() {

    }
   
    _slice() {

    }
    
    _splice() {

    }

    _sort() {

    }
    

    /* 
    * 返回一个迭代器
    * @return { Array Iterator }  
    */   
    _toString() {
        const value = this.before( ()=>{} );
        return `${ value }`;
    }

    /* 
    * 返回一个迭代器
    * @return { Array Iterator }  
    */   
    _entries() {
        let index = 0, value = this.before( ()=>{} );
        return {
            next(){
                if( index > (value.length - 1)){
                    return {
                        done: true,
                        value: undefined
                    }
                }
                return {
                    done: false,
                    value: [ index, value[index] ] 
                }
            }
        }
        new Error('系统内置迭代器无法实现')
    }

    /* 
    * 返回一个迭代器
    * @return { Array Iterator }  
    */   
    _keys() {
       return this.__proto__[Symbol.iterator].call(this)
    }

    /* 
    * 返回一个迭代器
    * @return { Array Iterator }  
    */  
    _values() {
        return this.__proto__[Symbol.iterator].call(this)
    }
}
