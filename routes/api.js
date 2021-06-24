const express = require('express');
const apiHandlers = require('../handlers/api');
const consts = require('../utils/consts');

const router = express.Router();

const { statusCodes, errorStringsMap } = consts;
const { checkChargeHandler, getDeclineReasonsHandler } = apiHandlers;

const getBody = result => {
    const { success, error, status, isDatailsValid } = result;
    if (success) return {};
    if (error && isDatailsValid) return { error };
    if (!isDatailsValid) return {};
    if (status === statusCodes.INTERNAL_SERVER_ERROR_STATUS) return {};
}

const prefix = '/api';

router.post(`${prefix}/charge`, async (req, res) => {
    const { body, headers: { 'merchant-identifier': marchentId } } = req;
    const result = await checkChargeHandler(body, marchentId);
    const { status } = result;
    const resBody = getBody(result);
    res.status(status);
    res.send(resBody);
});

router.get(`${prefix}/chargeStatuses`, async (req, res) => {
    const { headers: { 'merchant-identifier': marchentId } } = req;
    const declineReasons = getDeclineReasonsHandler(marchentId);
    res.status(statusCodes.OK);
    res.send(declineReasons);
});

module.exports = router
