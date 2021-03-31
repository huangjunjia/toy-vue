import Dep from './dep'
import { arrayMethods } from './array'
import {
  def,
  hasOwn,
  hasProto,
  isObject
} from 'utils'

const arrayKeys = Object.getOwnPropertyNames(arrayMethods)

/**
 * 每一个要侦测变化的 object 都会使用 Observer 类去初始化
 * 初始化之后 object 所有属性都会被转换为响应式数据
 * 通过劫持的 getter 和 setter 实现依赖收集和通知变化
 */
export class Observer {
  constructor (value) {
    this.value = value
    // 用于保存Array收集的依赖
    this.dep = new Dep()

    // Array拦截器是对原型方法的封装
    // 可以通过this获取Observer实例
    // 通过def方法创建一个不可枚举的属性__ob__用于保存Observer实例
    // 之后就可以通过__ob__属性获取到dep
    // 同时可以通过__ob__判断属性是否挂载Observer实例
    def(value, '__ob__', this)

    // 判断数据是否为 Array
    if (Array.isArray(value)) {
      // 将包装后的数组方法添加到数组的原型上覆盖原生方法
      const augment = hasProto ? protoAugment : copyAugment
      augment(value, arrayMethods, arrayKeys)
      this.observeArray(value)
    } else {
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

  // 将数组中的每一个元素都转换成响应式数据
  observeArray (arr) {
    for (let i = 0, l = arr.length; i < l; i++) {
      observe(arr[i])
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
  // if (typeof value === 'object') {
  //   // eslint-disable-next-line no-new
  //   new Observer(value)
  // }
  // 修改为使用 observe 方法转换响应式
  const childOb = observe(value)

  const dep = new Dep()
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get () {
      // 收集依赖
      dep.depend()
      if (childOb) {
        childOb.dep.depend()
      }
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

// 将重写过后的数组方法覆盖原生方法
function protoAugment (target, src, keys) {
  target.__proto__ = src
}

// 给数组增加拦截器
function copyAugment (target, src, keys) {
  for (let i = 0, l = keys.length; i < l; i++) {
    def(target, keys[i], src[keys[i]])
  }
}

/**
 * 尝试为数据value创建一个Observer实例
 * 如果创建成功，则返回新创建的Observer实例
 * 如果value已经有一个Observer实例，则直接返回这个实例
 */
function observe (value) {
  // 判断value是否为Object类型，不是则直接返回
  if (!isObject(value)) {
    return
  }

  // Observer实例
  let ob
  // 判断是否存在__ob__及是否为Observer实例
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else {
    ob = new Observer(value)
  }

  return ob
}
