const express = require('express');
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth.routes')

const app = express()
dotenv.config()
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.json({
        "status": "Hello world!"
    })
})

app.use('/api/auth', authRoutes)


app.listen(port, () => {
    console.log('Server is running...');
})