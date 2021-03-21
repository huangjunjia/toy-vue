import Dep from './dep';

function defineReactive(data, key, value) {
  if (typeof value === 'object') {
    new Observer(value);
  }

  const dep = new Dep();
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      dep.depend();
      return value;
    },
    set(newValue) {
      if (value === newValue) {
        return;
      }
      value = newValue;
      dep.notify();
    }
  })
}

export class Observer {
  constructor(value) {
    this.value = value;
    if (Array.isArray(value)) {
      // TODO
    } else {
      this.walk(value);
    }
  }

  walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]]);
    }
  }
}
