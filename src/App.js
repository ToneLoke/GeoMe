import React, { Component } from 'react'
import logo from './geoLogo.png'
import { Layout, Menu, Icon,Col, Row, Tabs, Radio, TimePicker  } from 'antd'
import moment from 'moment'
import DayDisplay from './DayDisplay'
import {CityAPI, WeatherAPI} from './apiAdapter'
import Search from './Search'
import './App.css'
const {TabPane} = Tabs
const { Header, Content, Footer, Sider } = Layout


class App extends Component {
  state ={
    city: '',
    timeString: '9 AM',
    activeKey: '',
    today: moment().format('dddd'),
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
  updateTime = (time, timeString) => {
    this.setState({timeString})
  }
  setForecast = weather => {
      let city = weather.city.name
      let forecast = {...this.state.forecast}
      weather.list.map( day => {
        let d = moment(day.dt_txt)
        forecast[`${d.format('dddd')}`][`${d.format('h A')}`] = { ...day.main, ...day.weather[0], dt_txt: day.dt_txt}
      })
      delete forecast[this.state.today]
      this.setState({city,forecast})
  }
  createTabs = () => {
    let {forecast} = this.state
    return Object.keys(forecast).map((key, i) => {
                    return (Object.keys(forecast[key]).length === 0 ? null :
                      <TabPane tab={key} key={i}>
                        <DayDisplay day={forecast[key][this.state.timeString]} times={Object.keys(forecast[key])} updateTime={this.updateTime}/>
                      </TabPane>
                    )
                  })
  }
  componentWillMount () {
    CityAPI.get()
      .then( data => WeatherAPI.getForecast('zip', data.postal) )
      .then(this.setForecast)
      .catch(err => console.log(err))
  }
  render () {
    return (
      <Layout className='main'>
        <Header className='title'>
          <Icon
            className='trigger'
            type={'cloud-o'}
          />
          GeoMe
          <Icon
            className='trigger'
            type={'smile'}
          />
          {this.state.city}
        </Header>
        <Row>
          <Col span={12} offset={6} >
            <Search/>
          </Col>
        </Row>
        <Content className='weather'>
          <Row>
            <Col span={24} >
              <Tabs
                defaultActiveKey='0'
                tabPosition='top'
              >
                {this.createTabs()}
              </Tabs>
            </Col>
          </Row>
        </Content>
      </Layout>
    )
  }
}

export default App
