const { Observer, Watcher } = require('../dist/bundle.cjs')

test('Watcher', () => {
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
