<template>
  <div>
    <!-- 组件标题  开始 -->
    <div class="base-left_title">{{ title }}</div>
    <!-- 组件标题  结束 -->

    <el-button v-if="title == '上传组件'" style="margin-bottom: 1vh;" @click="$message.warning('下个版本敬请期待')">上传组件</el-button>

    <!-- 组件List  开始 -->
    <div class="base-left_container">
      <span draggable="true" @dragstart="Drag(item)" @dblclick="Clicks(item)" class="base-left_item" v-for="item in queueData"
        :data-id="item.id">
        <i class="icon iconfont" :class="item.icon"></i>{{ item.title }}
      </span>
    </div>
    <!-- 组件List  结束 -->
  </div>
</template>

<script>
  export default {
    name: "BaseLeft",
    data() {
      return {
        id: 0
      };
    },
    props: {
      title: {
        type: String,
        default: "基础组件"
      },
      queueData: {
        type: Array,
        default: ()=>{
          return []
        }
      }
    },
    methods: {
      // 拖拽 Start
      Drag(e) {
        this.resetSetItem('start',JSON.stringify(e));
        return;


        // this.$store.commit('addElement')
        // e.id = this.$store.getters.getElement

        // window.sessionStorage.create = JSON.stringify(e);
         console.log(this.resetSetItem('start',JSON.stringify(e)),e,'???')
        // console.log(`{ id:${e.id},title:${e.title} }`);
      },

      // 双击 Start
      Clicks(e){
        e = JSON.stringify(e)
        console.log(this.resetSetItem('start',e),e,'???')
        window.sessionStorage.create = JSON.stringify(e);
        return;
        // this.$store.commit('addElementQueue',e)
        // this.$store.commit('addElement')
        // e.id = this.$store.getters.getElement
        // this.$store.commit('delElementQueue',e)
      } 
    }
  };

</script>

<style scoped>
  /* LEFT
---------------------------------------------------------------- */
  .base-left_title {
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 30px;
    font-weight: 700;
    text-align: left;
    color: #043254;
  }

  .base-left_container {
    display: flex;
    flex-wrap: wrap;
  }

  .base-left_item {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    width: 7vw;
    height: 36px;
    margin: 5px;
    font-size: 12px;
    cursor: move;
    border-radius: 3px;
    line-height: 36px;
    align-items: center;
    border: 2px solid #f3f9ff;
    color: #043254;
    background: #f3f9ff;
  }

  /* 解决hover抖动的问题 ：https://blog.csdn.net/hst_gogogo/article/details/90812564 */
  .base-left_item:hover {
    border: 2px dashed #1890ff;
  }

  .icon {
    padding: 0px 10px 0px 10px;
    font-size: 20px;
    line-height: 60px;
  }

</style>
