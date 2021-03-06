const express = require('express');
const globalRouter = require('./const/router.const');
const createSession = require('./const/session.const')

const app = express();

app.use(express.json());

app.use(createSession);

app.use(globalRouter);

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "0.0.0.0"

app.listen(PORT, HOST, () => {
    console.log(`Server is ap at port: ${PORT}`);  
})