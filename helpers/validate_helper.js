
module.exports = function alreadyJSONType(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

