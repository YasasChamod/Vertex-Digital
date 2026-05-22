require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const { logger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const cookiesParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConn');
const mongoose = require('mongoose');
const { logEvents } = require('./middleware/logger');
const PORT = process.env.PORT || 5000;

console.log(process.env.NODE_ENV);

connectDB();

app.use(logger);

app.use(express.json());

app.use(cors(corsOptions));

app.use(cookiesParser());

app.use('/', express.static(path.join(__dirname, 'public')));

const rootRouter = require('./routes/root');
const userRouter = require('./routes/userRoute');
const authRouter = require('./routes/authRoutes');
const noteRouter = require('./routes/noteRoutes');

app.use('/', rootRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/notes', noteRouter);

app.all(/.*/, (req, res) => {
    res.status(404)
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if(req.accepts('json')) {
        res.json({error: '404 Not Found'})
    } else {
        res.type('txt').send('404 Not Found')
    }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    if (process.env.VERCEL !== '1') {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
});

mongoose.connection.on('error', err => {
    console.log(err);
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
});

module.exports = app;