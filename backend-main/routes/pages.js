const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();

const {create,getpage,update,deletepage} = require('../controller/pages')

router.post('/pages/create',create)
router.post('/pages/getpage',getpage)
router.post('/pages/update',update)
router.post('/pages/delete',deletepage)

module.exports = router;