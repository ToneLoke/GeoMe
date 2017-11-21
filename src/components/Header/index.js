import React from 'react'
import { Icon } from 'antd'

const TopHeader = ({city, country}) => (
  <div >
    <span className='logocity'>GeoMe</span>
    <Icon
      className='trigger'
      type={'cloud-o'}
    />
    <span className='logocity' id='geo-city'>{city}, {country}</span>
  </div>
)

export default TopHeader
