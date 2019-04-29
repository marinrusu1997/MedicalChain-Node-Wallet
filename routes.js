const express = require('express')
const storeCtrl = require('./controlles/store-controller')
const retrieveCtrl = require('./controlles/retrieve-controller')

const router = express.Router()

router.route('/store/encryption').post(storeCtrl.storeEncryptionKey)
router.route('/store/records').post(storeCtrl.storeRecordsKey)

router.route('/retrieve/encryption').post(retrieveCtrl.retrieveEncryptionKey)
router.route('/retrieve/records').post(retrieveCtrl.retrieveRecordsKey)

module.exports = router