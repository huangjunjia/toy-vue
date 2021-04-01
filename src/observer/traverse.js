import { isObject } from 'utils'

// 已遍历过的内容
const seenObjects = new Set()

export function traverse (val) {
  _traverse(val, seenObjects)
  seenObjects.clear()
}

// 递归数据
function _traverse (val, seen) {
  let i
  let keys
  const isArr = Array.isArray(val)

  // 判断数据是否为数组或者对象
  // 判断数据是否通过 Object.freeze 冻结
  if ((!isArr && !isObject(val)) || Object.isFrozen(val)) {
    return
  }

  // 判断数据是否包含Observer实例
  if (val.__ob__) {
    // 通过__ob__属性(即Observer实例)获取dep
    const depId = val.__ob__.dep.id
    // 判断是否已遍历过该dep，防止重复处理
    if (seen.has(depId)) {
      return
    }
    // 将当前ob实例的dep的id保存起来，确认已处理过
    seen.add(depId)
  }

  // 判断数据类型
  if (isArr) {
    i = val.length
    while (i--) {
      // 遍历数组中的每一项
      _traverse(val[i], seen)
    }
  } else {
    keys = Object.keys(val)
    i = keys.length
    while (i--) {
      // 遍历对象中的每一个属性
      _traverse(val[keys[i]], seen)
    }
  }
}
