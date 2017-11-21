import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'
import Weather from './index'
import { mount, shallow } from 'enzyme'

test('weather renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Weather />, div)
})

it('sets the day of the weather component', () => {
  const wrapper = mount(<App />)
  wrapper.setState({ description: 'clear sky', dt_txt: '2017-11-25 15:00:00', icon: '01d', main: 'Clear', temp: 46.35})
  expect(wrapper.find(Weather).first()).toEqual('Clear')
})
