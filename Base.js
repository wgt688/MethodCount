const biaoqiang = [
    '≧▽≦y',
    '~(￣▽￣)~*',
    '(￣﹏￣)',
    '=￣ω￣=',
    'ˋ( °▽、° ) ',
    ' (‵▽′)',
];
const Javascript = {
    /* ========= Base - API ========= */
    ObjectF() {
        return {
            _new(_class, args) {
                const obj = {};
                obj.__proto__ = _class.prototype;
                const _newClass = _class.call(obj, args);
                return _newClass instanceof Object ? _newClass : obj;
            },
            _call(context, ...args) {
                const ctx = context || window;
                ctx.fn = this;
                const result = eval("ctx.fn(...args)");
                delete ctx.fn;
                return result;
            },
            _apply() {
                log(1)
            },
            _bind() {
                log(1)
            },
            _assign(target, append) {

            },
            _create() {

            },
            _freeze() {

            },
            _keys() {

            }
        };
    },

    /* ========= 高阶函数 ========= */
    ArrayF() {
        return {
            _foreach(callback) {
                if (isType(callback) != 'function') throw new Error(`${callback} is not a function`);
                for (let i = 0, leng = this.length; i < leng; i++) {
                    callback(this[i], i);
                }
                return this;
            },
            _map(callBack) {
                // 省略写法，this谁调用就是谁的。内部开辟新地址数组所以不会影响原来的。
                // if (isType(callback) != 'function') throw new Error(`${callback} is not a function`);
                const arr = [];
                for (let i = 0, leng = this.length; i < leng; i++) {
                    arr.push(callBack(this[i], i));
                }
                return arr;
            },
            _filter(callBack) {
                // 内部开辟新地址
                // if (isType(callback) != 'function') throw new Error(`${callback} is not a function`);
                const arr = [];
                for (let i = 0, leng = this.length; i < leng; i++) {
                    if (callBack(this[i])) {
                        arr.push(this[i]);
                    }
                }
                return arr;
            },
            _sort(callBack) {
                // 排序。number排序、字母排序 a-b = 12345;b-a:54321;待详细;
                // return 'a - b | b - a'; 脑壳蒙了抽象不出来，用个傻方法来先实现了再说
                // 1 > 31 false
                if (isType(callback) != 'function') throw new Error(`${callback} is not a function`);
                for (let i = 0, leng = this.length; i <= leng; i++) {
                    for (let j = 0, leng = i; j <= leng; j++) {
                        // if (this[j] > this[j + 1]) {
                        //  let temp = this[j];
                        //  this[j] = this[j + 1];
                        //  this[j + 1] = temp;
                        // }
                        if (this[j] < this[j + 1]) {
                            let temp = this[j];
                            this[j] = this[j + 1];
                            this[j + 1] = temp;
                        }
                    }
                }
            },

            _some(callBack) {
                // 一个条件为真则返回true
                if (isType(callback) != 'function') throw new Error(`${callback} is not a function`);
                for (let i = 0, leng = this.length; i < leng; i++) {
                    if (callBack(this[i])) {
                        return true;
                    }
                }
                return false;
            },

            _every(callBack) {
                //  一个条件为假则返回false
                // if (isType(callback) != 'function') throw new Error(`${callback} is not a function`);
                for (let i = 0, leng = this.length; i < leng; i++) {
                    if (!callBack(this[i])) {
                        return false;
                    }
                }
                return true;
            },

            _reduce(callBack) {
                // 将数组内成员从左到右执行
                if (isType(callback) != 'function') throw new Error(`${callback} is not a function`);
                let done = false;
                let number = null;
                for (let i = 1, leng = this.length; i < leng; i++) {
                    number = callBack(this[i - 1], this[i]);
                    this[i - 1] = number;
                }
                return (() => {
                    // 利用闭包保存done值实现one效果
                    if (!done) {
                        done = true;
                        return number;
                    }
                })();
            },

            _find(callBack) {
                // 筛选符合条件的第一位
                // if (isType(callback) != 'function') throw new Error(`${callback} is not a function`);
                for (let i = 0, leng = this.length; i < leng; i++) {
                    if (callBack(this[i])) {
                        return this[i];
                    }
                }
            },

            _flat(d = 1) {
                let arr = [...this];
                return d > 0 ? arr.reduce((acc, val) => {
                        return acc.concat(Array.isArray(val) ? val._flat(d - 1) : val)
                    }, []) :
                    arr.slice()
            },
            // _keys() {

            // },
            // _slice() {

            // },
            // _splice() {

            // },
            // _pop() {

            // },
            // _push() {

            // },
            // _includes() {

            // },
            // _concat() {

            // },
            // _copyWithin() {

            // },
            // _constructor() {

            // }
        };
    },



    /* ========= DOM操作 ========= */
    DocumentF() {
        return {
            /* == CLASS操作 ==*/
            _hasClass(className) {
                /** 功能说明：匹配元素是否含有指定class
                 * @param  {Object} el DOM对象
                 * @param  {String} className
                 * @return {Object || null} 匹配到返回正则对象，无则返回null
                 * @return {Boolean}
                 **/
                if (isType(callback) != 'string') throw new Error(`${className} is not a String`);
                return Boolean(
                    this.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"))
                );
            },
            _addClass(className) {
                /** 功能说明：给指定DOM元素添加class
                 * @param  {Object} el 指定的DOM元素
                 * @param  {String} className 添加的class名
                 * @return {Object} Object 返回操作后的el对象
                 **/
                if (isType(callback) != 'string') throw new Error(`${className} is not a String`);
                if (
                    !this._hasClass(className) &&
                    this.className.split(" ").length < 3
                ) {
                    this.className += ` ${className}`;
                }
                return this;
            },
            _delClass(className) {
                /** 功能说明：给指定DOM元素删除class
                 * @param  {Object} el 指定的DOM元素
                 * @param  {String} className 添加的class名
                 * @return {Object} Object 返回操作后的el对象
                 **/
                if (isType(callback) != 'string') throw new Error(`${className} is not a String`);
                if (this._hasClass(className)) {
                    var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
                    this.className = this.className.replace(reg, "");
                }
                return this;
            },

            _toggleClass(className) {
                // 有则删除无则添加
                if (isType(callback) != 'string') throw new Error(`${className} is not a String`);
                if (this._hasClass(className)) {
                    this._delClass(className);
                } else {
                    this._addClass(className);
                }
                return this;
            },
            _siblings() {
                return "获取到el的父节点parentNode拿到childNodes就能获取到了。不需要复杂的一堆。子父兄弟祖先应该都在文档标准里";
            },

            /* == CSS操作 ==*/
            _getStyle(update) {
                /** 功能说明：返回DOM对象的style属性
                 * @param  {Object} update 修改的css属性
                 * @return {Object} 有形参返回修改后的style对象，无形参返回style对象。
                 **/
                if (isType(update) != 'object') throw new Error(`${update} is not a Object`);
                const style = {};
                if (
                    isType(update) == "object" &&
                    window.isNull(update) != false
                ) {
                    Object.assign(this.style, update);
                    return this.style;
                }
                []._foreach.call(this.style, (item, index) => {
                    style[item] = this.style[item];
                });
                return style;
            },
            _getClass() {
                return this.className;
            },
            _getClassStyle(className) {
                // 实现思路:从style标签里面解析遍历 很难因为正则匹配不到
                if (isType(className) != 'string') throw new Error(`${className} is not a String`);
                const name = `.${className}`;
                // document.all[12].localName
                []._foreach.call(document.all, (item, index) => {
                    if (item.localName == "style") {
                        console.log(item.outerText, JSON.stringify(item.outerText));
                        var box = /^b(.*?)d$/; //匹配8和8之间的任意n个字符
                        var strings = JSON.stringify(item.outerText);
                        console.log(box.test(strings));
                        console.log(11111111111, RegExp.$1, 11111111111111); //返回第一个组里内容
                        return;
                        var re = /b(.*)d/g;
                        var str = item.outerText;
                        log(str.replace(re, $1), "????");
                        // log(strMatch.match(matchReg))
                        // console.log(isType(item.outerText))
                    }
                });
            },
            /* == DOM操作 ==*/
            _getElementId(id) {
                if (id && isType(id) != "string") {
                    return this.all;
                }
                const DOMList = [];
                []._foreach.call(this.all, (item, index) => {
                    DOMList.push(item);
                    if (item.id == id) return DOMList;
                });
                // 最初思路：getElement系列api都是递归，浏览器都给扁平化好了省了力 之前全都推翻。
                // https://www.cnblogs.com/yexiaochai/p/3477715.html、https://www.cnblogs.com/moqiutao/p/8534779.html
                // 网上的博客分析每个dom元素都有一个唯一id存到'mysql'里。这里的方法只能说是变着法用递归的方式实现getElement的功能
                //      在网上没找到getByid的实现 设想就是递归
                //   body
                //       div
                //           p
                //               a
                //        div2
                //
            },
            _getElementClass(className) {
                /** 功能说明：返回匹配到的DOM元素
                 * @param  {Object} className 标签名
                 * @return {Array}
                 * 思路：本来想递归来着单浏览器都给扁平化处理放到all里面了真方便。
                 **/
                if (className && isType(className) != "string") {
                    return this.all;
                }
                const DOMList = [];
                []._foreach.call(this.all, (item, index) => {
                    if (item.className.split(" ").includes(className)) {
                        DOMList.push(item);
                    }
                });
                return DOMList;
            },
            _getElementTagName(tagName) {
                /** 功能说明：返回匹配到的DOM元素
                 * @param  {String} tagName 标签名
                 * @return {Array}
                 * 思路：本来想递归来着单浏览器都给扁平化处理放到all里面了真方便。
                 **/
                if (tagName && isType(tagName) != "string") {
                    return this.all;
                }
                const DOMList = [];
                []._foreach.call(this.all, (item, index) => {
                    if (item.localName == tagName) {
                        DOMList.push(item);
                    }
                });
                return DOMList;
            },
            /* == 虚拟DOM代码片段 ==*/
            _createVDom(callBack = () => log("callBack null")) {
                /** 简单封装了一下，最后的结果(虚拟实例)可以直接挂到真实的DOM上。
                 * @param  {Function} callBack
                 * @return {Object} 执行完回调后的虚拟DOM实例
                 * @use https://www.yuque.com/xiaobai-tgqid/luq38g/yh2bun
                 */
                const newDom = document.createDocumentFragment();
                callBack(newDom);
                return newDom;
            },
        };
    },

    /* ========= lodash 模拟 ========= */
    LodashF() {
        /* =========== Array  数组     ============= */
        function Array() {
            return {
                chunk(array, size) {
                    /** 
                     * 将数组（array）拆分成多个 size 长度的区块，并将这些区块组成一个新数组。 
                     * 如果array 无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块。
                     * _.chunk(['a', 'b', 'c', 'd'], 3);
                     * // => [['a', 'b', 'c'], ['d']]
                     * @param  {Array} array    需要处理的数组
                     * @param  {Number} size    每个数组区块的长度
                     * @return {Array}  
                     */
                    array = isType(array) === 'array' ? array : false;
                    size = isType(size) === 'number' ? size : false;
                    if (!array || !size) return [];
                    const arr = [];
                    while (Number(array.length) > 0) {
                        arr.push(array.splice(0, size));
                    }
                    return arr;
                },
                compact(array) {
                    /** 
                     * 过滤Boole false的数据
                     * _.compact([0, 1, false, 2, '', 3]);
                     * // => [1, 2, 3]
                     * @param  {Array} array    待处理的数组
                     * @return {Array}  
                     */
                    if (isType(array) !== 'array') return [];
                    return array._filter(item => Boolean(item))
                },
                concat(array, ...value) {
                    /** 
                     * 创建一个新数组，将array与任何数组 或 值连接在一起。
                     * var array = [1];
                     * var other = _.concat(array, 2, [3], [[4]]);
                     * // => [1, 2, 3, [4]]
                     * @param  {Array} array    被连接的数组。
                     * @param  {Array} value    连接的值。
                     * @return {Array}  
                     */
                    return [...array, ...value].flat(Infinity);
                },
                difference(array, value) {
                    /** 
                     * 将array和value数组内的交集成员排除。
                     * _.difference([3, 2, 1], [4, 2]);
                     * // => [3, 1]
                     * @param  {Array} array    要检查的数组。
                     * @param  {Array} value    排除的值。
                     * @return {Array}  
                     */
                    return array._filter(item => !value.includes(item));
                },
                differenceBy(array, values, comparator) {
                    throw new Error(`undefined`);
                },
                differenceWith(array, values, comparator) {
                    throw new Error(`undefined`);
                },
                drop(array, n = 1) {
                    /** 
                     * 创建一个切片数组，去除array前面的n个元素。（n默认值为1。）
                     * _.drop([1, 2, 3], 2);
                     * // => [3]
                     * @param  {Array} array    要查询的数组。
                     * @param  {Number} n       要去除的元素个数。
                     * @return {Array}  
                     */
                    array.splice(0, n);
                    return array;
                },
                dropRight(array, n = 1) {
                    // 同drop一样,不过是从右到左
                    let leng = Number(array.length);
                    array.splice(leng - n, leng);
                    return array;
                },
                dropWhile(array, callback) {
                    throw new Error(`undefined`);
                },
                fill(array, value, start = 0, end = array.length) {
                    /** 
                     * 将数组内成员替换为指定
                     * _.fill([4, 6, 8, 10], '*', 1, 3);
                     * // => [4, '*', '*', 10]
                     * @param  {Array}  array    要填充改变的数组。
                     * @param  {Any}    value    填充给 array 的值。
                     * @param  {Number} start    开始位置（默认0）。
                     * @param  {Number} end      结束位置（默认array.length）。
                     * @return {Array}  
                     */
                    return array._map((item, index) => {
                        if (index >= start && index < end)
                            return item = value;
                        return item;
                    })
                },
                findIndex(array, predicate, fromIndex) {
                    throw new Error(`undefined`);
                },
                findLastIndex(array, predicate, fromIndex) {
                    throw new Error(`undefined`);
                },
                head(array) {
                    /** 
                     * 获取数组 array 的第一个元素。
                     * @param  {Array}  array    要查询的数组。
                     * @return {Array}  
                     */
                    return JSON.parse(JSON.stringify(array))[0];
                },
                indexOf(array, value, fromIndex = 0) {
                    /** 
                     * 返回首次 value 在数组array中被找到的 索引值。
                     * @param  {Array}  array    要查询的数组。
                     * @param  {Any}    value    需要查找的值。
                     * @param  {Number} fromIndex 开始查询的位置。
                     * @return {Number}  
                     */
                    let index = -1;
                    array._foreach((item, key) => {
                        if (key >= Number(fromIndex) && item == Number(value)) {
                            index = key;
                        }
                    });
                    return index;

                },
                initial(array) {
                    /** 
                     * 获取数组 array 的末位元素。
                     * @param  {Array}  array    要查询的数组。
                     * @return {Array}  
                     */
                    return JSON.parse(JSON.stringify(array))[array.length];
                },
                // intersection(...array) {
                //     const arr = [];
                //     let maxLength = [...array][0];
                //     [...array]._foreach((item, index) => {
                //         maxLength = maxLength.length < item.length ? item : maxLength;
                //     })
                //     maxLength._foreach((item, key) => {
                //         [...array]._foreach((item1, index1) => {
                //             log(item1, item, item1.includes(item))
                //             if (index1 == 0 && item1.includes(item)) {
                //                 arr.push(item);
                //             }
                //             if (index1 > 0 && item1.includes(item) == false) {
                //                 if ([...array][index1 - 1].includes(item)) {
                //                     arr.pop();
                //                 }
                //             }
                //         })
                //     })
                //     return arr;
                // }
                intersection(...array) {
                    return '待'
                    const arr = [];
                    let maxLength = [...array][0];
                    [...array]._foreach((item, index) => {
                        maxLength = maxLength.length < item.length ? item : maxLength;
                    })
                    maxLength._foreach((item, key) => {
                        [...array]._foreach((item1, index1) => {
                            if (index1 == 0 && item1.includes(item)) {
                                arr.push({ val: item, key: 1 });
                            } else {
                                arr.push({ val: item, key: 0 });
                            }
                            if (index1 > 0 && item1.includes(item) && item1 == arr[key].val) {
                                arr[key].key = arr[key].key + 1
                            }
                        })
                    })
                    return arr;
                },
                join(array, separator) {
                    /** 
                     * 将 array 中的所有元素转换为由 separator 分隔的字符串。
                     * _.join(['a', 'b', 'c'], '~');
                     * // => 'a~b~c'
                     * @param  {Array}  array     要转换的数组。
                     * @param {String}  separator 分隔元素。
                     * @return {String}  
                     */
                    let val;
                    array._foreach((item, key) => {
                        if (key == 0) return val = `${item}`;
                        if (key != array.length) return val = `${val}${separator}${item}`
                    })
                    return val;
                },
                nth(array, n) {
                    /** 
                     * 获取array数组的第n个元素。如果n为负数，则返回从数组结尾开始的第n个元素。
                     * _.nth(array, 1);
                     * // => 'b'
                     * @param  {Array}  array     要查询的数组。
                     * @param  {Number}  n        要返回元素的索引值。
                     * @return {String}  
                     */
                    if (n > 0) return array[n];
                    n = array.length - Math.abs(n);
                    return array[n];
                },
                pull(array, ...value) {
                    /** 
                     * 移除数组array中所有和给定值相等的元素，使用SameValueZero 进行全等比较。
                     * _.pull([1, 2, 3, 1, 2, 3], 2, 3);
                     * // => [1, 1]
                     * @param  {Array}  array    要修改的数组。
                     * @param  {Number}  value   要删除的值。
                     * @return {Array}  
                     */
                    return array._filter(item => !value.includes(item));
                },
                pullAll(array, value) {
                    /** 
                     * 移除数组array中所有和给定值相等的元素，使用SameValueZero 进行全等比较。
                     * _.pull([1, 2, 3, 1, 2, 3], 2, 3);
                     * // => [1, 1]
                     * @param  {Array}  array    要修改的数组。
                     * @param  {Array}  value    要移除值的数组。
                     * @return {Array}  
                     */
                    return array._filter(item => !value.includes(item));
                },
                pullAllBy() {
                    throw new Error(`undefined`);
                },
                pullAllWith() {
                    throw new Error(`undefined`);
                },
                pullAt(array, ...index) {
                    /** 
                     * 根据索引 indexes，移除array中对应的元素，并返回被移除元素的数组。
                     * _.pullAt([5, 10, 15, 20], 1, 3);
                     * // => [5, 15]
                     * @param  {Array}  array    要修改的数组。
                     * @param  {Number}  value   要移除元素的索引。
                     * @return {Array}  
                     */
                    const arr = [];
                    index._foreach(item => arr.push(array[item]));
                    return arr;
                },
                remove(array, predicate) {
                    // 同filter一样，但返回被操作的数组。。懒得写了没意义。
                    return array._filter(predicate);
                },
                reverse(array) {
                    /** 
                     * 反转array
                     * reverse([1, 2, 3]);
                     * // => [3, 2, 1]
                     * @param  {Array}  array   要修改的数组。
                     * @return {Array}  
                     */
                    return this.compact(
                        array._map(item => this.nth(array, `-${item}`))
                    );
                },
                slice() {
                    throw new Error(`undefined`);
                },
                sortedUniq(array) {
                    /** 
                     * 这个方法类似_.uniq，除了它会优化排序数组。
                     * _.sortedUniq([1, 1, 2]);
                     * // => [1, 2]
                     * @param  {Array}  array   要检查的数组。
                     * @return {Array}  
                     */
                    return Array.from(new Set(array));
                },
                sortedUniqBy() {
                    throw new Error(`undefined`);
                },
                tail() {
                    throw new Error(`undefined`);
                },
                take() {
                    throw new Error(`undefined`);
                },
                takeRight() {
                    throw new Error(`undefined`);
                },
                takeRightWhile() {
                    throw new Error(`undefined`);
                },
                takeWhile() {
                    throw new Error(`undefined`);
                },
                union(...array) {
                    /** 
                     * 简单就是合并所以数组且去重
                     * _.sortedUniq([1, 1, 2]);
                     * // => [1, 2]
                     * @param  {Array}  array   要检查的数组。
                     * @return {Array}  
                     */
                    let arr = [];
                    array._foreach(item => arr = [...arr, ...item]);
                    return this.sortedUniq(arr);
                },

                uniqBy() {
                    throw new Error(`undefined`);
                },

                uniqWith() {
                    throw new Error(`undefined`);
                },

                unzip(array) {
                    /** 
                     * 将多个数组内的成员按顺序解开
                     * _.unzip([['fred', 30, true], ['barney', 40, false]]);
                     * // => [['fred', 'barney'], [30, 40], [true, false]]
                     * @param  {Array}  array   要检查的数组。
                     * @return {Array}  
                     */
                    let arr = [];
                    array[0]._foreach((item, key) => {
                        let temporary = [];
                        array._foreach((item2, index) => {
                            temporary.push(item2[key])
                            arr[key] = temporary;
                        })
                    })
                    return arr;
                },

                unzipWith() {
                    throw new Error(`undefined`);
                },

                zip(...array) {
                    /** 
                     * 将多个数组内的成员按顺序合并
                     * _.unzip([['fred', 'barney'], [30, 40], [true, false]]);
                     * // => [['fred', 30, true], ['barney', 40, false] ]
                     * @param  {Array}  array   要检查的数组。
                     * @return {Array}  
                     */
                    let arr = [];
                    let maxLength = [...array][0];
                    [...array]._foreach((item, index) => {
                        maxLength = maxLength.length < item.length ? item : maxLength;
                    })
                    maxLength._foreach((item, key) => {
                        let temporary = [];
                        [...array]._foreach((item2, index) => {
                            temporary.push(item2[key])
                            arr[key] = temporary;
                        })
                    });
                    return arr;
                },

                zipObject(props, values) {
                    /** 
                     * 第一个数组中的值作为属性标识符（属性名），第二个数组中的值作为相应的属性值。
                     * _.zipObject(['a', 'b'], [1, 2]);
                     * // => { 'a': 1, 'b': 2 }
                     * @param  {Array}  props   对象键名。
                     * @param  {Array}  values  对象键值。
                     * @return {Object}  
                     */
                    const obj = {};
                    const arr = this.zip(props, values);
                    arr._foreach(item => {
                        obj[item[0]] = item[1];
                    })
                    return obj;
                },

                zipObjectDeep() {
                    throw new Error(`undefined`);
                },

                zipWith() {
                    throw new Error(`undefined`);
                },

                without(array, ...values) {
                    /** 
                     * 剔出array内的values成员
                     * _.without([2, 1, 2, 3], 1, 2);
                     * // => [3]
                     * @param  {Array}  array   要检查的数组。
                     * @param  {Array}  values  要剔除的值。
                     * @return {Array}  
                     */
                    // 同pullAll一样懒得写了
                    return this.pullAll(array, ...values);
                },

                xor(...array) {
                    throw new Error(`undefined`);
                    // let markArray = []; //标记组
                    // [...array]._foreach((item, index) => {
                    //     item._foreach((item2, index2) => {
                    //         if (item2 == [...array])
                    //     })
                    // })

                    // let maxLength = [...array][0];
                    // [...array]._foreach((item, index) => {
                    //     maxLength = maxLength.length < item.length ? item : maxLength;
                    // })

                    // maxLength._foreach(item1 => {
                    //     let mark = 0;
                    //     [...array].forEach(item2 => {
                    //         // log(11111);
                    //         // log(item2, item1, this.indexOf(item2, item1));
                    //         // log(22222);
                    //         if (this.indexOf(item2, item1) >= 0) ++mark;
                    //         if (mark > 1) markArray.push(item1);
                    //     })
                    // })
                    // log(this.union(...array), markArray)
                    // return this.difference(this.union(...array), markArray);
                },
                xorBy() {
                    throw new Error(`undefined`);
                },

                xorWith() {
                    throw new Error(`undefined`);
                },
            }
        }

        /* =========== Object 对象     ============= */
        function Object() {
            return {

            }
        }

        /*  =========== Function 函数  ============= */ // 约20
        function Function() {
            return {
                castArray(...val) {
                    // 将形参转换为数组
                    return [...val]
                },

                clone(value) {
                    /** 
                     * 浅拷贝
                     * @param  {Any}  value   要拷贝的值。
                     * @return {Any}          返回拷贝后的值。 
                     */
                    return value;
                },

                cloneDeep(obj) {
                    /** 深拷贝
                     * @param  {Object | Array} obj
                     * @return {Object | Array} objClone   返回拷贝后的值。 
                     */
                    //判断要进行深拷贝的是数组还是对象，数组进行数组拷贝 对象进行对象拷贝
                    const objClone = Array.isArray(obj) ? [] : {};
                    //进行深拷贝的不能为空，并且是对象或者是
                    if (obj && typeof obj === "object") {
                        for (key in obj) {
                            if (obj.hasOwnProperty(key)) {
                                if (obj[key] && typeof obj[key] === "object") {
                                    objClone[key] = deep(obj[key]);
                                } else {
                                    objClone[key] = obj[key];
                                }
                            }
                        }
                    }
                    return objClone;
                },

                inRange(number, start = 0, end) {
                    // number是否在start和end之间。
                    return Boolean(number >= start && number <= end)
                },
                //         _astrictOne(fn, interval) {
                //             /** throttle 节流
                //              * @param  {Function} fn
                //              * @param  {Number} delay
                //              */
                //             let last = 0;
                //             return function () {
                //                 let context = this;
                //                 let args = arguments;
                //                 let now = +new Date();
                //                 if (now - last >= interval) {
                //                     last = now;
                //                     fn.apply(context, args);
                //                 }
                //             };
                //         },
                //         _astrictTwo(fn, delay) {
                //             /** shake 防抖
                //              * @param  {Function} fn
                //              * @param  {Number} delay
                //              */
                //             let timer = null;
                //             return function () {
                //                 if (timer) clearTimeout(timer);
                //                 timer = setTimeout(fn, delay); // 简化写法
                //             };
                //         },
            }
        }

        /* =========== String 字符串   ============= */
        function String() {
            return {

            }
        }

        /*  ========== Collection 集合 ============= */ // 约30
        function Collection() {
            return {
                forEach(collection, iteratee) {
                    /** 
                     * 调用 iteratee 遍历 collection(集合) 中的每个元素， 
                     * 测了原生的foreach和lodash和自己模拟的 速度分别是0.3s 0.4s 0.5s 所以这个能遍历肯定不是利用的for in和for of。 
                     * 如果迭代函数（iteratee）显式的返回 false ，迭代会提前退出。
                     * 用法同原生一至能操作object
                     * @param  {Array | Objetc} collection    一个用来迭代的集合。
                     * @param  {Function} iteratee            个迭代函数，用来转换key
                     * @return {Object}  
                     */

                    //先用for in 试下速度 结论是平均差一倍速
                    // let arr = [1, 2, 1, 223, 324, 4, 3, , 21, 1, 23, 23, 1, 12];
                    // console.time();
                    // for (let key in arr) {
                    //     console.log(key)
                    // }
                    // console.timeEnd();
                    // default: 1.0419921875 ms、default: 2.81201171875 ms、default: 1.839111328125 ms、default: 2.31689453125 ms


                    // console.time();
                    // _.forEach([1, 2, 1, 223, 324, 4, 3, , 21, 1, 23, 23, 1, 12], item => log(item))
                    // console.timeEnd();
                    // default: 1.14013671875 ms、default: 1.196044921875 ms、default: 1.194091796875 ms、default: 1.2919921875 ms

                    // console.time();
                    // for (let i = 0, leng = arr.length; i <= leng; i++) {
                    //     log(arr[i])
                    // }
                    // console.timeEnd();
                    // default: 0.719970703125 ms、default: 0.8671875 ms、default: 0.65087890625 ms、default: 0.8798828125 ms
                    if (isType(iteratee) !== 'function')
                        throw new Error(`${iteratee} is not a function`);
                    if (isType(collection) === 'object') {
                        return function () {
                            let obj = window.Object.keys(collection);
                            for (let i = 0, leng = obj.length; i <= leng; i++) {
                                iteratee(collection[obj[i]], obj[i]);
                            }
                        }()
                    }
                    for (let i = 0, leng = collection.length; i <= leng; i++) {
                        iteratee(collection[i], i);
                    }
                },


                forEachRight(collection, iteratee) {
                    /** 
                     * 从右到左遍历。简单的很反转一下就好了
                     * @param  {Array | Objetc} collection    一个用来迭代的集合。
                     * @param  {Function} iteratee            个迭代函数，用来转换key
                     * @return {Object}  
                     */
                    let obj = {};
                    window.Object.keys(collection).reverse()._foreach(item => {
                        obj[item] = collection[item]
                    })
                    this.forEach(
                        isType(collection) === 'object' ? obj : this.reverse(collection), iteratee
                    );
                },

                map(collection, iteratee) {
                    /** 
                     * 调用 iteratee 遍历 collection(集合) 中的每个元素， 
                     * iteratee 调用3个参数： (value, index|key, collection)。 
                     * 如果迭代函数（iteratee）显式的返回 false ，迭代会提前退出。
                     * 用法同原生一至能操作object
                     * @param  {Array | Objetc} collection    一个用来迭代的集合。
                     * @param  {Function} iteratee            个迭代函数，用来转换key
                     * @return {Object}  
                     */
                    const arr = [];
                    if (isType(iteratee) !== 'function') throw new Error(`${iteratee} is not a function`);
                    if (isType(collection) === 'object') {
                        return function () {
                            let obj = window.Object.keys(collection);
                            for (let i = 0, leng = obj.length; i <= leng; i++) {
                                if (iteratee(collection[obj[i]], obj[i])) arr.push(collection[obj[i]]);
                            }
                        }()
                    }
                    for (let i = 0, leng = collection.length; i <= leng; i++) {
                        if (iteratee(collection[i], i)) arr.push(collection[i]);
                    }
                    return arr;
                },

                every(collection, predicate) {
                    /** 
                     * 同every类似已经实现的，这里就全部省略...
                     * 调用 predicate 遍历 collection(集合) 中的每个元素， 一旦 predicate（断言函数） 返回假值，迭代就马上停止。
                     * @param  {Array } collection    一个用来迭代的集合。
                     * @param  {Function} predicate   每次迭代调用的函数。
                     * @return {Boolean}  
                     */
                    if (isType(collection) !== 'array') throw new Error(`${collection} is not a array`);
                    return collection._every(predicate);
                },

                findLast(collection, predicate) {
                    // 从左到右 find
                    if (isType(predicate) !== 'function') throw new Error(`${predicate} is not a function`);
                    return this.reverse(collection)._find(predicate);
                },

                flatMap(collection, iteratee) {
                    // 创建一个扁平化（注：同阶数组）的数组，个数组的值来自collection（集合）中的每一个值经过 iteratee（迭代函数） 处理后返回的结果。
                }

            }
        }


        /*  =========== Seq            ===========  */
        function Seq() {
            return {

            }
        }

        return [
            Array,
            Object,
            Function,
            Collection,
            String,
            Seq
        ]
    },

    /* ========= USE ========= */
    intro: [
        "对象原型方法",
        "一些高阶函数",
        "DOM操作之类的",
        "模仿的Lodash库方法",
    ],
    help(param = "") {
        // console.clear();
        param = param.toLowerCase();
        Object.keys(this)
            .splice(0, 4)
            ._foreach((count, index) => {
                if (count == 'LodashF') {
                    if (param == 'lodashf') {
                        log(`${count} : ${this.intro[index]}`);
                        log(`%c
这个库大概三百多个方法，有80%无用的方法这里就不去实现了。
倒不是实现不了或者没有耐心 就是觉得很多没意义。
完整写下来的有数组、函数对象、seq、字符串。
语言、数学、数字、模板引擎、实用函数等模块移除。
集合模块大部分方法在BOM里的高阶函数(ArrayF)处已经实现。
将语言lang模块内的函数[castArray、clone、cloneDeep]合并到函数 && 将实用函数移除加入到函数里。
`, 'color:#ffb50e;font-size:15px')
                    }
                    Javascript['LodashF']().forEach((item, index) => {
                        Object.keys(item())._foreach((item2, index2) => {
                            var data = [item2.toLowerCase(), "all", ""];
                            if (data.includes(param)) {
                                log(`%c     ${Javascript['LodashF']()[index]()[item2]}`, 'color:#fff;font-size:15px');
                            }
                        })
                    })
                } else {
                    var data = [count.toLowerCase(), "all", ""];
                    if (data.includes(param)) log(`${count} : ${this.intro[index]}`);
                    Object.keys(Javascript[count]())._foreach((item, index) => {
                        var data = [item.toLowerCase(), "all", ""];
                        if (data.includes(param)) {
                            log(`%c     ${Javascript[count]()[item]}`, 'color:#fff;font-size:15px');
                        }

                    });
                }
            });

        setTimeout(() => {
            log(biaoqing1, 'color:#ffb50e')
            log(`%c 
                                                                            小小脑袋大大疑惑？`, 'color:#ffb50e')
        })
    },
    install: {
        ObjectF: val =>
            Object.keys(Javascript.ObjectF())._foreach(item => {
                Object.prototype[item] = Javascript["ObjectF"]()[item];
                val ? log(`${item} 挂载完成`) : false;

            }),
        ArrayF: val =>
            Object.keys(Javascript.ArrayF())._foreach(item => {
                Array.prototype[item] = Javascript["ArrayF"]()[item];
                val ? log(`${item} 挂载完成`) : false;
            }),
        DocumentF: val =>
            Object.keys(Javascript.DocumentF())._foreach(item => {
                Node.prototype[item] = Javascript["DocumentF"]()[item];
                val ? log(`${item} 挂载完成`) : false;
            }),
        LodashF: val => {
            window._ = function () {}
            Javascript.LodashF()._foreach(item => {

                val ? log(`%c============== ${item.name} 挂载开始 ==============`, 'color:#67C23A;font-size:15px;font-weight: bold;') : false;

                Object.keys(item())._foreach(item2 => {
                    window._.prototype[item2] = item()[item2];
                    val ? log(`%c${item()[item2].name} 挂载完成`, 'color:#fff;background:#0c0c0c;padding:0px 10px 0px 10px') : false;
                })

                val ? log(`%c============== ${item.name} 挂载结束 ==============`, 'color:#909399 ;font-size:15px;font-weight: bold;') : '';
                val ? log(biaoqiang[Math.ceil(Math.random() * 5)]) : false;
            })
            window._ = new window._;
        },
        ALL: function (val = true) {
            Object.keys(this).splice(0, Object.keys(this).length - 1)._foreach(key => this[key](val));
        }
    },
};

// 杂
(() => {
    const { log, dir } = console;
    window["log"] = log;
    window["dir"] = dir;
    window["isNull"] = (obj = {}) =>
        JSON.stringify(obj) === "{}" ? false : true;
    window["isType"] = (v, p) => {
        /** 检测数据类型
         * @param  {any} v
         * @param  {Object} p
         * @return {anyType | true} 一个形参检测数据类型，两个形参判断anyType的原型是否属于true
         */
        v = v || false;
        p = p || false;
        if (!v) return;
        return p ?
            v instanceof p :
            Object.prototype.toString.call(v).slice(8, -1).toLowerCase();
    };
    window["getHTTP"] = () => {
        if (window.chrome && typeof chrome.loadTimes !== "function") return;
        const loadTimes = window.chrome.loadTimes();
        const spdy = loadTimes.wasFetchedViaSpdy;
        const info = loadTimes.npnNegotiatedProtocol || loadTimes.connectionInfo;
        if (spdy && /^h2/i.test(info)) return console.info("本站点使用了HTTP/2");
        console.info("本站点未使用了HTTP/2");
    };
    [
        "_foreach",
        "_map",
        "_filter",
        "_sort",
        "_some",
        "_every",
        "_reduce",
        "_find",
        "_flat"
    ].forEach((item) => {
        this.Array.prototype[item] = Javascript.ArrayF()[item];
    });

    window["_Promise"] = class {
        constructor(callBack) {
            if (isType(callBack) != "function")
                throw new Error(`${callBack} is not a Function`);
            this._status = {
                PENDING: "PENDING", // 等待中
                FULFILLED: "FULFILLED", // OK
                REJECTED: "REJECTED ", // NO
            };
            this.status = this._status.PENDING;
            this.value = null;
            // 添加成功回调函数队列
            this._FULFILLEDQueues = [];
            // 添加失败回调函数队列
            this._REJECTEDQueues = [];
            try {
                // 这里用Bind的原因是bind返回一个函数,call是直接调用 eg a.b.bind(c)()  https://www.yuque.com/xiaobai-tgqid/luq38g/nrx5nd
                callBack(this._resolve.bind(this), this._reject.bind(this));
            } catch (error) {
                this._reject(error);
            }
        }
        _reject(val) {
            if (this.status !== this._status.PENDING) return;
            const run = () => {
                this.status = this._status.FULFILLED;
                this.value = val;
                let cb;
                while (cb = this._FULFILLEDQueues.shift()) {
                    cb(val)
                }
            }
            run();
            // 也就是说then方法永远走的回调执行，等页面完成执行then
            // setTimeout(() => run(), 0);
        }
        _resolve(val) {
            if (this.status !== this._status.PENDING) return;
            const run = () => {
                this.status = this._status.FULFILLED;
                this.value = val;
                let cb;
                while (cb = this._REJECTEDQueues.shift()) {
                    cb(val)
                }
            }
            run()

            // setTimeout(() => run(), 0);
        }

        /** 原型方法 - then
         * @param  {Function} onFULFILLED as res
         * @param  {Function} onREJECTED  as error
         * @return  {Promise} 
         *           { Function } resolve2 
         *           { Function } reject2 
         */
        then(onFULFILLED, onREJECTED) {

            /*
            当前的then return promise作为下次then
            1.then方法可以链式调用所以返回new Promise保持链式操作。
            2.then的两个回调可以接收任意的数据类型，下面把接收任意数据类型的处理过程
            函数式包装了 声明了两个变量fulfilled、rejected。

            如果onFULFILLED接收到的是基础数据类型则也就是
            Promise.resolve().then(res=>111)
            则把res[111]这个返回结果直接打进reslove2，这样新promise.then返回值就是111了
            同理如果是函数判断是不是promise对象，不是则作为正常的回调执行
            
            */
            const { value, status } = this
            return new _Promise((resolve2, reject2) => {
                /*
                  判断传进来的形参是什么类型，如果 !function 则将其resolve后放入队列，
                  如果 是function则将其加入队列 
                */
                let fulfilled = value => {
                    if (isType(onFULFILLED) !== 'function') {
                        // 不是函数类型则直接将其打进resolve
                        resolve2(value)
                    } else {
                        /* 
                        这里的res也就是传进来的值，如果then传进来的是函数则执行
                        这个res是上个then的回调函数执行结果，如果这个回调函数是promise则直接执行，如果不是则把结果作为
                        形参传入下个新的promise对象。
                        */
                        let res = onFULFILLED(value);
                        if (res instanceof _Promise) {
                            // 如果传进来的是promise对象，则直接把值打进去。
                            res.then(resolve2, reject2)
                        } else {
                            //否则会将返回结果直接作为参数，传入下一个then的回调函数
                            resolve2(res)
                        }
                    }
                }

                let rejected = error => {
                    if (isType(onREJECTED) !== 'function') {
                        reject2(error)
                    } else {
                        let res = onREJECTED(error);
                        if (res instanceof _Promise) {
                            res.then(resolve2, reject2)
                        } else {
                            reject2(res)
                        }
                    }
                }


                switch (status) {
                case this._status.PENDING:
                    this._FULFILLEDQueues.push(fulfilled);
                    this._REJECTEDQueues.push(rejected);
                    break;
                case this._status.FULFILLED:
                    fulfilled(value);
                    break;
                case this._status.REJECTED:
                    rejected(value);
                    break;
                }
                // log(this._FULFILLEDQueues)
            })
        }

        /*
            p.then().catch()
            这里有的讲了如果只看表达式肯定会好奇怎么执行的
            Promise.reject(000).then().catch()。注意哦这个promise内部公用一个状态
            所以下面的代码是行得通的。
            var p = new Promise(function (resolve, reject) {
                reject(new Error('error'));
            });

            var c = p.then(function (value) {
                console.log('will never run into here');
            }).then(undefined, function (value) {
                console.log('catch error');
                console.log(value.message);
            });
        */

        catch (error) {
            return this.then(undefined, error)
        }

        // 因为finally也可以链式调用 所以还是得返回promise。示例 then().finally().finally().
        // 实现原理就是用then方法往队列里打新项
        finally(callback) {
            return this.then(
                res => _Promise.resolve(callback()).then(res => res())
            )
        }

        // reject
        static reject(val) {
            return new _Promise((resolve, reject) => reject(val));
        }

        // resolve
        static resolve(val) {
            return new _Promise((resolve) => resolve(val));
        }

        // all
        static all(promiseArray) {
            // 按照顺序执行数组成员，返回 ['我是第一个promise对象的值','我是第二个人promise对象的值'],遇到错误终止
            if (isType(promiseArray) != "array")
                throw new Error("parameter  must be an array");
            const arr = [];
            return new Promise((resolve, reject) => {
                promiseArray.forEach((item, index) => {
                    item.then(
                        (res) => {
                            arr.push(res);
                            if (index >= promiseArray.length - 1) resolve(arr);
                        },
                        (error) => {
                            reject(error);
                        }
                    );
                });
            });
        }

        static allSettled(promiseArray) {
            // 按照顺序执行数组成员，返回 [0: {status: "fulfilled", value: "我是1000s后"},...]
            if (isType(promiseArray) != "array")
                throw new Error("parameter  must be an array");
            const arr = [];
            return new Promise((resolve, reject) => {
                promiseArray.forEach((item, index) => {
                    item.then(
                        (res) => {
                            arr.push({ status: "fulfilled", value: res });
                        },
                        (error) => {
                            arr.push({ status: "rejected", value: error });
                        }
                    );
                    if (index >= promiseArray.length - 1) resolve(arr);
                });
            });
        }

        static any(promiseArray) {
            // 返回第一个resolve状态的Promise对象 随后终止
            /*
              实际写法也是遍历但是我拒绝实现，对该方法的描述为第一个执行完毕的 但是用setTimeout(fun,0)居然是最先冒头的说明也是按照顺序
              any([setTimeout,resolve]) 虽然是单线程知道原理 但是描述违背了event loop的循环次序 深感厌恶。
            */
        }

        static race(promiseArray) {
            // 返回第一个完成的Promise对象(无论状态如何) 随后终止
            /*
              实际写法也是遍历但是我拒绝，官方都是错的所以我拒绝写这个方法。返回第一个完成的Promise对象违背了event loop
            */
        }

        // https://zhuanlan.zhihu.com/p/58428287?utm_source=wechat_timeline&ivk_sa=1024320u
    };



    // 执行顺序12354;then的回调会被打进队列微执行，
    // log(1)
    // new Promise((a, b) => {
    // log(2)
    // a(6666)
    // log(3)
    // }).then(res => {
    // log(4)
    // })
    // log(5)
    /*
    类似then的实现过程
    // then的实现过程类似
    Object.prototype.then = 'aaa'
    function aa(){
      return {a:1}
    }
    aa.then
    
    // 
    API(形参){
      return Promise((1,0)=>{
        xhrHttp(){
          xhr.形参 = 形参;
          if(status == 200){
            1('ok')
          }
        }
      })
    }
    API(形参).then(res=>log(res))
    */


    window.biaoqing1 = `%c      ▐▒▒░▄
       ▒▒▒▒▒▒▒▒▄
       ▐▒▒▒▒▒▒▒▒▒▒▒▄                                                                         ▄▄▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▄                                                               ▄▄▒▒▒▒▒▒▒▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▄                                                       ▄▒▒▒▒▒▒▒▒▒▒▒▒▒▌
         ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▄                                               ▄▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
          ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒                                        ▄░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░
           ▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▄                                ▄▄▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
             ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▄▄▄▄▄░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
              ▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▀
                ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
                  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
                    ▀▒▒▒░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▀
                       ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒▒▒▒▀
                     ▄▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░
                     ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
                    ▒▒▒▒▒▒▒▒▒▒░▄▄▄  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▄▄▄  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
                   ▒▒▒▒▒▒▒▒▒▒▒ ▀█▀   ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▐██▀   ▒▒▒▒▒▒▒▒▒▒▒▒▒▒░
                  ▒▒▒▒▒▒▒▒▒▒▒▒       ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░       ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
                 ▐▒▒▒▒▒▒▒▒▒▒▒▒▒▄   ▄▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▄   ▄▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
                 ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▀▀▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
                ▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▄▄  ▄▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
                ▒▒░░░░░░░░▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░▒▒▒▒▒▒▒▒
               ▐▒░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░▐▒▒▒▒▒▒
               ▒▒░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▀░░░░▄░░░▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░▐▒▒▒▒▒▒▒
               ▐▒▒░░░░░░░▄░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░▒▒▒▒▒▒▒▒
                ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒░▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░▒▒▒▒▒▒▒▒▒▒▒▒
                ▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒░▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
                 ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▄░▀▒▒▒▒▀░▄▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
                  ▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒         `;




})(Javascript);