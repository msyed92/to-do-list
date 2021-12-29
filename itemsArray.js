exports.assign = function (arr, obj) {
    arr = []
    if (Array.isArray(obj)) {
        arr = obj
    } else {
        arr.push(obj)
    }
    return arr
}