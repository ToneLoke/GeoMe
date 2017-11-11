import React from 'react'
import { Col, Card } from 'antd'

const Simple = ({day}) => {
  console.log(day)
  let d = new Date(day.dt).toString()
  return (<Col span={8}>
    <Card title={d} bordered={false} style={{ width: 300 }}>
      <p>{day.main.temp}</p>
      <p>{day.weather[0].description}</p>
    </Card>
  </Col>)
}

export default Simple
