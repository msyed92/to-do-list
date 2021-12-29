const today = new Date()
exports.getDate = function () {
    const options = {
        weekday: "short",
        day: "numeric",
        month: "long"
    }
    return today.toLocaleDateString("en-US", options)
}

exports.getDay = () => {
    const options = {
        weekday: "long"
    }
    return today.toLocaleDateString("en-US", options)
}