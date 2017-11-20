import React from 'react'
import ReactDOM from 'react-dom'
import Header from './index'
import { mount } from 'enzyme'

test('top header renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Header />, div)
})
