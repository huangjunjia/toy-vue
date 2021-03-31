import Dep from './dep'

/**
 * 每一个要侦测变化的 object 都会使用 Observer 类去初始化
 * 初始化之后 object 所有属性都会被转换为响应式数据
 * 通过劫持的 getter 和 setter 实现依赖收集和通知变化
 */
export class Observer {
  constructor (value) {
    this.value = value

    // 判断数据是否为 Array
    if (!Array.isArray(value)) {
      this.walk(value)
    }
  }

  // 只有在数据类型为 Object 的时候触发
  // 将对象中每一个属性转换为响应式数据
  walk (obj) {
    const keys = Object.keys(obj)
    for (let i = 0, l = keys.length; i < l; i++) {
      defineReactive(obj, keys[i], obj[keys[i]])
    }
  }
}

/**
 * 将数据转换为响应式数据
 * 在getter中收集依赖
 * 在setter中触发依赖
 * @param data
 * @param key
 * @param value
 * @return {*}
 */
function defineReactive (data, key, value) {
  // 如果值的类型为 Object 则将值转换为响应式数据
  // 递归类型为 Object 的属性
  if (typeof value === 'object') {
    // eslint-disable-next-line no-new
    new Observer(value)
  }
  const dep = new Dep()
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get () {
      // 收集依赖
      dep.depend()
      return value
    },
    set (newValue) {
      if (value === newValue) {
        return
      }
      value = newValue
      // 更新依赖
      dep.notify()
    }
  })
}
