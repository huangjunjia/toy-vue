import Watcher from '../observer/watcher'
import { observe } from '../observer'

function Vue (options) {
  this._init(options)
}

Vue.prototype._init = function (options) {
  const vm = this
  if (options.data) {
    vm.data = options.data
    observe(vm.data)
  }
}

Vue.prototype.$watch = function (expOrFn, cb, options) {
  const vm = this
  options = options || {}
  const watcher = new Watcher(vm, expOrFn, cb, options)
  if (options.immediate) {
    cb.call(vm, watcher.value)
  }
  return function unwatchFn () {
    watcher.teardown()
  }
}

export default Vue
