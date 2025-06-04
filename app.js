import express from 'express'

import { toursRouter } from './routes/tours.router.js'
import { authRouter } from './routes/auth.router.js'
import { userRouter } from './routes/users.router.js'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello from the server")
})


app.use('/api/tours', toursRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

const port = process.env.port || 3000

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})