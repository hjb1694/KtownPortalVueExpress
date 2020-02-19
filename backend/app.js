const express = require('express');
const config = require('./config/config');
const fileUpload = require('express-fileupload');

const User = require('./database/models/User');


const app = express();
app.use(express.json());
app.use(fileUpload());

//routes 
app.use('/auth', require('./routes/auth'));


app.listen(config.port, () => console.log(`Listening on port ${config.port}`));



