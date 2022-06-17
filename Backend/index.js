const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const uri = 'mongodb://127.0.0.1:27017/skillUp';
mongoose.connect(uri, {useNewUrlParser: true});

const connection = mongoose.connection;
connection.once('open', () => console.log('MongoDB connected'));

app.use(express.json());

app.get('/', (req,res) => {
    res.send('Welcome to SkillUP Learning Portal!');
    console.log(req.body);
});
app.listen(8080, () => console.log('Server is up and running on port 8080'));