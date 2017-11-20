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
    // this.gifChange(this.props.day.main)
  }
  componentWillReceiveProps (nextProps) {
    this.gifChange(nextProps.day.main)
  }
  shouldComponentUpdate(nextProps, nextState){
    return Object.is(this.props.day, nextProps.day)  ? true : false
  }
  gifChange = (text) => {
    GiphyAPI.getRandGif(text)
      .then( gif => {
        window.screen.width < 800 ? this.setState({gif: gif.data.fixed_height_downsampled_url}) : this.setState({gif: gif.data.image_original_url})

      })
  }
  render () {
    let {day, updateTime} = this.props
    let d = moment(day.dt_txt)
    return (
      <div style={{backgroundImage: `url(${this.state.gif})`}} className='weather-display-container'>
        <h1>{d.format('MMM DD')}</h1>
        <img src={`http://openweathermap.org/img/w/${day.icon}.png`} />
        <h1 >{Math.floor(day.temp)}<sup>˚F</sup></h1>
        <h1>{day.description}</h1>
      </div>
    )
  }
}

export default FiveDay
