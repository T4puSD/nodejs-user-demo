const isEmpty = function(object) {
    return Object.keys(object).length === 0;
}

const isNotEmpty = function(object) {
    return !isEmpty(object);
}

module.exports = {
    isEmpty: isEmpty,
    isNotEmpty: isNotEmpty
}