import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import schoolRouter from './routers/schoolRouter.js';
import clubRouter from './routers/clubRouter.js';
import reviewRouter from './routers/reviewRouter.js';
import interviewRouter from './routers/interviewRouter.js';

dotenv.config();

const app = express();

// these help stuff be parsed to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

// request and response
app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use('/api/schools', schoolRouter);

app.use('/api/clubs', clubRouter);

app.use('/api/reviews', reviewRouter);

app.use('/api/interviews', interviewRouter);

//when something throws error, send message
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message })
})

const port = process.env.PORT || 5555;
app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
})