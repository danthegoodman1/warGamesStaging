const EventEmitter = require('events')
const globalBus = new EventEmitter()

const Store = class {
    constructor(defaultStore = {}) {
        this.store = defaultStore
    }
    
    getStore() {
        return this.store
    }
    
    setStore(newObj) {
        const keys = Object.keys(newObj)
        keys.forEach((ele, ind) => {
            this.store[ele] = newObj[ele]
        })
        globalBus.emit('globalStateUpdate', this.store)
    }
}
const store = new Store()

export {globalBus, store}
