const checkName = fullName => {
    const [firstName, lastName, ...rest] = fullName.split(' ');
    return (!rest.length && firstName.length && lastName.length) ? true : false;
};

const checkCCNumber = ccNumber => ccNumber.match(/^[0-9]{16}$/) ? true : false;

const creditCardCompaniesMap = {
    'visa': true,
    'mastercard': true
};

const checkCreditCardCompany = ccString => creditCardCompaniesMap[ccString];

const checkExpirationDate = date => {
    const [monthStr, yearStr, ...rest] = date.split('/');
    if (rest.length || monthStr.length !== 2 || yearStr.length !== 2) return false;
    const month = Number(monthStr);
    const year = Number(yearStr);
    return (month <= 12 && month > 0 && year >= (new Date().getFullYear() % 100));
}

const checkCVV = cvv => cvv.match(/^[0-9]{3}$/) ? true : false;

const checkAmount = amount => typeof amount === 'number';

const checkCCetails = ccDetails => {
    // Assuming its a proper string and if it will fail then its not valid
    try {
        const { fullName, creditCardNumber, creditCardCompany, expirationDate, cvv, amount } = ccDetails;
        
        return checkName(fullName) &&
        checkCCNumber(creditCardNumber) &&
        checkCreditCardCompany(creditCardCompany) &&
        checkExpirationDate(expirationDate) &&
        checkCVV(cvv) &&
        checkAmount(amount);
    } catch(e) {
        return false;
    }
};

module.exports = { checkCCetails };