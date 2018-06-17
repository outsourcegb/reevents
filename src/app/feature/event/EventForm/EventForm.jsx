/* global google */

import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import {composeValidators, combineValidators, isRequired, hasLengthGreaterThan} from 'revalidate'
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import Script from 'react-load-script'
import cuid from 'cuid'
import moment from 'moment'
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react'
import {createEvent, updateEvent} from './../eventActions'
import TextInput from './../../../common/form/TextInput'
import TextArea from './../../../common/form/TextArea'
import SelectInput from './../../../common/form/SelectInput'
import DateInput from './../../../common/form/DateInput'
import PlacesInput from './../../../common/form/PlacesInput'

const category = [
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];

const validate = combineValidators({
  title: isRequired({message: 'The event title is required'}),
  category: isRequired({message: 'Please provide category'}),
  description: composeValidators(
    isRequired({message: 'Description is required'}),
    hasLengthGreaterThan(4)({message: 'Description needs to be at least 5 characters'})
  )(),
  city: isRequired('City'),
  venue: isRequired('Venue'),
  date: isRequired('Date')
})

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id

  let event = {}

  if(state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0]
  }

  return {
    initialValues: event
  }
}

const actions = {
  createEvent,
  updateEvent
}

class EventForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false
  }

  handleScriptLoad = () => {
    this.setState({
      scriptLoaded: true
    })
  }

  handleCitySelect = (selectedCity) => {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          cityLatLng: latlng
        })
      })
      .then(() => {
        this.props.change('city', selectedCity)
      })
  }

  handleVenueSelect = (selectedVenue) => {
    geocodeByAddress(selectedVenue)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          venueLatLng: latlng
        })
      })
      .then(() => {
        this.props.change('venue', selectedVenue)
      })
  }

  onFormSubmit = (values) => {
    values.date = moment(values.date).format()
    values.venueLatLng = this.state.venueLatLng
    
    if (this.props.initialValues && this.props.initialValues.id) {
      this.props.updateEvent(values)
      this.props.history.goBack()
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: '/assets/user.png',
        hostedBy: 'Bob',
        attendees: []
      }
      this.props.createEvent(newEvent)
      this.props.history.push('/events')
    }
  }

  render() {
    const {invalid, submitting, pristine} = this.props
    return (
      <Grid>
        <Script
          url='https://maps.googleapis.com/maps/api/js?key=AIzaSyBSy55VZSkRujpbctAVai97eQpI5_LZOmc&libraries=places'
          onLoad={this.handleScriptLoad}
        />
        <Grid.Column width={10}>
          <Segment>
            <Header sub color='teal' content='Event details'></Header>
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field
                name="title"
                type="text"
                component={TextInput}
                placeholder="Give your event a name" />

              <Field
                name="category"
                type="text"
                component={SelectInput}
                options={category}
                placeholder="What is your event about" />

              <Field
                name="description"
                type="text"
                component={TextArea}
                rows={3}
                placeholder="Tell us about your event" />

              <Header sub color='teal' content='Event location details'></Header>
              
              <Field
                name="city"
                type="text"
                component={PlacesInput}
                options={{types: ['(cities)']}}
                onSelect={this.handleCitySelect}
                placeholder="Event city" />

              {this.state.scriptLoaded && 
                <Field
                  name="venue"
                  type="text"
                  component={PlacesInput}
                  options={{ 
                    location: new google.maps.LatLng(this.state.cityLatLng),
                    radius: 1000,
                    types: ['establishment'] }}
                    placeholder="Event venue"
                onSelect={this.handleVenueSelect} />}

              <Field
                name="date"
                type="text"
                component={DateInput}
                dateFormat='YYYY-MM-DD HH:mm'
                timeFormat='HH:mm'
                showTimeSelect
                placeholder="Date and time of the event" />

              <Button
                disabled={invalid || submitting || pristine}
                positive
                type="submit">Submit</Button>
              <Button onClick={this.props.history.goBack} type="button">Cancel</Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

export default  connect(mapState, actions)(reduxForm({form: 'eventForm', enableReinitialize: true, validate})(EventForm))