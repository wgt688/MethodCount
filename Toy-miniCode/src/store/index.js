import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  /*
    id:每条数据的唯一ID
    targetElement:目标元素, 用于右边数据栏展示 
    elementQueue:显示用, 数据队列。
  */
    state:{
      id:0,                
      targetElement:null,
      elementQueue:[]
    },

    getters: {
      getTargetElement:({elementQueue,targetElement} = state)=>{
        // 返回目标元素ID。这里直接引用state会导致内存地址一对多关联不太好 所以用个函数返回
        return elementQueue[targetElement];
      }
    },
    
    mutations:{
      // 元素自增ID
      addElement:state=>{
        state.id += 1
        // return state.id
        // 因为避免闭包的使用所以这里返回值被隔断了用不了。
      },

      // 元素自减ID 
      delElement:state=>{
        state.id -= 1
      },

      // 添加元素 这里不能确定targetElement是 解构运算符是深拷贝还是浅拷贝
      addElementQueue({elementQueue,targetElement} = state,item){
        // 

        this.commit('addElement')
        item.id = this.state.id
        targetElement = elementQueue.push(item)
        console.log(elementQueue,'添加成功')
        // 每次添加鉴定是否唯一
        // const ids = elementQueue.map(items=>items.id);
        // if(!ids.includes(item.id)) elementQueue.push(item);
        // console.log(ids,item.id,elementQueue)
      },

      // 删除指定元素
      delElementQueue({elementQueue,targetElement} = state,item = false  /* 默认删除全部 */ ){
        if(!item) return elementQueue = [];
        elementQueue.filter((items,key)=>{
          if(items.id == item.id){
            if(elementQueue.splice(key,1)) targetElement = item.id; // 右侧属性栏值 = 
          }
        })
        console.log(elementQueue,'删除指定')
      },

      // 交换元素位置
      moveElementQueue({elementQueue,targetElement} = state,start,end){
          let temporary = elementQueue[start];
          elementQueue[start] =elementQueue[end];
          elementQueue[end] = temporary;
          console.log(elementQueue,'交换元素位置')
      },

      // 当前目标元素
      targetElement(state){

      }
    }
})
export default store