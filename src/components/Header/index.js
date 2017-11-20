import React from 'react'
import { Layout, Icon } from 'antd'
const { Header } = Layout

const TopHeader = ({city, country}) => (
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
    <span id='geo-city'>{city}</span>, <span id='geo-country'>{country}</span>
  </Header>
)

export default TopHeader
