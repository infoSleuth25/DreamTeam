const express = require('express');
const app = express();
const connectToDb = require('./db/conn');
connectToDb(process.env.DB_CONNECT);
const userRoutes = require('./routes/user.route'); 

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/user',userRoutes);

module.exports = app;