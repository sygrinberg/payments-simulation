const checkMarchent = marchentId => {
    return marchentId && typeof marchentId === 'string';
}

module.exports = { checkMarchent };