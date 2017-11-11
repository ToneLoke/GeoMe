import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { Layout, Menu, Icon, Row } from 'antd'
import SimpleForecast from './simpleForecast'
const { Header, Content, Footer, Sider } = Layout

class App extends Component {
  state ={
    city: '',
    currentDay: {},
    forecast: []
  }

  componentWillMount () {
    console.log('fire')
    fetch('http://api.openweathermap.org/data/2.5/forecast?q=NewYork,us&appid=06c3da063b27db6b0a0cdfdc00c928fb&units=imperial')
    .then(res => res.json())
    .then(weather => {
      console.log(weather)
      let city = weather.city.name
      let currentDay = weather.list[0]
      let forecast = weather.list
      this.setState({city,currentDay, forecast})

    })
    .catch(err => console.log(err))
  }
  weatherBoxes(){
    return this.state.forecast.map( day => <SimpleForecast day={day} />)
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
          <div style={{ background: '#ECECEC', padding: '30px' }}>
            <Row gutter={5}>
              { this.state.forecast.length > 0 ? this.weatherBoxes() : null}
            </Row>
          </div>
        </Content>
      </Layout>
    )
  }
}

export default App
