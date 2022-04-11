require('dotenv').config()
const express = require('express')
const cors = require('cors')
const ws = require('ws')
const sql = require('./lib/mysql')
const wss = new ws.Server({
    port: process.env.WS_PORT,
}, () => console.log(`WebSocket started on port ${process.env.WS_PORT}`))

// const msgRouters = require('./routes/message.js')
const authRouters = require('./routes/auth.js')
const profileRouter = require('./routes/profile.js')
const PORT = process.env.PORT || 5000
const app = express()



app.use(express.json())
app.use(cors())
app.use('/auth', authRouters)
app.use('/profile', profileRouter)
// app.use('/im', msgRouters)

wss.on('connection', function connection(ws) {
    ws.on('message', function (message) {
        message = JSON.parse(message)
        switch (message.event) {
            case 'message':
                broadcastMessage(message)
                break;
            case 'connection':
                broadcastMessage(message)
                break;
        }
    })
})

async function broadcastMessage(message, id) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}


app.listen(PORT, () => console.log(`server started on port: ${PORT}`))