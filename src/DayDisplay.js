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
    setInterval(this.gifChange, 3000)
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
    return (
      <div style={{ width: '100%', height: '100%' , backgroundSize: 'auto' ,backgroundImage: `url(${this.state.gif})`, backgroundRepeat: 'no-repeat', color: 'white' }}>
        <div>{d.format('MMM DD - h A')}</div>
        <img style={{float: 'left'}} src={`http://openweathermap.org/img/w/${day.icon}.png`} />
        <h1 style={{color: 'white'}}>{Math.floor(day.temp)}<sup>˚F</sup></h1>
        <p>{day.description}</p>
      </div>
    )
  }
}

export default FiveDay
