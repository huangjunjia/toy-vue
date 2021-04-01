const { Observer, Watcher, Vue } = require('../dist/bundle.cjs')

describe('Object', () => {
  it('should change value', (done) => {
    const data = {
      name: '张三',
      age: 18,
      children: {
        one: 1,
        two: 2
      }
    }
    new Observer(data)
    new Watcher(data, 'name', (newValue, oldValue) => {
      expect(newValue).toBe('李四')
      expect(oldValue).toBe('张三')
      done()
    })

    data.name = '李四'
    data.children.one = 3
  })

  it('should change child value', (done) => {
    const data = {
      name: '张三',
      age: 18,
      children: {
        one: 1,
        two: 2
      }
    }
    new Observer(data)

    new Watcher(data, 'children.one', (newValue, oldValue) => {
      expect(newValue).toEqual(3)
      expect(oldValue).toEqual(1)
      done()
    })

    data.name = '李四'
    data.children.one = 3
  })
})

describe('Array', () => {
  it('push', (done) => {
    const data = {
      arr: [
        1,
        2,
        {
          name: '张三'
        }
      ]
    }

    new Observer(data)
    new Watcher(data, 'arr', (newValue, oldValue) => {
      expect(newValue[3]).toBe(3)
      expect(newValue.length).toBe(4)
      done()
    })

    // data.arr[0] = 0
    data.arr.push(3)
  })

  it('pop', (done) => {
    const data = {
      arr: [
        1,
        2,
        {
          name: '张三'
        }
      ]
    }

    new Observer(data)
    new Watcher(data, 'arr', (newValue, oldValue) => {
      expect(newValue[2]).toBe(undefined)
      expect(newValue.length).toBe(2)
      done()
    })

    data.arr.pop()
  })

  it('unshift', (done) => {
    const data = {
      arr: [
        1,
        2,
        {
          name: '张三'
        }
      ]
    }

    new Observer(data)
    new Watcher(data, 'arr', (newValue, oldValue) => {
      expect(newValue[0]).toBe('王五')
      expect(newValue.length).toBe(4)
      done()
    })

    data.arr.unshift('王五')
  })

  it('shift', (done) => {
    const data = {
      arr: [
        1,
        2,
        {
          name: '张三'
        }
      ]
    }

    new Observer(data)
    new Watcher(data, 'arr', (newValue, oldValue) => {
      expect(newValue[0]).toBe(2)
      expect(newValue.length).toBe(2)
      done()
    })

    data.arr[2] = '李四'
    data.arr.shift()
  })

  it('sort', (done) => {
    const data = {
      arr: [1, 4, 2, 3, 7]
    }

    new Observer(data)
    new Watcher(data, 'arr', (newValue, oldValue) => {
      expect(newValue).toEqual([1, 2, 3, 4, 7])
      done()
    })

    data.arr.sort((a, b) => a - b)
  })

  it('splice', (done) => {
    const data = {
      arr: [1, 4, 2, 3, 7]
    }

    new Observer(data)
    let count = 0
    new Watcher(data, 'arr', (newValue, oldValue) => {
      if (count === 0) {
        expect(newValue).toEqual([1, 4, 2, 7])
      } else {
        expect(newValue).toEqual([1, 4, 2, 5, 7])
      }
      done()
    })

    data.arr.splice(3, 1)
    count++
    data.arr.splice(3, 0, 5)
  })

  it('reverse', (done) => {
    const data = {
      arr: [1, 4, 2, 3, 7]
    }

    new Observer(data)
    new Watcher(data, 'arr', (newValue, oldValue) => {
      expect(newValue).toEqual([7, 3, 2, 4, 1])
      done()
    })

    data.arr.reverse()
  })
})

describe('$watch', () => {
  const data = {
    name: '张三',
    children: [
      {
        label: '男性'
      }
    ]
  }
  const vm = new Vue({
    data
  })

  it('expOrFn is a function', (done) => {
    vm.$watch('data', (newValue, oldValue) => {
      console.log(newValue, oldValue)
      expect(newValue.children).toEqual([{ label: '女性' }])
      done()
    }, {
      deep: true
    })
    vm.data.children[0].label = '女性'
  })

  it('function run by immediate true', (done) => {
    const unwatch = vm.$watch('data.name', (newValue, oldValue) => {
      expect(newValue).toEqual('张三')
      done()
    }, {
      immediate: true
    })
    unwatch()
  })

  it('function run by immediate false', (done) => {
    vm.$watch('data.name', (newValue, oldValue) => {
      expect(newValue).toEqual('李四')
      expect(oldValue).toEqual('张三')
      done()
    })
    vm.data.name = '李四'
  })
})
