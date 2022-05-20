const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'error connecting to db'));

db.once('open',function()
{
    console.log('Sucessfully connection established to database');
});