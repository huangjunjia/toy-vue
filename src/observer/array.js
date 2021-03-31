import {
  def
} from 'utils'

// 获取数组原型链
const arrayProto = Array.prototype
// 使用Array.prototype创建一个新对象
export const arrayMethods = Object.create(arrayProto)

// Array原型中可以改变数组自身内容的方法有7个
const methodsToPatch = [
  'push',
  'pop',
  'unshift',
  'shift',
  'splice',
  'sort',
  'reverse'
]

// 循环拦截数组方法
methodsToPatch.forEach((method) => {
  // 缓存数组原始方法
  const original = arrayProto[method]
  // 响应数组方法
  def(arrayMethods, method, function mutator (...args) {
    // 缓存数组方法执行结果
    // 使用 apply 获取原始方法的返回值
    const result = original.apply(this, args)
    // 获取数组的__ob__属性的Observer实例
    const ob = this.__ob__

    // 获取新增元素
    let inserted

    // 判断触发的方法是不是增加数组的方法
    // 获取args并暂存
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    // 如果有新增的项则调用Observer实例的observeArray方法
    // 将新增的项转换为响应式数据
    if (inserted) {
      ob.observeArray(inserted)
    }

    // 派发通知
    ob.dep.notify()

    return result
  })
  // 旧方法
  // Object.defineProperty(arrayMethods, method, {
  //   value: function mutator (...args) {
  //     // 缓存数组方法执行结果
  //     // 使用 apply 获取原始方法的返回值
  //     const result = original.apply(this, args)
  //     // 获取数组的__ob__属性的Observer实例
  //     const ob = this.__ob__
  //     // 派发通知
  //     ob.dep.notify()
  //
  //     return result
  //   },
  //   writable: true,
  //   configurable: true,
  //   enumerable: false
  // })
})
