import React, { Component } from 'react'
import { Layout, Col, Row, Tabs } from 'antd'
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
    city: '',
    country: '',
    timeString: '3 PM',
    today: moment().format('dddd'),
    forecast: {
    }
  }
  updateTime = (time, timeString) => {
    this.setState({timeString})
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
      weather.list.map( day => {
        let d = moment(day.dt_txt)
        forecast[`${d.format('dddd')}`][`${d.format('h A')}`] = { ...day.main, ...day.weather[0], dt_txt: day.dt_txt}
      })
      delete forecast[this.state.today]
      this.setState({city,forecast,country})
  }
  createTabs = () => {
    let {forecast} = this.state
    return Object.keys(forecast).map((key, i) => {
                    return (Object.keys(forecast[key]).length === 0 ? null :
                      <TabPane tab={key} key={i} style={{width: '100%', height: '100%'}}>
                        <WeatherDisplay day={forecast[key][this.state.timeString]} times={Object.keys(forecast[key])} updateTime={this.updateTime}/>
                      </TabPane>
                    )
                  })
  }
  getCity = (cityName) => {
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
        <Row>
          <Col span={12} offset={6} >
            <SearchBar getCity={this.getCity}/>
          </Col>
        </Row>
        <Content className='weather'>
          <Tabs
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
