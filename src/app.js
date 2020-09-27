const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const nodeModulesDirectoryPath = path.join(__dirname, '../node_modules')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// Setup express config for routing
app.enable('case sensitive routing')
app.enable('strict routing')

// Setup partial for hbs
hbs.registerPartials(partialsPath)


// Setup static directory to use
app.use(express.static(publicDirectoryPath))
app.use(express.static(nodeModulesDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Bob Marley'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Bob Marley'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some Helpfull message.',
        name: 'Bob Marley'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
    
        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: data,
                location
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Bob Marley'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Bob Marley',
        errorMessage: 'Page not found',
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})