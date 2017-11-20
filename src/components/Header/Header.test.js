import React from 'react'
import ReactDOM from 'react-dom'
import Header from './index'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

test('top header renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Header />, div)
})

test('to header renders with the correct city name', () => {
  const city = 'Denver'
  const country = 'US'
  const rendered = renderer.create(
    <Header city={city} country={country} />
  )
  expect(rendered.toJSON()).toMatchSnapshot()
})
