import React from 'react'
import { TimePicker, Card } from 'antd'
import moment from 'moment'

import fahrenheit from './Fahrenheit.svg'
const disabledHours = () => {
  return [1, 2, 4, 5, 7, 8, 10, 11]
}
const format = 'HH'
const FiveDay = ({day, updateTime}) => {
  let d = moment(day.dt_txt)

  return (
    <Card title={<div>{d.format('MMM DD')}<TimePicker style={{marginLeft: 50}} defaultValue={moment(d, format)} use12Hours format='h A' disabledHours={disabledHours} onChange={updateTime} /></div>} bordered={false} style={{ width: 300, margin: '8px 0' }}>
      <h1>{Math.floor(day.temp)}<sup>˚F</sup></h1>
      <p>{day.description}</p>
    </Card>
  )
}

export default FiveDay
