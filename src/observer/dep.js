/**
 * Dep类
 * 用于储存收集依赖
 * @class Dep
 */
export default class Dep {
  constructor () {
    this.subs = []
  }

  // 添加依赖
  addSub (sub) {
    this.subs.push(sub)
  }

  // 移除依赖
  removeSub (sub) {
    remove(this.subs, sub)
  }

  // 假设依赖是一个函数，保存在 window.target 上
  // 则我们需要将这个依赖添加到 dep 中
  depend () {
    if (window.target) {
      this.addSub(window.target)
    }
  }

  // 通知所有收集的依赖
  notify () {
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

function remove (arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}
