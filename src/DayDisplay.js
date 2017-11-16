import React, {Component} from 'react'
import { TimePicker, Card, Col } from 'antd'
import moment from 'moment'
import {GiphyAPI} from './apiAdapter'
import './weather-icons.css'

class FiveDay extends Component {
  state={
    format: 'HH',
    gif: ''
  }
  componentWillMount () {
    this.gifChange()
    // setInterval(this.gifChange, 3000)
  }

  gifChange = () => {
    GiphyAPI.getRandGif(this.props.day.main)
      .then( gif => {
        this.setState({gif: gif.data.image_url})
      })
  }
  render () {
    let {day, updateTime} = this.props
    let d = moment(day.dt_txt)
    const cardheading = () => (<div>{d.format('MMM DD - h A')}</div>)
    return (
      <Col span={14} offset={4}>
        <Card style={{ width: 300, margin: '8px 0', background: `url(${this.state.gif})`, zIndex: '0', color: 'white' }} title={cardheading()} bordered={false} >
          <img style={{float: 'left'}} src={`http://openweathermap.org/img/w/${day.icon}.png`} />
          <h1 style={{color: 'white'}}>{Math.floor(day.temp)}<sup>˚F</sup></h1>
          <p>{day.description}</p>
        </Card>
      </Col>
    )
  }
}

export default FiveDay
