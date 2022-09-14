const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();

const {create, getnavbar,update} = require('../controller/navbar')


router.post('/navbar/create-navbar',create)
router.get('/navbar/get',getnavbar)
router.post('/navbar/update',update)

module.exports = router;