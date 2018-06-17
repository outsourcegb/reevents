import React, { Component } from 'react'
import {Button} from 'semantic-ui-react'
import { connect } from 'react-redux'
import Script from 'react-load-script'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

import { incrementCounter, decrementCounter } from './TestActions.js'

const mapState = (state) => ({
  data: state.test.data
})

const actions = {
  incrementCounter,
  decrementCounter
}

class TestArea extends Component {
  state = {
    address: '',
    scriptLoaded: false
  }

  handleScriptLoad = () => {
    this.setState({
      scriptLoaded: true
    })
  }

  handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }

  onChange = (address) => {
    this.setState({address})
  }
  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }
    const {incrementCounter, decrementCounter} = this.props
    return (
      <div>
        <Script 
          url='https://maps.googleapis.com/maps/api/js?key=AIzaSyBSy55VZSkRujpbctAVai97eQpI5_LZOmc&libraries=places'
          onLoad={this.handleScriptLoad}
        />
        Test page

        <p>
          The answer is: {this.props.data}
        </p>

        <Button onClick={incrementCounter} color='green' content="Increment" />
        <Button onClick={decrementCounter} color='red' content="Decrement" />

        <br /><br /><br />

        <form onSubmit={this.handleFormSubmit}>
          {this.state.scriptLoaded && 
            <PlacesAutocomplete inputProps={inputProps} />}
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default connect(mapState, actions)(TestArea)