import React, {Component} from 'react'
import { Icon, Button, Input, AutoComplete } from 'antd'
import { GoogleAPI } from './apiAdapter'
import './Search.css'
const Option = AutoComplete.Option;

function renderOption(item) {
  let {main_text} = item.structured_formatting
  return (
    <Option key={item.id} text={main_text}>
      { item.description }
    </Option>
  );
}

class Search extends React.Component {
  state = {
    predictions: [],
    searchCity: ''
  }

  handleSearch = (value) => {
    console.log("WE RUNNING")
    GoogleAPI.getCities(value)
      .then( res => {
        let {predictions} = res
        this.setState({predictions,searchCity: value})
      })
  }
  onSelect = (value, some) =>  {
    let text = some.props.text
    this.props.getCity(text)
    this.setState({searchCity: ''})
  }


  render() {
    const { predictions } = this.state;
    return (
      <div className="global-search-wrapper" style={{ width: 300 }}>
        <AutoComplete
          value={this.state.searchCity}
          className="global-search"
          size="large"
          style={{ width: '100%' }}
          dataSource={predictions.map(renderOption)}
          onSelect={this.onSelect}
          onSearch={this.handleSearch}
          placeholder="Enter a City Name"
          optionLabelProp="text"
        >
        </AutoComplete>
      </div>
    );
  }
}

export default Search
