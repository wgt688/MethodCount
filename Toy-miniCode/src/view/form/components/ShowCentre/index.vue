<template>
  <!-- 效果展示区  开始 -->
  <div>

    <!-- top按钮 [预览 | 清除]  开始 -->
    <div class="show-centre_top">
      <el-button type="text" class="show-centre_buttom--upload"  @click="uploadShow = true">上传JSON</el-button>
      <el-button type="text" class="show-centre_buttom--preview" @click="preview = true">预览</el-button>
      <el-button type="text" class="show-centre_buttom--empty"   @click="Clear">清空</el-button>
    </div>
    <!-- top按钮 [预览 | 清除]  结束 -->

    <!-- 内容展示 开始 -->
    <div class="show-centre_container" @click="UpdateRowStyle" @dragover="Dragover" @drop="Drop">
      <!-- row 开始 -->
      <el-row style=" margin:0;width:100%" :gutter="24">
        <el-col 
          v-for="(item,key) in element" 
          :class="{'show-centre_item':key!=checkout,'show-centre_item--active':key==checkout}"
          :span="item.span" 
          :data-id="key" 
          draggable="true">
            <!-- 由于遍历元素无法绑定事件所以要在这里挂一个百分百长度用来挂移动事件 -->

          <!-- <div 
          style = "position: absolute;width: 100%;height: 100%;" 
          @mouseover ="mouseover = key" 
          @mouseout ="mouseover = 999">
          </div> -->
          <div class="show-centre_item--mouseover" 
           @mouseover ="mouseover = key" 
           @mouseout ="mouseover = 999">
            <span 
              v-if="key == checkout || key == mouseover"
              class="mouseover_icon mouseover_icon-copy"
              @click="CopyElement(item)"
            >
              <i class="el-icon-document-copy"></i>
            </span>
            <span 
              v-if="key == checkout || key == mouseover"
              class="mouseover_icon mouseover_icon-del"
              @click="DelElement(item)"
            >
              <i class="el-icon-delete"></i>
            </span>
          </div>
          {{item.title +'-' +item.id}}
        </el-col>
      </el-row>
      <!-- row 结束 -->
    </div>
    <!-- 内容展示 结束 -->


    <!-- 上传JSON 开始 -->
    <el-dialog title="请输入JSON格式代码" :visible.sync="uploadShow" width="25%" :close-on-click-modal="false">
      <el-input type="textarea" placeholder="请输入内容" v-model="textarea" rows="10"></el-input>
      <span slot="footer" class="dialog-footer">
        <span style="float: left;color: #8c8c8c;">PS:ID会被组件重新赋值，所以写不写都可以。</span>
        <el-button type="primary" @click="SaveCode">保存</el-button>
      </span>
    </el-dialog>
    <!-- 上传JSON 结束 -->


    <!-- 预览 开始 -->
    <el-dialog :visible.sync="preview" width="90%" top="5vh">
      <div class="dialog-container">
        <!-- 组件预览 开始 -->
        <el-card shadow="hover" class="dialog-container_item">
          <span style="display: block;height: 3vh;">组件效果预览</span>
          <div style="overflow-y: auto;height: 65vh;">
            <el-form ref="form" :model="form" label-width="80px">
              <el-row style="border:1px solid">

                <el-col :span="10">
                  <el-form-item label="活动名称" label-width="80px">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="14">
                  <el-form-item label="活动名称" label-width="80px">
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="txt" clearable>
                    </el-input>
                  </el-form-item>
                </el-col>

                <!-- input输入框 - 标题名 开始 -->
                <el-col :span="24">
                  <el-form-item label="标题名" label-width="200px">
                    <el-input placeholder="默认占位符" v-model="txt" :disabled="true" clearable show-password
                      prefix-icon="el-icon-eleme" suffix-icon="el-icon-eleme">
                    </el-input>
                  </el-form-item>
                </el-col>
                <!-- input输入框 - 标题名 结束 -->


                <!-- input输入框 - 标题名 开始 -->
                <el-col :span="24">
                  <el-form-item label="标题名" label-width="200px">
                    <el-input placeholder="我是默认" v-model="txt" :disabled="true" clearable show-password maxlength="10"
                      minlength="0" show-word-limit type="textarea" :rows="2">
                    </el-input>
                  </el-form-item>
                </el-col>
                <!-- input输入框 - 标题名 结束 -->

                <!-- input输入框 - 标题名 开始 -->
                <el-col :span="24">
                  <el-form-item label="标题名" label-width="200px">
                    <el-input placeholder="默认占位符" v-model="txt" :disabled="false" prefix-icon="el-icon-eleme"
                      suffix-icon="el-icon-eleme">
                      <template slot="prepend">前缀</template>
                      <template slot="append">后缀</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <!-- input输入框 - 标题名 结束 -->

              </el-row>
            </el-form>
          </div>
        </el-card>
        <!-- 组件预览 结束 -->


        <!-- 代码预览 开始 -->
        <el-card shadow="hover" class="dialog-container_item">
          <div style="display: flex;justify-content: space-between;height: 3vh;">
            <el-switch v-model="isDivComponent" active-text="Yes Component" inactive-text="No Component"
              title="NO为默认生成原生的element元素模块，YES即使用组件是生成一个类avue组件和所需的JSON文件">
            </el-switch>
            <div>
              <el-button size="medium" @click="CopyCodeAll">点击复制</el-button>
              <el-button size="medium" @click="$message.warning('下个版本敬请期待')">生成文件</el-button>
            </div>
          </div>
          <p>
            <el-input id="js-copyCode" type="textarea" v-model="copyCode" style="position:absolute;opacity: 0;">
            </el-input>
            <pre v-if="preview"
              style="overflow-y: auto;height: 65vh;text-align: left;font-size: 20px;background: #23241f;" v-highlight><code class="javascript">
                {{htmlTemplate}}
                {{javaScriptTemplate}}
            </code></pre>
          </p>
        </el-card>
        <!-- 代码预览 结束 -->

      </div>

      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>
    <!-- 预览 结束 -->

  </div>
  <!-- 效果展示区  结束 -->
</template>

<script>
  import {
    FormCount
  } from '../../../../utils/templateHTML'
  const {
    log
  } = console;
  window.log = log;
  import {
    ComponentDictionary
  } from "@/utils/base.js"
  export default {
    name: 'ShowCentre',
    props: {
      Update: {
        type: Function
      } // 右侧的属性
    },
    data() {
      return {
        form:{
          // 临时防止报错的对象
        },

        itemIconShow:false,// 显示隐藏每项的复制 and 删除 按钮
        copyCode: '',
        htmlTemplate: `<span>Hell World!</span>`,
        javaScriptTemplate: '',
        ruleForm: [{
            name: 'sex',
            model: 1
          },
          {
            name: 'age',
            model: 11
          }
        ],
        ruleForm1: '',
        rules: {
          sex: [{
            required: true,
            message: '请输入活动名称',
            trigger: 'blur'
          }, ]
        },
        uploadShow: false,
        textarea: '',
        textareaVal: '',
        isDivComponent: false,
        preview: false,
        componentName: ComponentDictionary(1),
        element: [],
        checkout: 999, // 选中样式ID 包含0
        mouseover:999, // 鼠标移动到元素显示
        txt: ''
      }
    },
    watch: {
      element: {
        handler(newVal, oldVal) {
          this.htmlTemplate = FormCount(newVal);
          this.$forceUpdate();
        },
        deep: true //true 深度监听
      },
    },
    created() {
      window.addEventListener('setItem', ()=> {
        // this.newVal = sessionStorage.getItem('watchStorage');
        this.element = JSON.parse(sessionStorage.getItem('start'))
      })

      let linshi = {
        id: 0,
        icon: '1',
        component: '1',
        model: '1',
        prop: '1',
        type: '2',
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
      }

      console.log(Object.keys(linshi))
      // 这里很有必要写一个Proxy监听，因为props是单向的 
      // 由右边属性组件传过来的对象，再次修改这里预览组件要改


      // linshi = [{name:'王刚'},{name:'王大锤'}]
      // console.log(linshi,'===')
      //   this.javaScriptTemplate = `export default {
      //   name: 'propertyRight',
      //   props: {
      //     form: {
      //       type: Object ,
      //       default: {
      //        ${linshi.forEach((item,key)=>{
      //         return `${item}` ;
      //        })}
      //       },
      //     }
      //   },`;

      this.javaScriptTemplate = `form: {
          ${Object.keys(linshi).map((item,key)=>{
            return ` ${key!=0? `\n         `:''}     ${item} : ${linshi[item]}`
          })
          }
          \n                 }`;

      console.log('1111', this.element)


      const a = [{
          id: 1,
          icon: 'icon-danhangshuru',
          title: '单行输入',
          component: 'el-input',
          model: '王钢铁',
          prop: 'userName',
          type: '样式类别',
          data: '样式数据',
          label: '用户姓名',
          width: '200',
          start: '我是input前缀内容',
          end: '我是input后缀内容',
          placeholder: '默认占位符',
          span: 24,
          max: 10,
          default: false,
          isRead: true,
          isDisabled: false,
          isRequired: false,
          rule: [],
        },
        {
          id: 2,
          icon: 'icon-duohangshuru',
          title: '多行输入',
          component: 'el-input',
          model: 'text',
          prop: '',
          type: 'textarea',
          data: '',
          label: '',
          placeholder: '我是默认',
          span: 24,
          rule: []
        }
      ]

      let as = {};
      this.ruleForm.forEach(item => {
        as[item.name] = item.model;
      })

      this.ruleForm1 = as;
      console.log(this.ruleForm1)

    },

    methods: {
      // 点击行变化样式
      UpdateRowStyle(e) {
        // 每次点击元素都会保存elementID用来确定移动开始的元素
        // 保存当前点击元素的样式
        // Update修改右侧属性详情
        window.sessionStorage.elementID = e.target.getAttribute("data-id")
        console.log('点击操作',window.sessionStorage.elementID)
        this.checkout = e.target.getAttribute("data-id") ? e.target.getAttribute("data-id") : this.checkout;
        this.Update(this.element[this.checkout])
      },

      /**
       * 移动时回调
       * @param  { e } 当前鼠标下的目标元素 
       * @return { Array } 
       * 主要逻辑有移动时替换元素且执行动画效果，移动时变色。
       */
      Dragover(e) {
        console.log('移动操作')
        e.preventDefault();
        if (this.getDocumentIndex(e) != 0 && !this.getDocumentIndex(e)) return;

        const data = this.element[e.target.getAttribute("data-id")];
        const startID = window.sessionStorage.elementID
        const endID = this.element.findIndex(item => item.id == data.id)
        // console.log(`开始 - ${startID} | 结束 - ${endID}`)
        //  console.log(startID,endID )
        //  style="transition: all 1s ease 0s;transform: translate(0px, 11vh);"
        const box = this.element[startID];
        this.element[startID] = this.element[endID]
        this.element[endID] = box;
        this.UpdateRowStyle(e);

        if (!this.element.map(item => item.id).includes(this.element[endID])) {
          window.sessionStorage.create = JSON.stringify(this.element[endID])
        }
        this.$forceUpdate();
      },

      // 拖动松手执行
      Drop(e) {
        console.log('松手操作')
        e.preventDefault();
       
       
       
       
       const newElement = JSON.parse(window.sessionStorage.create);
        console.log(newElement)

        // 原来就存在的不会被添加
        if (!this.element.map(item => item.id).includes(newElement.id)) {
          this.element.push(newElement);
        }
        const ID = this.element.findIndex(item => item.id == newElement.id);
        this.checkout = ID;
        this.Update(this.element[this.checkout])
      },

      /* ===================================== Row行操作 - 开始 =======================================  */
      // 复制元素
      CopyElement(v){
        let item = JSON.parse(JSON.stringify(v));
        this.$store.commit('addElement')
        item.id = this.$store.getters.getElement
        this.checkout = this.element.push(item) - 1 
        window.sessionStorage.elementID = this.checkout
      },

      // 删除元素
      DelElement(v){
        this.element.filter((item,key)=>{
          if(v.id===item.id){
            this.element.splice(key,1)
            this.checkout = this.element.length - 1
            window.sessionStorage.elementID = key
          }
        })
      },

      
      // ========== 函数式公共组 ========== //
      /**
       * 获取当前DOM元素在数据内的下标
       * @param  { e } 当前鼠标下的目标元素 
       * @return { Number } 
       * 返回当前鼠标对象在队列的真实位置下标。
       */
        getDocumentIndex(e) {
          return e.target.getAttribute("data-id");
        },

      /**
       * 返回存储的JSON对象
       * @param  { index } session的下标 
       * @return { Object } 
       * 返回当前鼠标对象在队列的真实位置下标。
       */
        getSessionJson(index) {
          return JSON.parse(window.sessionStorage[index])
        },
      /* ===================================== Row行操作 - 结束 ========================================  */


      /* ===================================== top功能按钮组 - 开始 =====================================  */
      // 清除
      Clear() {
        this.element = [];
        this.Update({})
      },

      // 按钮 - 上传JSON => 解析JSON
      SaveCode() {
        this.textareaVal = eval("(" + this.textarea + ")").length ? eval("(" + this.textarea + ")") : [];
        Object.assign(this.element, this.textareaVal)
        this.uploadShow = false;
        this.$message({
          showClose: true,
          message: 'May God bless you',
          type: 'success'
        });
      },

      // 复制
      CopyCodeAll() {
        this.copyCode = `${this.htmlTemplate}
        ${this.javaScriptTemplate}`;
        document.getElementById("js-copyCode").select();
        document.execCommand("Copy");
        this.$message({
          message: '复制成功',
          type: 'success',
          offset: 200
        });
      },

      // 点击生成
      CreateFile() {

      },
      /* ===================================== top功能按钮组 - 结束 =====================================  */   
    }

  }

</script>

<style>
  /* Centre
---------------------------------------------------------------- */
  @import url("../../../../styles/base.css");
  .show-centre_top {
    height: 50px;
    line-height: 50px;
    text-align: right;
    border-bottom: 1px solid #dcdfe6;
  }

  .show-centre_buttom--preview {
    font-size: 15px;
  }

  .show-centre_buttom--empty {
    padding: 0px 20px 0px 10px;
    font-size: 15px;
    color: #f56c6c !important;
  }

  .show-centre_buttom--upload {
    padding: 0px 10px 0px 10px;
    font-size: 15px;
  }

  .show-centre_container {
    overflow: auto;
    height: calc(100vh - 200px);
    padding: 20px;
  }

  .show-centre_item {
    position: relative;
    height: 50px;
    padding: 10px;
    margin: 10px 0px 10px 0px;
    border: 3px dashed #e2e0e0;
  }
  .show-centre_item--mouseover{
    display: flex;
    justify-content: space-between;
    position:absolute;
    top: -15px;
    right: 1vw;
    width: 80px;
  }

  .mouseover_icon{
    padding: 3px 5px 3px 5px;
    border: 2px solid;
    border-radius: 100%;
  }

  .mouseover_icon-del{
    color: #f56c6c;
    border-color: #f56c6c;
    background: #fff;
  }

  .mouseover_icon-copy{
   color: #1890ff;
   border-color: #1890ff;
   background: #fff;
  }

   .mouseover_icon-del--hover{
    color: #fff;
    border-color: #fff;
    background: #f56c6c;
  }

  .mouseover_icon-copy--hover{
   color: #fff;
   border-color: #fff;
   background: #1890ff;
  }

  .show-centre_item--active {
    position: relative;
    height: 50px;
    padding: 10px;
    margin: 10px 0px 10px 0px;
    border: 3px solid#1890ff;
    animation: top 10s;
  }

  .dialog-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .dialog-container_item {
    width: 48%;
    height: 70vh;
    color: #828282
  }

  .el-col {
    /* border: 1px solid; */
  }

</style>
