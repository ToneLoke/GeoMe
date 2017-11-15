import React, { Component } from 'react'
import logo from './geoLogo.png'
import { Layout, Menu, Icon,Col, Row, Tabs, Radio, TimePicker  } from 'antd'
import moment from 'moment'
import DayDisplay from './DayDisplay'
import {CityAPI, WeatherAPI} from './apiAdapter'
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
      <Layout style={{backgroundColor: 'rgba(200,200,200,0.3)', zIndex: '2', paddingTop: '22px', position: 'fixed', marginLeft: '50%', top: '50%', transform: 'translateX(-50%) translateY(-50%)'}}>
        <Header style={{ fontFamily: 'helvetica', color: 'black', width: '525px', background: '#fff', padding: 0, textAlign: 'center', paddingRight: '18px', margin: '0 auto' }}>
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
        <Content style={{ textAlign: 'center', width: '525px', margin: '24px 16px', padding: 24, background: '#fff', minHeight: 260 }}>
          <Row>
            <Col span={24} >
              <Tabs
                defaultActiveKey='0'
                tabPosition='top'
                style={{ height: '50%' }}
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
