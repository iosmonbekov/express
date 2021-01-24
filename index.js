const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')

const port = process.env.PORT || 3000;

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(todoRoutes)



// Launching a Server
async function start() {
    try {
        await mongoose.connect('mongodb+srv://iosmonbekov:123@cluster0.o5esa.mongodb.net/todos', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        })
        
        app.listen(port, () => {
            console.log(`Server has been started at PORT:${port}...`)
        })

    } catch (error) {
        console.log(error)
    }
}

start();