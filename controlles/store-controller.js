const writeHelper = require("../file-system/write").writeHelper

const isBodyFormatValid = (body, res) => {
   if (!!!body) {
      res.status(400).send({
         message: 'Body params required'
      })
      return false
   }
   if (!!!body.account || !!!body.key) {
      res.status(400).send({
         message: 'Invalid body format'
      })
      return false
   }
   return true
}

const makeStoreCb = res => {
   return err_msg => {
      if (err_msg) {
         return res.status(500).send({
            message: err_msg
         })
      }
      res.status(200).send()
   }
}

module.exports = {
   storeEncryptionKey: async function (req, res) {
      if (!!!isBodyFormatValid(req.body, res)) {
         return
      }
      writeHelper.storeEncryptionKey(req.body.account, req.body.key, makeStoreCb(res))
   },
   storeRecordsKey: async function (req, res) {
      if (!!!isBodyFormatValid(req.body)) {
         return
      }
      writeHelper.storeRecordsFileName(req.body.account, req.body.key, makeStoreCb(res))
   }
}