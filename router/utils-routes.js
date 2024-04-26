const express = require('express');
const router = express.Router();

const { getExchangeRate } = require('../controller/utils');
router.get('/exchange-rates', getExchangeRate);
module.exports = router;
