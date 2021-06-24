const checkCCUtils = require('../utils/checkCCDetails');
const checkMarchentUtils = require('../utils/checkMarchent');
const ccCharger = require('../utils/ccCharger');
const marchentDeclineStore = require('../stores/declineReasons');
const { getDeclineReasons } = marchentDeclineStore;
const consts = require('../utils/consts');

const { checkCCetails } = checkCCUtils;
const { checkMarchent } = checkMarchentUtils;
const { statusCodes, errorStringsMap } = consts;

const checkChargeHandler = async (params, marchentId) => {
    const isDatailsValid = checkCCetails(params) && checkMarchent(marchentId);
    if (!isDatailsValid) return {
        success: false,
        status: statusCodes.BAD_REQUEST,
        isDatailsValid: false
    };

    try {
        const result = await ccCharger(marchentId, params, );
        return {
            ...result,
            status: statusCodes.OK,
            isDatailsValid: true
        };
    } catch(e) {
        return {
            success: false,
            reason: errorStringsMap.INTERNAL_SERVER_ERROR,
            status: statusCodes.INTERNAL_SERVER_ERROR_STATUS,
            isDatailsValid: true
        };
    }
}

const getDeclineReasonsHandler = marchentId => {
    try {
        const result = getDeclineReasons(marchentId);
        return result;
    } catch(e) {
        return [];
    }
}

module.exports = { checkChargeHandler, statusCodes, getDeclineReasonsHandler };