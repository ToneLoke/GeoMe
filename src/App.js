import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { Layout, Menu, Icon, Row } from 'antd'
import FiveDay from './FiveDay'
import CurrentDay from './CurrentDay'
const { Header, Content, Footer, Sider } = Layout

const nameOfDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

class App extends Component {
  state ={
    city: '',
    today: nameOfDays[new Date(Date.now()).getDay()],
    currentDay: {},
    fiveDay: {},
    forecast: {
      monday:{},
      tuesday:{},
      wednesday:{},
      thursday:{},
      friday:{},
      saturday:{},
      sunday:{},
    }
  }
  loadJson = (url) => {
    return fetch(url).then(response => response.json())
  }

  componentWillMount () {
    this.loadJson("http://ipinfo.io/json")
      .then( data =>  this.loadJson(`http://api.openweathermap.org/data/2.5/forecast?lat=${data.loc.substring(0,data.loc.indexOf(','))}&lon=${data.loc.substring(data.loc.indexOf(',') + 1, data.loc.length)}&appid=06c3da063b27db6b0a0cdfdc00c928fb&units=imperial`))
      .then(weather => {
        console.log(weather)
        let city = weather.city.name
        let forecast = this.state.forecast
        weather.list.map( day => {
          let d = new Date(day.dt_txt)
          forecast[`${nameOfDays[d.getDay()]}`][`${d.getHours()}`] = { ...day.main, ...day.weather[0]}
        })
        let currentDay = {...forecast[this.state.today]}
        let fiveDay = {...forecast}
        delete fiveDay[this.state.today]
        this.setState({city,currentDay,fiveDay})

      })
      .catch(err => console.log(err))

  }
  render () {
    return (
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Icon
            className='trigger'
            type={'cloud-o'}
          />
          GeoMe
          <Icon
            className='trigger'
            type={'smile'}
          />
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 260 }}>
          <Row>
            {/* <CurrentDay day={this.state.currentDay} /> */}
          </Row>
          <Row gutter={6}>
            {/* <FiveDay days={this.state.fiveDay} /> */}
          </Row>
        </Content>
      </Layout>
    )
  }
}

export default App
