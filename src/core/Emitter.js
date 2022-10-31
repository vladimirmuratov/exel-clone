export class Emitter {
  constructor() {
    this.listeners = {}
  }

  // Уведомляем слушателей если они есть
  // table.emit('table:select, {a: 1})
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach(listener => {
      listener(...args)
    })
    return true
  }

  // Подписываемся на увудомление
  // Добавляем нового слушателя
  // formula.subscribe('table:select', () => {})
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] = this.listeners[event]
          .filter(listener => listener !== fn)
    }
  }
}

// Example
/* const emitter = new Emitter()
const unsub = emitter.subscribe('vlad', data => console.log('Sub: ', data))
setTimeout(() => {
  emitter.emit('vlad', 'After 2 seconds')
}, 2000)
setTimeout(() => {
  unsub()
}, 3000)
setTimeout(() => {
  emitter.emit('vlad', 'After 4 seconds')
}, 4000)*/
