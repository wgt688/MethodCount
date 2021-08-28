<template>
  <div>
    <el-form ref="searchForm" :inline="true" :model="searchFormData" :label-width="options.labelWidth || '100px'">
      <el-form-item v-for="item in searchOptions" :key="item.prop" :label="item.label" :prop="item.prop">
        <template v-if="item.component === 'input'">
          <el-input :style="{ width: item.width || '100%' }" v-model="searchFormData[item.prop]"
            :placeholder="item.placeholder || '请输入'" clearable></el-input>
        </template>
        <!-- <template v-if="item.component === 'select'">
          <el-select :style="{ width: item.width || '100%' }" v-model="searchFormData[item.prop]"
            :placeholder="item.placeholder || '请选择'" clearable>
            <el-option v-for="option in item.data" :key="option.value" :label="option.label" :value="option.value">
            </el-option>
          </el-select>
        </template>
        <template v-if="item.component === 'datepicker'">
          <el-date-picker :style="{ width: item.width || '100%' }" v-model="searchFormData[item.prop]"
            :type="item.dateType" :value-format="item.valueFormat || 'timestamp'"
            :placeholder="item.placeholder || '请选择日期'" :clearable="false" range-separator="至"
            :start-placeholder="item.startPlaceholder || '开始时间'" :end-placeholder="item.endPlaceholder || '结束时间'">
          </el-date-picker>
        </template> -->
      <!-- </el-form-item> -->
      <!-- <el-form-item> -->
        <!-- <el-button class="filter-item" type="primary" icon="el-icon-search" @click="queryChange">查询</el-button>
        <el-button v-if="showClearButton" class="filter-item" style="margin-left: 10px" icon="el-icon-refresh-left"
          @click="clearAll">清空</el-button>
      </el-form-item> -->
      <!-- <slot></slot> -->
       </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: 'SearchForm',
    props: {
      searchData: Object,
      searchOptions: Array,
      resetCallback: Function
    },
    data() {
      return {
        searchFormData: this.searchData || {}
      }
    },
    methods: {
      // 搜索查询
      queryChange() {
        this.$emit('onSearch', this.searchFormData)
      },
      // 重置表单
      clearAll() {
        this.searchFormData = {}
        this.$emit('onSearch', this.searchFormData)
        if (this.resetCallback && typeof this.resetCallbac === 'function') {
          this.resetCallback()
        }
      }
    }
  }

</script>
<style scoped>

</style>
