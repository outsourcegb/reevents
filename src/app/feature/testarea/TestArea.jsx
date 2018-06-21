import React, { Component } from 'react'
import {Button, Icon} from 'semantic-ui-react'
import { connect } from 'react-redux'
//import Script from 'react-load-script'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import GoogleMapReact from 'google-map-react';
//import { incrementCounter, decrementCounter } from './TestActions.js'
import { incrementAsync, decrementAsync } from './TestActions.js'
import {openModal} from './../modals/modalActions'

const mapState = (state) => ({
  data: state.test.data,
  loading: state.test.loading
})

const actions = {
  incrementAsync,
  decrementAsync,
  openModal
}

const Marker = ({ text }) => <Icon name="marker" size="big" color="red" />

class TestArea extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

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
    const {incrementAsync, decrementAsync, openModal,  loading} = this.props
    return (
      <div>
        {/* <Script 
          url='https://maps.googleapis.com/maps/api/js?key=AIzaSyBSy55VZSkRujpbctAVai97eQpI5_LZOmc&libraries=places'
          onLoad={this.handleScriptLoad}
        /> */}
        Test page

        <p>
          The answer is: {this.props.data}
        </p>

        <Button loading={loading} onClick={incrementAsync} color='green' content="Increment" />
        <Button loading={loading} onClick={decrementAsync} color='red' content="Decrement" />
        <Button onClick={() => openModal("TestModal", {data: 43})} color='teal' content="Open Modal" />

        <br /><br /><br />

        <form onSubmit={this.handleFormSubmit}>
          {this.state.scriptLoaded && 
            <PlacesAutocomplete inputProps={inputProps} />}
          <button type="submit">Submit</button>
        </form>

        <br/> <br/> <br/>

        <div style={{ height: '300px', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyBSy55VZSkRujpbctAVai97eQpI5_LZOmc' }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom} >
            <Marker
              lat={59.955413}
              lng={30.337844}
              text={'Kreyser Avrora'} />
          </GoogleMapReact>
        </div>
      </div>
    )
  }
}

export default connect(mapState, actions)(TestArea)