老后台



新后台
证件过期管理
证件过期历史查询


      [
          {prop:'name',label:'姓名'},
          {prop:'age',label:'年龄'}
        ]





















# vuetest
导入json文件，变为下拉选择，若无则手输入。

公有的

字段名
标题名
栅格数
标题宽
是否禁用
是否必填


table

table 高度 
table 加载
获取当前行。
是否分页
是否斑马线



字段名
laber标题
宽度
是否排序
是否为图片
是否为按钮
是否为标签


关于拖拽BUG
主要是逻辑不清晰，
核心有两个事件一个辅助事件
一个是拖拽时事件
一个是拖拽松手的事件
一个点击的辅助事件

当点击当前元素的时候更改选中状态、保存当前元素
因为你拖动的第一步肯定是点击。
然后移动能拿到当前目标的对象，根据这个对象的id能拿到真实地址也就是目标地址

现在拿到了 开始地址（点击时候的地址）和结束地址（拖动时候的地址）
把这两条值互换就可以了。
有一个bug就是拖动的时候改变了当前选定，你在从左边拖组件的时候
这里说一下 整个组件只用了h5的触发事件，数据操作都是自己存储，组件显示区的组件移动
基本是改地数列位置没有说真增删改查dom了 如果用jq倒是可能这样写

form
vue3可以用switch模板的方式
vue2就只能用if 根据组件名判断传值是哪个决定展示哪个组件，这里用div :is的方式可以完成 但取决于能不能遍历
属性。
组件版不难，其实就是你拖动文件生成json，返回给你json你用到写好的组件里而已。



原版难，因为要动语法树，该怎么把一组json数据 处理成element模板。
或者是一开始就把模板写好，判断到那块拼接那块同时把内容替换好
或者是预留变量位置 替换变量再拼接也可以简单实现
console.log
(`<form>
	 <label> ${name} </label>
</form>`)



替换的方式太low了，主要是不灵活需要人来改，最好的方式还是语法树但不用自己来改编，用vue自带的编译，
操作数据队列 让数据队列映射上去。



table


写一个代理来监听变化。
用官方的效验标注，因为使用的是数据队列是数组，没法映射到表单上
所以在页面创建前要根据这个数据队列遍历创建出一个对象，把这个对象映射到
表单上实现效验，这个映射是单向的，我们修改数据队列的值，数据队列实时映射



`export default {
        name: 'propertyRight',
        props: {
          form: {
            type: Object ,
            default: {
              id: 0,
              icon: '',
              component: '',
              model: '',
              prop: '',
              type: '',
              data: '',
              label: '',
              width: '',
              start: '',
              end: '',
              placeholder: '',
              span: 0,
              max: 0,
              isRead: false,
              isDisabled: false,
              isDefault: false,
              isRequired: false,
              rule: [],
            },
          }
        },`




























简单的table连api也直接生成
查询、重置















> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
