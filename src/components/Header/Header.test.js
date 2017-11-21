import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'
import TopHeader from './index'
import SearchBar from '../SearchBar'
import { mount, shallow } from 'enzyme'

test('top header renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<TopHeader />, div)
})

it('sets the country prop of the topheader component', () => {
  const wrapper = mount(<App />)
  wrapper.setState({ country: 'US' })
  expect(wrapper.find(TopHeader).props().country).toEqual('US')
})
