const visaCharge = require('../connectors/payments/visa');
const mcCharge = require('../connectors/payments/mastercard');

const chergerHandlersMap = {
    visa: visaCharge,
    mastercard: mcCharge
};

const maxRetries = 3;

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const chargeCC = async (marchentId, ccDetails) => {
    const { creditCardCompany } = ccDetails;
    const connectorFunc = chergerHandlersMap[creditCardCompany];
    try {
        const result = await connectorFunc(marchentId, ccDetails, connectorFunc);
        return result;
    } catch(errorResult) {
        return await chargeCcRetry(marchentId, ccDetails, 1);
    }
}

const chargeCcRetry = async (marchentId, ccDetails, retries) => {
    await wait(retries * retries * 1000);
    const { creditCardCompany } = ccDetails;
    const connectorFunc = chergerHandlersMap[creditCardCompany];
    try {
        const result = await connectorFunc(marchentId, ccDetails, connectorFunc);
        return result;
    } catch(errorResult) {
        if (retries === maxRetries) {
            throw new Error(errorResult);
        }
        return await chargeCcRetry(marchentId, ccDetails, retries + 1);
    }
}

module.exports = chargeCC;