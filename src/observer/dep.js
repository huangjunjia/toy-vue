// dep uid
let uid = 0

/**
 * Dep类
 * 用于储存收集依赖
 * @class Dep
 */
export default class Dep {
  static target = null

  constructor () {
    this.id = uid++
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
    // Dep.target 在触发 pushTarget 之后保存了 watcher
    if (Dep.target) {
      // 调用 watcher 的 addDep 方法收集 watcher
      Dep.target.addDep(this)
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

// 保存当前watcher
Dep.target = null
// 因为可能会按顺序递归整个引用数据类型
// 需要一个栈按顺序存取watcher
const targetTask = []

export function pushTarget (target) {
  // targetTask.push(target)
  Dep.target = target
}

export function popTarget () {
  // targetTask.pop()
  Dep.target = targetTask[targetTask.length - 1]
}
