import React from 'react'
import { Col, Card } from 'antd'
import fahrenheit from './Fahrenheit.svg'

const nameOfDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const nameOfMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const FiveDay = ({day}) => {
  let d = new Date(day.dt_txt)
  let time = d.getHours() > 12 ? `${d.getHours() - 12}am` : `${d.getHours()}pm`
  let date_display = `${nameOfDays[d.getDay()]} - ${nameOfMonths[d.getMonth()]} ${d.getDate()} - ${time}`

  return (<Col span={4}>
    <Card title={date_display} bordered={false} style={{ width: 300, margin: '8px 0' }}>
      <h1>{Math.floor(day.main.temp)}</h1><img src={fahrenheit} style={{ width: 50, height: 50}} />
      <p>{day.weather[0].description}</p>
    </Card>
  </Col>)
}

export default FiveDay
