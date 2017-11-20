import React, {Component} from 'react'
import { Col } from 'antd'
import moment from 'moment'
import {GiphyAPI} from '../../apiAdapter'
import './Weather.css'

class FiveDay extends Component {
  state={
    gif: ''
  }
  componentWillMount () {
    this.gifChange()
  }

  gifChange = () => {
    GiphyAPI.getRandGif(this.props.day.main)
      .then( gif => {
        window.screen.width < 800 ? this.setState({gif: gif.data.fixed_height_downsampled_url}) : this.setState({gif: gif.data.image_original_url})

      })
  }
  render () {
    let {day, updateTime} = this.props
    let d = moment(day.dt_txt)
    return (
      <div style={{backgroundImage: `url(${this.state.gif})`}} className='weather-display-container'>
        <div>{d.format('MMM DD')}</div>
        <img src={`http://openweathermap.org/img/w/${day.icon}.png`} />
        <h1 >{Math.floor(day.temp)}<sup>˚F</sup></h1>
        <p>{day.description}</p>
      </div>
    )
  }
}

export default FiveDay
