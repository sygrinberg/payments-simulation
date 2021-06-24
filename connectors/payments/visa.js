const axios = require('axios');
const consts = require('../../utils/consts');
const declineReasonStore = require('../../stores/declineReasons');

const { addDeclineReason } = declineReasonStore;

const { errorStringsMap } = consts;

const VISA_URL = 'https://interview.riskxint.com/visa/api/chargeCard'

const chargeVisa = async (marchentId, ccDetails) => {
    const { fullName, creditCardNumber, expirationDate, cvv, amount } = ccDetails;
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.post(VISA_URL, {
                fullName,
                number: creditCardNumber,
                expiration: expirationDate,
                cvv,
                totalAmount: amount
            }, {
                headers: { identifier: marchentId }
            });
            
            const { data } = result;
            const { chargeResult, resultReason } = data;

            const success = chargeResult.toLowerCase() === 'success';
            if (!success) addDeclineReason(marchentId, resultReason);
            
            resolve({
                success,
                error: errorStringsMap.CARD_DECLINED
            });
        } catch(result) {
            reject({ // To activate the retry mechanism
                success: false,
                error: errorStringsMap.CONNECTION_ERROR,
            });
        }
    });
}

module.exports = chargeVisa;