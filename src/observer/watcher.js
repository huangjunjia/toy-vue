import { parsePath } from 'utils'
import { pushTarget, popTarget } from './dep'
import { traverse } from './traverse'

export default class Watcher {
  constructor (vm, expOrFn, cb, options) {
    this.vm = vm

    // 判断options是否存在deep设置
    if (options) {
      this.deep = !!options.deep
    } else {
      this.deep = false
    }

    // watcher订阅dep列表
    this.deps = []
    // 通过 Set 记录 dep id 可以防止重复通知
    this.depsIds = new Set()

    // 判断expOrFn是否为函数
    if (typeof expOrFn === 'function') {
      // 如果是函数则将函数赋值给 getter
      this.getter = expOrFn
    } else {
      // 可以通过getter获取值，可以读取到 data.a.b.c
      this.getter = parsePath(expOrFn)
    }

    this.cb = cb
    this.value = this.get()
  }

  // 取值
  get () {
    // 将当前 watcher 保存在 window.target
    // window.target = this
    pushTarget(this)
    // 执行 getter 获取解析的路径的值
    const value = this.getter.call(this.vm, this.vm)

    // 深度递归每一个子属性收集子属性的watcher
    if (this.deep) {
      traverse(value)
    }

    // 清空 window.target
    // window.target = null
    popTarget()
    // 返回值
    return value
  }

  // 更新
  update () {
    // 保存旧值
    const oldValue = this.value
    // 获取新值
    this.value = this.get()
    // 改变回调 this 上下文
    this.cb.call(this.vm, this.value, oldValue)
  }

  // 添加dep
  addDep (dep) {
    const id = dep.id
    if (!this.depsIds.has(id)) {
      this.depsIds.add(id)
      this.deps.push(dep)
      dep.addSub(this)
    }
  }

  // 从所有依赖项的Dep列表中将自己移除
  teardown () {
    let i = this.deps.length
    while (i--) {
      this.deps[i].removeSub(this)
    }
  }
}
