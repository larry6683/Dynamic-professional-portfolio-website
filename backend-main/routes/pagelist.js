const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();

const {getpagelist} = require('../controller/pagelist')

router.get('/pagelist/getpagelist',getpagelist)

module.exports = router;