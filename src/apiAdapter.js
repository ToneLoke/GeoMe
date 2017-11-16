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
                return reject(new Error(e))
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
  static createURL (endpoint, term, loc) {
    return `http://api.openweathermap.org/data/2.5/${endpoint}?${term}=${loc},us&appid=${WEATHER}&units=imperial`
  }
  static getForecast (term, loc) {
    let url = WeatherAPI.createURL('forecast', term, loc)
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
  static createURL (text) {
    return `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&types=(cities)&language=pt_EN&key=${GOOGLE}`
  }
  static getCities (text) {
    const URL = this.createURL(text)
    return super.request(URL, 'GET')
  }
}
