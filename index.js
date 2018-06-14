const env = 'development'

const app = require('express')()
const config = require('./config/config')[env]

require('./config/database')(config)
require('./config/server')(app)
require('./config/middleware')(app)
require('./config/routes')(app)

app.listen(config.port, () => `Server listening on port ${config.port}`)
