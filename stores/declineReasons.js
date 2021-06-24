const marchentIdMap = {};

const getReasonKey = reason => {
    const lowerCasedReason = reason.toLowerCase();
    if (lowerCasedReason.includes('insufficient')) return 'Insufficient funds';
    if (lowerCasedReason.includes('declined')) return 'Declined';
};

const addDeclineReason = (marchentId, reason) => {
    const reasonKey = getReasonKey(reason);
    const marchentArr = marchentIdMap[marchentId] || [];
    const reasonObj = marchentArr.find(obj => obj.reason === reasonKey);
    if (reasonObj) reasonObj.count++;
    else marchentArr.push({
        reason: reasonKey,
        count: 1
    });
    marchentIdMap[marchentId] = marchentArr;
}

const getDeclineReasons = marchentId => marchentIdMap[marchentId] || [];

module.exports = { getDeclineReasons, addDeclineReason };