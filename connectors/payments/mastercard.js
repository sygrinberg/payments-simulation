const axios = require('axios');
const consts = require('../../utils/consts');
const declineReasonStore = require('../../stores/declineReasons');

const { addDeclineReason } = declineReasonStore;

const { errorStringsMap } = consts;

const checkSuccess = data => data === 'OK';

const MASTERCARD_URL = 'https://interview.riskxint.com/mastercard/capture_card'

const chargeMC = async (marchentId, ccDetails) => {
    const { fullName, creditCardNumber, expirationDate, cvv, amount } = ccDetails;
    const [first_name, last_name] = fullName.split(' ');

    return new Promise(async (resolve, reject) => {    
        try {
            const result = await axios.post(MASTERCARD_URL, {
                first_name,
                last_name,
                card_number: creditCardNumber,
                expiration: expirationDate.replace('/', '-'),
                cvv,
                charge_amount: amount
            }, {
                headers: { identifier: marchentId }
            });
            
            const { data } = result;
            
            resolve({
                success: checkSuccess(data)
            });
        } catch(result) {
            const { response: { data: { decline_reason, error } } } = result;
            if (error || !decline_reason) { // If its not declining then there is an error and we want to activate the retry mechanism
                reject({
                    success: false,
                    error: errorStringsMap.CONNECTION_ERROR
                });
            } else {
                addDeclineReason(marchentId, decline_reason);
                resolve({
                    success: false,
                    error: errorStringsMap.CARD_DECLINED
                });
            }
        }
    });
}

module.exports = chargeMC;