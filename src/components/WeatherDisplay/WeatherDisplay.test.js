import React from 'react'
import ReactDOM from 'react-dom'
import WeatherDisplay from './index'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

test('Weather display renders the appropiate props', () => {
  const day = { description: 'clear sky', dt_txt: '2017-11-23 00:00:00', icon: '01n', main: 'Clear', temp: 40.73}
  const rendered = renderer.create(
    <WeatherDisplay day={day} />
  )
  expect(rendered.toJSON()).toMatchSnapshot()
})
