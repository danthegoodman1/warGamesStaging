import { observable, autorun, decorate } from "mobx";

class SampleStore {
    theStore = ['hey']
    createdReload = false
    tableData = []
}

var store = window.store = new SampleStore

export default store

autorun(() => {
    console.log('store changed in samplestore')
})

decorate(store, {
    theStore: observable,
    createdReload: observable,
    tableData: observable,
})
