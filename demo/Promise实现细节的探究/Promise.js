class Promise {
    callbacks = [];
    state = 'pending';
    value = null;
    constructor(fn) {
        console.log('constructor');
        fn(this._resolve.bind(this));
    }
    then(onFulfilled) {
        console.log('then');
        return new Promise((resolve) => {
            this._handle({
                onFulfilled: onFulfilled || null,
                resolve: resolve
            })
        })
    }
    _handle(callback) {
        console.log('_handle'+ this.state);
        if (this.state === 'pending') {
            this.callbacks.push(callback);
            return
        }
        if (!callback.onFulfilled) {
            callback.resolve(this.value);
            return;
        }
        var ret = callback.onFulfilled(this.value);
        callback.resolve(ret);
    }
    _resolve(value) {
        console.log('_resolve');
        this.state = 'fulfilled';
        this.value = value;
        this.callbacks.forEach(fn => fn(value));
    }
}

let p = new Promise(resolve => {
    console.log('done');
    resolve('5s');
}).then((tip) => {
    console.log(tip);
})

// setTimeout(() => {
//     p.then((tip) => {
//         console.log(tip);
//     })
// }, 2);


