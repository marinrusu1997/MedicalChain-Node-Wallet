const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./routes')
const fsInitialization = require('./file-system/init').fsInitialization

/* Configuration */
const port = 6080
const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(routes)
/* Configuration */

/* Initializations */
fsInitialization()
/* Initializations */

/* Launch */
app.listen(port, () => {
   console.log(`Wallet Server started on port ${port} ...`)
})
/* Launch */