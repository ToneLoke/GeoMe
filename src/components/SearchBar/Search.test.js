import React from 'react'
import ReactDOM from 'react-dom'
import SearchBar from './index'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

test('Search bar calls get city when selected', () => {
  const getCity = jest.fn()
  const wrapper = mount(
    <SearchBar getCity={getCity} />
  )
  const p = wrapper.find('.ant-select-dropdown-menu-root')
  p.simulate('change')
  expect(getCity).toHaveBeenCalled()
})
