import { extendObservable } from 'mobx';

class userStore {
    constructor() {
        extendObservable(this,{
            loading:true,
            isloggedIn: false,
            username:''
        })
    }
}
export default new userStore();