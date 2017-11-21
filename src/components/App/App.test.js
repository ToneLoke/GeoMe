import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import React from 'react'
import ReactDOM from 'react-dom'
import App from './index'
import TopHeader from '../Header'
import SearchBar from '../SearchBar'
import { mount, shallow } from 'enzyme'

test('app renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})

describe('<App />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<App />)
  })
  it('renders a TopHeader component', () => {
    expect(wrapper.find(TopHeader)).exists
  })
  it('renders a SearchBar component', () => {
    expect(wrapper.find(TopHeader)).exists
  })
})
