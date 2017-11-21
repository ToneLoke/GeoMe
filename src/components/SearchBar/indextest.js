import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import './Search.css'

class Demo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      address: '',
      geocodeResults: null,
      loading: false
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.renderGeocodeFailure = this.renderGeocodeFailure.bind(this)
    this.renderGeocodeSuccess = this.renderGeocodeSuccess.bind(this)
  }

  handleSelect (address) {
    this.setState({
      address,
      loading: true
    })

    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log('Success Yay', { lat, lng })
        this.props.getWeather(lat, lng)
        this.setState({
          geocodeResults: this.renderGeocodeSuccess(lat, lng),
          loading: false
        })
      })
      .catch((error) => {
        console.log('Oh no!', error)
        this.setState({
          geocodeResults: this.renderGeocodeFailure(error),
          loading: false
        })
      })
  }
  handleChange (address) {
    this.setState({
      address,
      geocodeResults: null
    })
  }

  renderGeocodeFailure (err) {
    return (
      <div className='alert alert-danger' role='alert'>
        <strong>Error!</strong> {err}
      </div>
    )
  }

  renderGeocodeSuccess (lat, lng) {
    return (
      <div className='alert alert-success' role='alert'>
        <strong>Success!</strong> Geocoder found latitude and longitude: <strong>{lat}, {lng}</strong>
      </div>
    )
  }

  render () {
    const cssClasses = {
      root: 'form-group',
      input: 'Demo__search-input',
      autocompleteContainer: 'Demo__autocomplete-container'
    }

    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div className='Demo__suggestion-item'>
        <i className='fa fa-map-marker Demo__suggestion-icon' />
        <strong>{formattedSuggestion.mainText}</strong>{' '}
        <small className='text-muted'>{formattedSuggestion.secondaryText}</small>
      </div>)

    const inputProps = {
      type: 'text',
      value: this.state.address,
      onChange: this.handleChange,
      onBlur: () => { console.log('Blur event!') },
      onFocus: () => { console.log('Focused!') },
      autoFocus: true,
      placeholder: 'Search Places',
      name: 'Demo__input',
      id: 'my-input-id'
    }

    return (
      <div className='container'>
        <PlacesAutocomplete
          onSelect={this.handleSelect}
          autocompleteItem={AutocompleteItem}
          onEnterKeyDown={this.handleSelect}
          classNames={cssClasses}
          inputProps={inputProps}
          />
        {this.state.loading ? <div><i className='fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner' /></div> : null}
        {!this.state.loading && this.state.geocodeResults ?
          <div className='geocoding-results'>{this.state.geocodeResults}</div> :
          null}
      </div>
    )
  }
}

export default Demo
