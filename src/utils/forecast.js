const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=7cdad42159aff916b1679b1658020851&query=${latitude},${longitude}`

    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined, undefined)
        } else if (body.error) {
            callback(body.error.info, undefined, undefined)
        } else {
            callback(undefined, `The weather is ${body.current.weather_descriptions[0]}. It is current ${body.current.temperature} degrees out. There is a ${body.current.precip}% chance of rain.`)
        }
    })
}

module.exports = forecast