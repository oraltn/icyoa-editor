export function genId() {
        function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1)
                ;
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4()
        ;
}

export function mapValues(obj, f) {
    if(!obj) return obj;
    let newObj = {};
    Object.entries(obj).forEach(([key, value]) => newObj[key] = f(value));
    return newObj;
}
