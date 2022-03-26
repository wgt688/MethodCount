/* =========================== Array =========================== */
export class myArray {
    constructor( ...value ) {
        this.length = 0
        this.name = "myArray"
        this.value = [ ...value ]
        console.log(this.value)
    }
    static from() {
        
    }
    static isArray() {

    }
    static of () {

    }
    at() {

    }
    concat() {

    }
    copyWithin() {

    }
    entries() {

    }
    every() {

    }
    fill() {

    }
    filter() {

    }
    find() {

    }
    findIndex() {

    }
    flat() {

    }
    flatMap() {

    }
    forEach(callBack){
        // if (isType(callBack) != 'function') throw new Error(`${callback} is not a function`);
        for( let i = 0,leng = this.value.leng ; i<leng ; i++ ){
            if(callBack(this[i])){
                callBack(this[i], i);
            }
        }
    }
    includes() {

    }
    indexOf() {

    }
    join() {

    }
    keys() {

    }
    lastIndexOf() {

    }
    map() {
        return '我是map返回值'
    }
    pop() {

    }
    push() {

    }
    reduce() {

    }
    reduceRight() {

    }
    reverse() {

    }
    shift() {

    }
    slice() {

    }
    some() {

    }
    sort() {

    }
    splice() {

    }
    toLocaleString() {

    }
    toString() {

    }
    unshift() {

    }
    values() {

    }
}
