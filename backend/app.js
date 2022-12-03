//config
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const fileRouter = require('./routes/fileRouter');
const appointmentRouter = require('./routes/appointmentRouter');
const propertyRouter = require('./routes/propertyRouter');
const userRouter = require('./routes/userRouter');
//app
const app = express();

//file
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

//middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//route
app.use((req, res, next) => next());
app.use('/upload', upload.single("file"), fileRouter);
app.use('/properties', propertyRouter);
app.use('/appointments', appointmentRouter);
app.use('/users', userRouter);

app.use((req, res, next) => {
    next(new Error('Route Not Found'));
});

app.use((err, req, res, next) => {
    res.status(500).json(err);
});

let port = process.env.PORT;
if (port == null || port === "") {
    port = 3000;
}

app.listen(port, (err) => {
    mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@cluster0.nmh0vxh.mongodb.net/myPropertyPortal`, { useNewUrlParser: true });
});
