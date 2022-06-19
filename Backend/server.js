const app = require('./app')
const PORT = process.env.PORT || 8080

process.on('uncaughtException', err =>{
    console.log('UNCAUGHT EXCEPTION!! SHUTTING DOWN NOW...')
    console.log(err.name, err.message)
    process.exit(1)
})

const server = app.listen(PORT, ()=>{
    console.log(`server is connected and running on port ${PORT}`)
})

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION!! SHUTTING DOWN NOW...')
    console.log(err.name, err.message)
    server.close(()=>{
        process.exit(1)
    })
})