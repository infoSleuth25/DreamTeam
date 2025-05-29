const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/conn');
const userRoutes = require('./routes/user.route'); 
connectToDb(process.env.DB_CONNECT);


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors());

app.use('/user',userRoutes);

module.exports = app;