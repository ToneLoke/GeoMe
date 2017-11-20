import { GIPHY, WEATHER, GOOGLE } from './config'

class API {
  static request (url, method) {
    const promise = new Promise((resolve, reject) => {
      if (!(typeof url === 'string') || !(typeof method === 'string')) return reject(new Error('url, method must be of type string'))
      let params = {
        method: method
      }
      return fetch(url, params)
              .then(res => res.json())
              .then(s => {
                return resolve(s)
              })
              .catch(e => {
                reject(new Error(e))
              })
    })
    return promise
  }
}

export class CityAPI extends API {
  static get URL () {
    return 'http://ipinfo.io/json'
  }

  static get () {
    return super.request(CityAPI.URL, 'GET')
  }
}

export class WeatherAPI extends API {
  static createURL (endpoint, lat, lng) {
    return `http://api.openweathermap.org/data/2.5/${endpoint}?lat=${lat}&lon=${lng}&appid=${WEATHER}&units=imperial`
  }
  static getForecast (lat, lng) {
    let url = WeatherAPI.createURL('forecast', lat, lng)
    return super.request(url, 'GET')
  }
}

export class GiphyAPI extends API {
  static createURL (tag) {
    return `https://api.giphy.com/v1/gifs/random?api_key=${GIPHY}&tag=${tag}&rating=PG-13`
  }
  static getRandGif (tag) {
    let url = GiphyAPI.createURL(tag)
    return super.request(url, 'GET')
  }
}

export class GoogleAPI extends API {
  static createPlacesURL (text) {
    return `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&types=(cities)&language=pt_EN&key=${GOOGLE}`
  }
  static createGeoURL (text) {
    return `https://maps.googleapis.com/maps/api/geocode/json?address=${text}&sensor=false&key=${GOOGLE}`
  }
  static getCities (text) {
    const URL = this.createPlacesURL(text)
    return super.request(URL, 'GET')
  }
  static getGeolocation (city) {
    const URL = this.createGeoURL(city)
    return super.request(URL, 'GET')
  }
}
