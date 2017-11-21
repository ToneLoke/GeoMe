import React, {Component} from 'react'
import { Icon, Button, Input, AutoComplete } from 'antd'
import { GoogleAPI } from '../../apiAdapter'
import './Search.css'
const {Option} = AutoComplete

function renderOption(item) {
  return (
    <Option key={item.description} text={item.description}>
      { item.description }
    </Option>
  )
}

class Search extends React.Component {
  state = {
    predictions: [],
    address: '',
    geocodeResults: null,
    loading: false

  }

  handleSearch = (value) => {
    GoogleAPI.getCities(value)
      .then( res => {
        let {predictions} = res
        this.setState({predictions,searchCity: value})
      })
  }
  onSelect = (value) =>  {
    let text = encodeURI(value.split(', ').join(','))
    this.props.getCity(text)
    this.setState({searchCity: ''})
  }
  render() {
    const { predictions } = this.state
    return (
      <div className="global-search-wrapper">
        <AutoComplete
          value={this.state.searchCity}
          className="global-search"
          size="large"
          dataSource={predictions.map(renderOption)}
          onSelect={this.onSelect}
          onSearch={this.handleSearch}
          placeholder="Enter a City Name"
          optionLabelProp="text"
        >
        </AutoComplete>
      </div>
    )
  }
}


export default Search
