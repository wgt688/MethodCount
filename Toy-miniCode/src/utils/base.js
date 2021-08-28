/**
 * @file    base.js
 * @brief   基础方法
 * @author  王从杰
 * @version 1.0
 * @date    2021-6-28
 *
 * # update （更新日志）
 * 超级无敌巨牛逼的玩具轮子 Mini Code 数据队列！
 */

/**
 * 组件字典码
 * @param  { Number } val [ 1为混合数组 | 2为拆分数组 ]
 * @return { Array } 
 * id         | 唯一id
 * icon       | 图标样式
 * title      | 组件标题
 * component  | 组件名称
 * type       | 组件类型(比如 按钮有普通按钮和文字按钮)
 * model      | 绑定数据
 * prop       | 字段名
 * data       | 数据源 eg：select下拉框需要一个data数据
 * label      | 标题
 * width      | label宽度
 * start      | input前缀
 * end        | input后缀
 * max        | 最多可填多少
 * placeholder| input内提醒文字
 * span       | 栅格宽度
 * clearable  | 是否可清空
 * showPass   | 是否为密码框
 * default    | 搜索框独有的属性，[true:输入框 | false:下拉框]
 * isRead     | 是否只读
 * isDisabled | 是否禁用
 * isRequired | 是否必填
 * rule       | 验证规则
 */
export const ComponentDictionary = (val = 2) => {
  const codeOne = [{
      // 常用
      component: 'el-input',
      componentID: 1,
      model: 'userName',
      prop: 'userName',
      type: 0,
      width: '200',
      label: '标题名',
      placeholder: '默认占位符',
      span: 24,
      isDisabled: false,
      rule: [],


      // 不常用
      prefixIcon: 'el-icon-eleme', // 输入框头部图标
      suffixIcon: 'el-icon-eleme', // 输入框尾部图标
      start: '',
      end: '',
      maxlength: 0,
      minlength: 0,
      isClearable: false,
      isShowPass: false,
      isRead: true,
      isRequired: false,
      id: 1,
      icon: 'icon-danhangshuru',
      title: '单行输入',
    },
    {
      // 常用
      component: 'el-input',
      componentID: 2,
      model: 'text',
      prop: 'text',
      label: '标题名',
      width: '200',
      isDisabled: false,
      span: 24,
      rule: [],
      placeholder: '我是默认',

      // 不常用
      type: 1,
      rows: 2,
      maxlength: 10,
      minlength: 0,
      isRead: true,
      isRequired: false,
      id: 2,
      icon: 'icon-duohangshuru',
      title: '多行输入',
    },
    {
      id: 3,
      icon: 'icon-fuhao-shuzishurukuang',
      title: '数字输入',
      component: 'el-input-number',
      componentID: 3,
      model: 1,
      prop: '',
      type: 'textarea',
      data: '',
      label: '',
      placeholder: '我是默认',
      span: 24
    },
    {
      id: 4,
      icon: 'icon-kaiguan',
      title: '开关',
      component: 'el-switch',
      span: 24
    }, {
      id: 5,
      icon: 'icon-danxuankuangzu',
      title: '单选框组',
      component: 'el-radio',
      span: 24
    }, {
      id: 6,
      icon: 'icon-icon_duoxuankuangzu',
      title: '多选框组',
      component: 'el-checkbox',
      span: 24
    }, {
      id: 7,
      icon: 'icon-xialaxuanzekuang',
      title: '下拉选择',
      component: 'el-select',
      span: 24
    }, {
      id: 8,
      icon: 'icon-jilianxuanze',
      title: '级联选择',
      component: null,
      span: 24
    }, {
      id: 9,
      icon: 'icon-icon_time',
      title: '时间选择',
      component: 'el-time-select',
      span: 24
    }, {
      id: 10,
      icon: 'icon-riqixuanze',
      title: '日期选择',
      component: 'el-date-picker',
      span: 24
    }, {
      id: 11,
      icon: 'icon-21upload',
      title: '文件上传',
      component: 'el-upload',
      class: "upload-demo",
      action: "https://jsonplaceholder.typicode.com/posts/",
      span: 24
    }, {
      id: 12,
      icon: 'icon-tupianshangchuan',
      title: '图片上传',
      component: 'el-upload',
      class: "avatar-uploader",
      action: "https://jsonplaceholder.typicode.com/posts/",
      span: 24
    }, {
      id: 13,
      icon: 'icon-colorSelector',
      title: '颜色选择',
      component: 'el-color-picker',
      span: 24
    }, {
      id: 14,
      icon: 'icon-pingfendengjiRating7',
      title: '评分',
      component: 'el-rate',
      span: 24
    }, {
      id: 15,
      icon: 'icon-huakuai',
      title: '滑块',
      component: 'el-slider',
      span: 24
    },
    // {
    //   id: 16,
    //   icon: 'icon-fengexian',
    //   title: '分割线',
    //   component: 'el-divider',
    //   span: 24
    // },
    // {
    //   id: 17,
    //   icon: 'icon-wenbenbianji',
    //   title: '文本',
    //   component: null,
    //   span: 24
    // }, 
    {
      id: 18,
      icon: 'icon-wenbenyu',
      title: '富文本',
      component: null,
      span: 24
    }
  ];
  const codeTwo = [{
      id: 22,
      icon: 'icon-table',
      title: 'table页',
      component: '',
      span: 24
    }, {
      id: 20,
      icon: 'icon-B-shengshiqu',
      title: '省市区联动',
      component: '',
      span: 24
    }, {
      id: 30,
      icon: 'icon-lunbotuguanli',
      title: '轮播图',
      component: '',
      span: 24
    },
    {
      id: 26,
      icon: 'icon-fenyeqi',
      title: '分页',
      component: '',
      span: 24
    }, {
      id: 19,
      icon: 'icon-anniu',
      title: '按钮',
      component: 'el-button',
      span: 24
    }, {
      id: 21,
      icon: 'icon-chuansuokuang',
      title: '穿梭框',
      component: '',
      span: 24
    },
    // {
    //   id: 23,
    //   icon: 'icon-biaoqian',
    //   title: '标签',
    //   component: '',
    //   span: 24
    // }, {
    //   id: 24,
    //   icon: 'icon-fsux_tubiao_jindutiaotu',
    //   title: '进度条',
    //   component: '',
    //   span: 24
    // }, 
    {
      id: 25,
      icon: 'icon-shuxingkongjian',
      title: '树形控件',
      component: '',
      span: 24
    },
    // {
    //   id: 27,
    //   icon: 'icon-xiaoxi',
    //   title: '标记',
    //   component: '',
    //   span: 24
    // },
    {
      id: 28,
      icon: 'icon-buzhoutiao',
      title: '步骤条',
      component: '',
      span: 24
    }, {
      id: 29,
      icon: 'icon-linmo-kapian',
      title: '卡片',
      component: '',
      span: 24
    }, {
      id: 31,
      icon: 'icon-zhediemianban',
      title: '折叠面板',
      component: '',
      span: 24
    }
  ];
  return val == 2 ? [codeOne, codeTwo] : [...codeOne, ...codeTwo];
}

/* ===========================  input单/多行输入  =========================== */
// 这里判断就靠obj的属性来判断即可 除了公共的全部
/**
 * ICON
 * @return { Array } 
 */
export const Icon = () => {
  return [
    'el-input'
  ]
}

/**
 * 前缀后缀
 * @return { Array } 
 */
export const PrefixSuffix = () => {
  return [
    'el-input'
  ]
}


/**
 * 可清空
 * @return { Array } 
 */
export const Clearable = () => {
  return [
    'el-input'
  ]
}

/**
 * 最多输入
 * @return { Array } 
 */
export const Maxlength = () => {
  return [
    'el-input'
  ]
}
/**
 * 最多输入
 * @return { Array } 
 */
export const ShowPass = () => {
  return [
    'el-input'
  ]
}

export const Dictionary = {
  1: 'el-input', // 单行输入
  2: 'el-input', // 多行输入
  3: 'el-input-number', //数字输入
}


/* ===========================  input单行输入  =========================== */
