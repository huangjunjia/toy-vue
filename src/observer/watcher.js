import { parsePath } from 'utils'

export default class Watcher {
  constructor (vm, expOrFn, cb) {
    this.vm = vm
    // 可以通过getter获取值，可以读取到 data.a.b.c
    this.getter = parsePath(expOrFn)
    this.cb = cb
    this.value = this.get()
  }

  get () {
    // 将当前 watcher 保存在 window.target
    window.target = this
    // 执行 getter 获取解析的路径的值
    const value = this.getter.call(this.vm, this.vm)
    // 清空 window.target
    window.target = null
    // 返回值
    return value
  }

  update () {
    // 保存旧值
    const oldValue = this.value
    // 获取新值
    this.value = this.get()
    // 改变回调 this 上下文
    this.cb.call(this.vm, this.value, oldValue)
  }
}
