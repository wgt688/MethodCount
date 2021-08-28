<template>
  <div>
    <div class="property-right_top">
      组件属性
    </div>
    <div class="property-right_container">
      <el-form
        ref="form"
        :model="form"
        style="width:90%;text-align: center"
        label-width="80px"
      >
        <el-form-item label="字段名">
          <el-row>
            <el-col :span="18" v-if="!textarea">
              <el-input v-model="form.prop"></el-input>
            </el-col>
            <el-col :span="18" v-else>
              <el-select
                v-model="form.prop"
                @change="SaveSelect"
                filterable
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in textareaVal"
                  :label="item.prop"
                  :value="item.prop"
                >
                  <span style="float: left">{{ item.prop }}</span>
                  <span style="float: right">{{ item.label }}</span>
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="6">
              <el-button type="text" title="JSON文件" @click="fieldName = true"
                >上传</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="标题名">
          <el-input v-model="form.label"></el-input>
        </el-form-item>
        <el-form-item label="占位提示">
          <el-input v-model="form.placeholder"></el-input>
        </el-form-item>
        <el-form-item label="组件栅格">
          <el-slider
            v-model="form.span"
            :step="1"
            :max="24"
            :min="1"
            show-stops
          ></el-slider>
        </el-form-item>
        <el-form-item label="标题宽度">
          <el-input v-model="form.width"></el-input>
        </el-form-item>
        <el-form-item label="绑定值">
          <div v-if="!textarea">
            <el-input v-model="form.model"></el-input>
          </div>
          <div v-else>
            <el-select
              v-model="form.model"
              @change="SaveSelect"
              filterable
              clearable
              placeholder="请选择"
              style="width: 100%;"
            >
              <el-option
                v-for="item in textareaVal"
                :label="item.prop"
                :value="item.prop"
              >
                <span style="float: left">{{ item.prop }}</span>
                <span style="float: right">{{ item.label }}</span>
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="前缀"   v-if="form.hasOwnProperty('start')">
          <el-input v-model="form.start"></el-input>
        </el-form-item>
        <el-form-item label="后缀"   v-if="form.hasOwnProperty('end')">
          <el-input v-model="form.end"></el-input>
        </el-form-item>
        <el-form-item label="前图标" v-if="form.hasOwnProperty('prefixIcon')" >
          <el-input v-model="form.prefixIcon">
            <template slot="append">
              <i class="el-icon-thumb"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="后图标" v-if="form.hasOwnProperty('suffixIcon')">
          <el-input v-model="form.suffixIcon">
            <template slot="append">
              <i class="el-icon-thumb"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="最多输入" v-if="form.hasOwnProperty('max')">
          <el-input v-model="form.max">
            <template slot="append">个字符</template>
          </el-input>
        </el-form-item>
        <el-form-item style="text-align: left;" label="可清空" v-if="form.hasOwnProperty('isClearable')">
          <el-switch
            v-model="form.isClearable"
            active-color="#13ce66"
            inactive-color="#ddd"
          >
          </el-switch>
        </el-form-item>
        <el-form-item style="text-align: left;" label="密码框" v-if="form.hasOwnProperty('isShowPass')">
          <el-switch
            v-model="form.isShowPass"
            active-color="#13ce66"
            inactive-color="#ddd"
          >
          </el-switch>
        </el-form-item>
        <el-form-item style="text-align: left;" label="是否只读">
          <el-switch
            v-model="form.isRead"
            active-color="#13ce66"
            inactive-color="#ddd"
            active-text=""
            inactive-text=""
          >
          </el-switch>
        </el-form-item>
        <el-form-item style="text-align: left;" label="是否禁用">
          <el-switch
            v-model="form.isDisabled"
            active-color="#13ce66"
            inactive-color="#ddd"
          >
          </el-switch>
        </el-form-item>
        <el-form-item style="text-align: left;" label="是否必填">
          <el-switch
            v-model="form.isRequired"
            active-color="#13ce66"
            inactive-color="#ddd"
          >
          </el-switch>
        </el-form-item>

        <el-form-item label="是否必填">
          <el-button size="mini">选择常用效验</el-button>
          <el-button size="mini">自定义规则</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 组件属性 开始 -->
    <el-dialog
      title="请输入JSON格式代码"
      :visible.sync="fieldName"
      width="25%"
      :close-on-click-modal="false"
    >
      <el-input
        type="textarea"
        placeholder="
        [
          {prop:'name',label:'姓名'},
          {prop:'age',label:'年龄'},
          ...
        ]"
        v-model="textarea"
        rows="10"
      >
      </el-input>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="SaveCode">保存</el-button>
      </span>
    </el-dialog>
    <!-- 组件属性 结束 -->
  </div>
</template>

<script>
import * as base from "../../../../utils/base";
export default {
  name: "propertyRight",
  props: {
    form: {
      type: Object,
      default: {
        id: 0,
        icon: "",
        component: "1",
        model: "",
        prop: "",
        type: "",
        data: "",
        label: "",
        width: "",
        start: "",
        end: "",
        placeholder: "",
        span: 0,
        max: 0,
        isClearable: false,
        isShowPass: false,
        isRead: false,
        isDisabled: false,
        isDefault: false,
        isRequired: false,
        rule: []
      }
    }
  },
  data() {
    return {
      activeName: "",
      fieldName: false,
      textarea: "",
      textareaVal: ""
    };
  },
  computed: {
    // 前后缀
    PrefixSuffix() {
      return (
        base.PrefixSuffix().includes(this.form.component) && !this.form.type
      );
    },
    // 前后图标
    Icon() {
      return base.Icon().includes(this.form.component) && !this.form.type;
    },
    // 最多输入
    Maxlength() {
      return base.Maxlength().includes(this.form.component);
    },
    // 是否可清空
    Clearable() {
      return base.Clearable().includes(this.form.component) && !this.form.type;
    },
    // 是否为密码框
    ShowPass() {
      return base.ShowPass().includes(this.form.component) && !this.form.type;
    }
  },
  methods: {
    SaveCode() {
      this.textareaVal = eval("(" + this.textarea + ")").length
        ? eval("(" + this.textarea + ")")
        : [];
      this.fieldName = false;
      this.$message({
        showClose: true,
        message: "May God bless you",
        type: "success"
      });
    },
    SaveSelect(e) {
      this.form.prop = e.target.value;
      this.$forceUpdate();
    }
  }
};
</script>

<style scoped>
/* Right
---------------------------------------------------------------- */
.property-right_top {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  font-size: 15px;
  border-bottom: 1px solid#dcdfe6;
  color: #808080;
}

.property-right_item--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 24px 0;
}

.property-right_container {
  height: 90vh;
  padding-top: 30px;
  overflow-y: auto;
}

/* 贯穿
---------------------------------------------------------------- */
.is-stretch {
  height: 50px;
}

.el-slider__button {
  width: 10px;
  height: 10px;
}
</style>
