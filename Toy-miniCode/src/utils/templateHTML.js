/**
 * 总处理
 * @param  { Object }
 * @return { String } 
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
 * default    | 搜索框独有的属性，[true:输入框 | false:下拉框]
 * isRead     | 是否只读
 * isDisabled | 是否禁用
 * isRequired | 是否必填
 * rule       | 验证规则
 */
export const FormCount = (queue) => {
  let template = '<el-form ref="form" :model="form" label-width="80px">';
  const componentName = Object.keys(Component()).map(item => item); // [input,select,...]

  queue.forEach(element => {
    var isComponent = element.component.split('-')[element.component.split('-').length - 1];
    if (componentName.includes(isComponent)) {
      template = `${ template }
      ${ Component()[isComponent](element) }
      `
    }
  });

  return template = `
      ${ template }
      </el-form>`;
}


function Component() {
  return {
    table() {

    },

    // 单行输入 || 多行输入 
    input({
      label,
      placeholder,
      prop,
      span,
      width,
      model,
      type,
      rows,
      start,
      end,
      maxlength,
      minlength,
      prefixIcon,
      suffixIcon,
      isClearable,
      isShowPass,
      isDisabled,
      isRequired,
    } = v) {

      const clearable = isClearable ? 'clearable' : ''; // 是否清空
      const showPass = isShowPass ? 'show-password' : ''; //是否密码
      const required = isRequired ? `prop="${prop}"` : ''; // 是否开启验证
      const prefixIcons = prefixIcon ? `prefix-icon="${prefixIcon}"` : ''; // 前图标
      const suffixIcons = suffixIcon ? `suffix-icon="${suffixIcon}"` : ''; // 后图标
      const starts = start ? ` <template slot="prepend">${start}</template>` : ''; // 前缀
      const ends = end ? ` <template slot="append"${end}</template>` : ''; // 后缀
      // 文字限制
      const fontLeng = maxlength || minlength ? `
          maxlength="${maxlength}"
          minlength="${minlength}"
          show-word-limit` : '';

      // 文本域
      const textarea = type ? `
          type="textarea"
          :rows="${rows}"` : '';

      return `
      <!-- input输入框 - ${label} 开始 -->
      <el-col :span="${span}">
        <el-form-item label="${label}" label-width="${width}px" ${required}>
          <el-input 
            placeholder="${placeholder}" 
            v-model="${model}" 
            :disabled="${isDisabled}" ${clearable} ${showPass} ${fontLeng} ${textarea} 
            ${prefixIcons} 
            ${suffixIcons}>
            ${starts}${ends}
          </el-input>
        </el-form-item>
      </el-col>
      <!-- input输入框 - ${label} 结束 -->
      `;
    },

    /* ===================== 单选 ===================== */
    radio({
      label,
      span,
      width,
      model,
      data,
      type,
      isDisabled,
    } = v) {

      [{
        isDisabled: false,
        label: '',
        title: ''
      }]

      return `
      <!-- 单选框 - ${label} 开始 -->
      <el-col :span="${span}">
        <el-form-item label="${label}" label-width="${width}px" ${required}>
          <el-radio-group v-model="${model}">
            <el-radio :label="3">备选项</el-radio>
            <el-radio :label="6">备选项</el-radio>
            <el-radio :label="9">备选项</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <!-- 单选框 - ${label} 结束 -->
      `;
    },

    /* ===================== 多选 ===================== */
    checkbox() {

    },

    /* ===================== 计数器 ===================== */
    number() {




    },
    /* ===================== 计数器 ===================== */
    number() {



    },
    /* ===================== 开关 ===================== */
    switch ({
      label,
      prop,
      placeholder,
      span,
      width,
      model,
      isRead,
      isDisabled,
      isRequired,
      qian,
      hou
    } = v) {
      return `<el-switch v-model="${prop}" active-text="${qian}" inactive-text="${hou}">`
    },

    /* ===================== 滑块 ===================== */
    slider({
      label,
      prop,
      placeholder,
      span,
      width,
      model,
      isRead,
      isDisabled,
      isRequired,
      qian,
      hou
    } = v) {
      return `<el-switch v-model="${prop}" active-text="${qian}" inactive-text="${hou}">`
    },


    /* ===================== 文件上传 ===================== */
    upload() {

    },


    /* ===================== 评分 ===================== */
    rate() {

    },

    /* ===================== 时间选择器 ===================== */
    picker() {

    },

    /* ===================== 穿梭框 ===================== */
    transfer() {

    },

    /* ===================== 按钮 ===================== */
    button() {

    },

    /* ===================== 省市区联动 ===================== */


    /* ===================== 日期选择器 ===================== */



    /* ===================== 时间选择器 ===================== */



    /* ===================== 日期时间选择器 ===================== */




    /* ===================== 选择器 ===================== */
    select({
      label,
      prop,
      placeholder,
      span,
      width,
      model,
      isRead,
      isDisabled,
      isRequired,
      qian,
      hou
    } = v) {
      return `<el-switch v-model="${prop}" active-text="${qian}" inactive-text="${hou}">`
    },
  }
}
