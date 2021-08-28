<template>
  <div class="app-container">
    <!-- 左侧基础组件  开始 -->
    <div class="base">
      <BaseLeft class="base-left" title="基础组件" :queueData="base[0]"></BaseLeft>
      <BaseLeft class="base-left" title="其他组件" :queueData="base[1]"></BaseLeft>
      <BaseLeft class="base-left" title="上传组件" :queueData="base[2]"></BaseLeft>
    </div>
    <!-- 左侧基础组件  结束 -->

    <!-- 组件效果展示  开始 -->
    <ShowCentre class="show-centre" :Update="UpdatePropertyRightData"></ShowCentre>
    <!-- 组件效果展示  结束 -->

    <!-- 右侧组件属性  开始 -->
    <PropertyRight class="property-right" :form="propertyRightData"></PropertyRight>
    <!-- 右侧组件属性  开始 -->
  </div>
</template>

<script>
  import ShowCentre from "./components/showCentre";
  import BaseLeft from "./components/BaseLeft";
  import PropertyRight from "./components/PropertyRight";
  import {
    ComponentDictionary
  } from "@/utils/base.js";
  export default {
    name: "index",
    components: {
      ShowCentre,
      BaseLeft,
      PropertyRight
    },
    data() {
      return {
        propertyRightData: {
          component: ""
        },
        base: ComponentDictionary()
      };
    },
    methods: {
      UpdatePropertyRightData(obj) {
        this.propertyRightData = obj;
      }
    }
  };

</script>

<style scoped>
  /* BASE
---------------------------------------------------------------- */
  @import url("../../styles/base.css");

  .app-container {
    display: flex;
    justify-content: space-around;
    padding: 10px;
  }

  .base {
    overflow: auto;
    height: calc(100vh - 30px);
  }

  .base-left {
    display: flex;
    flex-direction: column;
    width: 15.5vw;
    padding: 10px;
    border-radius: 5px;
    background: #fff;
  }

  .show-centre {
    width: 59vw;
    border-radius: 5px;
    background: #fff;
  }

  .property-right {
    width: 20vw;
    border-radius: 5px;
    background: #fff;
  }

</style>
