const statusCodes = {
    INTERNAL_SERVER_ERROR_STATUS: 500,
    BAD_REQUEST: 400,
    OK: 200,
};

const errorStringsMap = {
    CONNECTION_ERROR: 'CONNECTION_ERROR',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
    CARD_DECLINED: 'Card declined'
};

module.exports = { statusCodes, errorStringsMap };