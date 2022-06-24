/* const express = require('express');
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
app.listen(8080, () => console.log('Server is up and running on port 8080')); */

const express = require('express')
const app = express()
const { config } = require('dotenv')
const path = require('path')
const bodyParser = require('body-parser')
const AppError = require('./utilities/appError') 
const cors = require('cors')
config()
require('./database')


app.use(cors())
app.options('*', cors())
app.use(bodyParser.urlencoded({ extended : true }))
app.use( bodyParser.json())
app.use(express.json())

/* app.get('/', (req,res) => {
  res.send('Welcome to SkillUP Learning Portal!');
  console.log(req.body);
}); */


const instructorApiRoute = require('./routes/instructorApiRoutes')
const studentApiRoute = require('./routes/studentApiRoutes')
const errorHandler = require('./Handler/errorHandler')

// app.use(instructorApiRoute)
// app.use(studentApiRoute)
app.use('/instructor', instructorApiRoute)
app.use('/student', studentApiRoute)



app.all( '*', (req, _, next) => {
  next(new AppError(`can not find route ${req.originalUrl} in this server`, 404))
})

app.use(errorHandler)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.resolve(__dirname, 'client', 'build')));
    app.get('*', (req, res)=>{
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

module.exports = app