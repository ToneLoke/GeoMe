import React, { Component } from 'react'
import { Layout, Col, Row, Tabs, Spin} from 'antd'
import moment from 'moment'
import {CityAPI, WeatherAPI, GoogleAPI} from '../../apiAdapter'
import WeatherDisplay from '../WeatherDisplay'
import SearchBar from '../SearchBar'
import TopHeader from '../Header'
import './App.css'
const { TabPane } = Tabs
const { Content } = Layout

class App extends Component {
  state ={
    loading: true,
    city: '',
    country: '',
    timeString: '3 PM',
    today: moment().format('dddd'),
    forecast: {
    }
  }
  setForecast = weather => {
      let city = weather.city.name
      let country = weather.city.country
      let forecast = {
        Monday:{},
        Tuesday:{},
        Wednesday:{},
        Thursday:{},
        Friday:{},
        Saturday:{},
        Sunday:{},
      }
      //create forecast object with times as property
      weather.list.map( day => {
        let d = moment(day.dt_txt)
        forecast[`${d.format('dddd')}`][`${d.format('h A')}`] = {  temp: day.main.temp, ...day.weather[0], dt_txt: day.dt_txt}
      })
      delete forecast[this.state.today]
      this.setState({city,forecast,country, loading: false})
  }
  createTabs = () => {
    let {forecast} = this.state
    return Object.keys(forecast).map((key, i) => {
                    return (Object.keys(forecast[key]).length === 0 ? null :
                      <TabPane tab={key} key={i}>
                        <WeatherDisplay day={forecast[key][this.state.timeString]} />
                      </TabPane>
                    )
                  })
  }
  getCity = (cityName) => {
    this.setState({loading: true})
    GoogleAPI.getGeolocation(cityName)
    .then( geo => {
      console.log(geo)
      let {lat , lng} = geo.results[0].geometry.location
      return WeatherAPI.getForecast(lat, lng)
    })
    .then(this.setForecast)
    .catch( err => console.log(err))
  }
  componentWillMount () {
    // get users location based off of the browser ip
    CityAPI.get()
      .then( data => {
        let geolocation = data.loc.split(',')
        return WeatherAPI.getForecast(geolocation[0], geolocation[1])
      })
      .then(this.setForecast)
      .catch(err => console.log(err))
  }
  render () {
    return (
      <Layout className='main'>
        <TopHeader city={this.state.city} country={this.state.country}/>
        <SearchBar getCity={this.getCity}/>
        { this.state.loading ? <Spin style={{backgroundColor: 'white'}} size="large" /> : null }
        <Content className='weather'>
          <Tabs
            id='weatherIcon'
            defaultActiveKey='0'
            tabPosition='top'
          >
            {this.createTabs()}
          </Tabs>
        </Content>
      </Layout>
    )
  }
}

export default App
