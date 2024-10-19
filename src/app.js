const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const userRouter = require("./routers/userRouter")


const app = express()


app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send('hallo hai server is started start your work')
})



app.use('/api/users', userRouter)

module.exports = app