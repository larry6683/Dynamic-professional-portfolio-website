const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
let http = require('http');
let fs = require('fs');
require('dotenv').config();
const path = require('path');

// app
const app = express();

const pagesRoutes = require('./routes/pages')
const pagesListRoutes = require('./routes/pagelist');
const navbarRoutes = require('./routes/navbar')





//api  calls



// db
mongoose
    .connect(process.env.DATABASE_LOCAL, {
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    })
    .then(() => console.log('DB connected'))
    .catch(err => {
        console.log(err);
    });




// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());

app.use(cors());

app.use('/api',pagesRoutes)
app.use('/api',pagesListRoutes)
app.use('/api',navbarRoutes)
  app.get('/',(req,res)=>{
      res.send("Server is running");
  })




// port
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

