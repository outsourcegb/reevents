import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import cuid from 'cuid'
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react'
import {createEvent, updateEvent} from './../eventActions'
import TextInput from './../../../common/form/TextInput'
import TextArea from './../../../common/form/TextArea'
import SelectInput from './../../../common/form/SelectInput'

const category = [
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];

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
  onFormSubmit = (values) => {
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
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color='teal' content='Event details'></Header>
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field name="title" type="text" component={TextInput} placeholder="Give your event a name" />
              <Field
                name="category"
                type="text"
                component={SelectInput}
                options={category}
                placeholder="What is your event about" />
              <Field name="description" type="text" component={TextArea} rows={3} placeholder="Tell us about your event" />
              <Header sub color='teal' content='Event location details'></Header>
              <Field name="city" type="text" component={TextInput} placeholder="Event city" />
              <Field name="venue" type="text" component={TextInput} placeholder="Event venue" />
              <Field name="date" type="text" component={TextInput} placeholder="Event date" />
              <Button positive type="submit">
                Submit
          </Button>
              <Button onClick={this.props.history.goBack} type="button">Cancel</Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

export default  connect(mapState, actions)(reduxForm({form: 'eventForm', enableReinitialize: true})(EventForm))