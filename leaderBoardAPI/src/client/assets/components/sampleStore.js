import { observable, autorun, decorate } from "mobx";

class SampleStore {
    theStore = ['hey']
}

var store = window.store = new SampleStore

export default store

autorun(() => {
    console.log('store changed in file')
})

decorate(store, {
    theStore: observable
})
