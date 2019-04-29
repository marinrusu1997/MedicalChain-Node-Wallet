const readHelper = require('../file-system/read').readHelper

const isBodyFormatValid = (body, res) => {
   if (!!!body) {
      res.status(400).send({
         message: 'Body params required'
      })
      return false
   }
   if (!!!body.account) {
      res.status(400).send({
         message: 'Invalid body format'
      })
      return false
   }
   return true
}

const makeRetrieveCb = res => {
   return status => {
      if (status.succes) {
         res.status(200).send({
            key: status.data
         })
      } else {
         res.status(500).send({
            message: status.data
         })
      }
   }
}

module.exports = {
   retrieveEncryptionKey: async function (req, res) {      
      if (!!!isBodyFormatValid(req.body, res)) {
         return
      }
      readHelper.readEncryptionKey(req.body.account, makeRetrieveCb(res))
   },
   retrieveRecordsKey: async function (req, res) {
      if (!!!isBodyFormatValid(req.body, res)) {
         return
      }
      readHelper.readRecordsKey(req.body.account, makeRetrieveCb(res))
   }
}