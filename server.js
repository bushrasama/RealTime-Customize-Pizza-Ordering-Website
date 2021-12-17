require('dotenv').config()
const express=require('express');
const app = express()
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const session=require('express-session')
const flash = require('express-flash')
const axios = require('axios');
const passport = require('passport')
const Emitter = require('events')

const MongoDbStore = require('connect-mongo')(session);//calling the fucntion and passing the session
//DB CONNECTION

const url='mongodb+srv://admin-EasyCheese:EasyCheesePassForAdmin@cluster0.e4ngo.mongodb.net/pizza';

mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true,
useFindAndModify: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log("Connection Error....")
});

//passprt config



//session store
let mongoStore = new MongoDbStore({
    mongooseConnection: connection,
    collection: 'sessions'
})

//Event Emitter

const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter)

//session config

app.use(session({
    secret: process.env.COOKIE,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }// 24 hours
}))

const passportInit=require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

//global middleware


app.use(flash())


app.use((req,res,next)=>{
    res.locals.session = req.session
    res.locals.user =req.user
    next()

})

//assets
app.use(express.static('public'))
app.use(express.urlencoded({extended : false}))
app.use(express.json())
require('./routes/web')(app)




//set template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/public/views'))
app.set('view engine', 'ejs')

const server = app.listen(PORT, () =>
{
    console.log(`Listening on port ${PORT}`)
})



//Socket

const io = require('socket.io')(server)
io.on('connection', (socket) => {
      // Join
    socket.on('join', (orderId) => {
        socket.join(orderId)
    })
})

eventEmitter.on('orderUpdated', (data) => {
    io.to(`order_${data.id}`).emit('orderUpdated', data)
})

eventEmitter.on('orderPlaced', (data) => {
    io.to('adminRoom').emit('orderPlaced', data)
})





