const fs = require('fs')
const keysDirectoryName = require('./init').keysDirectoryName

const encryptionFileName = 'encryption.txt'
const recordsFileName = 'records.txt'

const makeFilePath = (directory, file) => directory + '/' + file

const ensureDirectoryExists = (path, cb) => {
   fs.mkdir(path, 0700, err => {
      if (err) {
         if (err.code == 'EEXIST') {
            cb(null); // ignore the error if the folder already exists
         }
         else {
            cb(err.message); // something else went wrong
         }
      } else {
         cb(null); // successfully created folder
      }
   })
}

const storeKey = (directoryName, fileName, key, cb) => {
   ensureDirectoryExists(directoryName, err_msg => {
      if (err_msg) {
         cb(err_msg)
      }
      fs.writeFile(makeFilePath(directoryName, fileName), key, err => {
         if (err) {
            cb(err.message)
         } else {
            cb(null)
         }
      })
   })
}

const makePathToUserKeys = account => keysDirectoryName + '/' + account

const storeEncryptionKey = (account, key, cb) => {
   storeKey(makePathToUserKeys(account), encryptionFileName, key, cb)
}

const storeRecordsFileName = (account, key, cb) => {
   storeKey(makePathToUserKeys(account), recordsFileName, key, cb)
}

const writeFileNames = {
   encryptionFileName: encryptionFileName,
   recordsFileName: recordsFileName
}

const writeHelper = {
   storeEncryptionKey: storeEncryptionKey,
   storeRecordsFileName: storeRecordsFileName
}

module.exports.writeHelper = writeHelper
module.exports.writeFileNames = writeFileNames