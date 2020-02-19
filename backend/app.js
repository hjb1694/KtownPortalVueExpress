const express = require('express');
const config = require('./config/config');
const fileUpload = require('express-fileupload');

const User = require('./database/models/User');


const app = express();
app.use(express.json());
app.use(fileUpload());

app.get('/', async (req,res) => {

    const result = await User.userExists(1);

    console.log(result);

});


app.listen(config.port, () => console.log(`Listening on port ${config.port}`));



