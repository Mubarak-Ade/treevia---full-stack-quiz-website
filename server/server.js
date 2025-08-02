// Path: server/server.js
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoute.js'
import quizRoutes from './routes/quizRoute.js'
import resultRoute from './routes/resultRoute.js'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

connectDB();
app.use('/api/user', authRoutes)
app.use('/api/quiz', quizRoutes)
app.use('/api/results', resultRoute)

const PORT = process.env.PORT || 5000;





app.listen(PORT, () => console.log(`Server app listening on port $ ${PORT}!`))
