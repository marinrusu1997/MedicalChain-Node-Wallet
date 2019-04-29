const fs = require('fs')
const keysDirectoryName = require('./init').keysDirectoryName
const writeFileNames = require('./write').writeFileNames

const makeErrResp = msg => ({
   succes: false,
   data: msg
})

const makeSucResp = msg => ({
   succes: true,
   data: msg
})

const makeFilePath = (directory, file) => keysDirectoryName + '/' + directory + '/' + file

const readKey = (filePath, cb) => {
   fs.readFile(filePath, (err, data) => {
      if (err) {
         cb(makeErrResp(err.message))
      } else {
         cb(makeSucResp(data.toString()))
      }
   })
}

const readEncryptionKey = (account, cb) => {
   readKey(makeFilePath(account, writeFileNames.encryptionFileName), cb)
}

const readRecordsKey = (account, cb) => {
   readKey(makeFilePath(account, writeFileNames.recordsFileName), cb)
}

const readHelper = {
   readEncryptionKey: readEncryptionKey,
   readRecordsKey: readRecordsKey
}

module.exports.readHelper = readHelper