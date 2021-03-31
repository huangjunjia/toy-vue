const { Observer, Watcher } = require('../dist/bundle.cjs')

test('Watcher Object', () => {
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
  })

  new Watcher(data, 'children.one', (newValue, oldValue) => {
    expect(newValue).toEqual(3)
    expect(oldValue).toEqual(1)
  })

  data.name = '李四'
  data.children.one = 3
})

test('Watcher Array Push & Change', () => {
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
  })

  // data.arr[0] = 0
  data.arr.push(3)
})

test('Watcher Array Pop & Change', () => {
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
  })

  data.arr.pop()
})

test('Watcher Array Unshift & Change', () => {
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
  })

  data.arr.unshift('王五')
})

test('Watcher Array Shift & Change', () => {
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
  })

  data.arr[2] = '李四'
  data.arr.shift()
})

test('Watcher Array Sort & Change', () => {
  const data = {
    arr: [1, 4, 2, 3, 7]
  }

  new Observer(data)
  new Watcher(data, 'arr', (newValue, oldValue) => {
    expect(newValue).toEqual([1, 2, 3, 4, 7])
  })

  data.arr.sort((a, b) => a - b)
})

test('Watcher Array Splice & Change', () => {
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
  })

  data.arr.splice(3, 1)
  count++
  data.arr.splice(3, 0, 5)
})

test('Watcher Array Reverse & Change', () => {
  const data = {
    arr: [1, 4, 2, 3, 7]
  }

  new Observer(data)
  new Watcher(data, 'arr', (newValue, oldValue) => {
    expect(newValue).toEqual([7, 3, 2, 4, 1])
  })

  data.arr.reverse()
})
