import React, { Component } from 'react'
import logo from './geomefinal.jpg'
import './App.css'
import { Layout, Menu, Icon, Row } from 'antd'
import FiveDay from './FiveDay'
import moment from 'moment'
const { Header, Content, Footer, Sider } = Layout


const nameOfDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

class App extends Component {
  state ={
    city: '',
    today: nameOfDays[new Date(Date.now()).getDay()],
    currentDay: {},
    fiveDay: {},
    forecast: {
      Monday:{},
      Tuesday:{},
      Wednesday:{},
      Thursday:{},
      Friday:{},
      Saturday:{},
      Sunday:{},
    }
  }
  loadJson = (url) => {
    return fetch(url).then(response => response.json())
  }

  componentWillMount () {
    this.loadJson("http://ipinfo.io/json")
      .then( data =>  this.loadJson(`http://api.openweathermap.org/data/2.5/forecast?zip=${data.postal},us&appid=06c3da063b27db6b0a0cdfdc00c928fb&units=imperial`))
      .then(weather => {
        console.log(weather)
        let city = weather.city.name
        let forecast = {...this.state.forecast}
        weather.list.map( day => {
          let d = moment(day.dt_txt)
          console.log(d.format('dddd'))
          forecast[`${d.format('dddd')}`][`${d.format('h A')}`] = { ...day.main, ...day.weather[0], dt_txt: day.dt_txt}
        })
        let currentDay = {...forecast[this.state.today]}
        let fiveDay = {...forecast}
        delete fiveDay[this.state.today]
        this.setState({city,forecast, currentDay, fiveDay})

      })
      .catch(err => console.log(err))

  }
  render () {
    return (
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <img src={logo} className="logo"/>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 260 }}>
          <Row>
            <FiveDay forecast={this.state.forecast}/>
          </Row>
        </Content>
      </Layout>
    )
  }
}

export default App
