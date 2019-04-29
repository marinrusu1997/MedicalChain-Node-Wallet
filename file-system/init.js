const fs = require('fs')

const keysDirectoryName = 'keys'

const fsInitialization = () => {
   try {
      fs.mkdirSync(keysDirectoryName, 0700)
   } catch (e) {
      if (e.code !== 'EEXIST')
         throw e
   }
}

module.exports.keysDirectoryName = keysDirectoryName
module.exports.fsInitialization = fsInitialization