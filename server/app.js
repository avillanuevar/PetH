require('dotenv').config()

const express = require('express')
const app = express()

require('./configs/mongoose.config')
require('./configs/debugger.config')
require('./configs/middlewares.config')(app)
require('./configs/view-engine.config')(app)
require('./configs/locals.config')(app)
require('./configs/session.config')(app)

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/profile", require("./routes/profile.routes"));
app.use("/api/files", require("./routes/files.routes"));
app.use("/api/pets", require("./routes/pets.routes"));



module.exports = app;