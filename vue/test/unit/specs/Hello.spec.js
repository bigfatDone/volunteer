import Vue from 'vue'
import detail from '@/page/Detail'

describe('Counter.vue', () => {
  it('单元测试数据正确！', () => {
    // 获取组件实例
    const Constructor = Vue.extend(detail)
    // 挂载组件
    const vm = new Constructor().$mount()
    // 断言:count的值应该是数字1
    expect(vm.$el.querySelector('.title').textContent).to.equal('2018年毛主席纪念堂志愿服务项目总结表彰会暨2019年启动仪式召开')
  })
})
