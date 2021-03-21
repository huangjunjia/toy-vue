const { Observer, Watcher } = require('../lib/bundle');

test('Observer', () => {
  const data = {
    name: '张三',
    age: 18,
    phone: '18512341234'
  }

  new Observer(data);

  new Watcher(data, 'name', (newValue, oldValue) => {
    console.log(newValue, oldValue);
    expect(newValue).toBe('李四');
    expect(oldValue).toBe('张三');
  });

  data.name = '李四';
  data.age = 24;
})
