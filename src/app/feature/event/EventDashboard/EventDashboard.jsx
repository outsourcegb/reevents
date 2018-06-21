import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EventList from './../EventList/EventList';
import {deleteEvent} from './../eventActions';
import LoadingComponent from './../../../layout/LoadingComponent'

const mapState = (state) => ({
  events: state.events,
  loading: state.async.loading
})

const actions = {
  deleteEvent
}

class EventDashboard extends Component {
  handleDelete = (eventID) => () => {
    this.props.deleteEvent(eventID)
  }

  render() {
    const {events, loading} = this.props
    if(loading) return <LoadingComponent />
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList 
            deleteEvent={this.handleDelete}
            events={events} />
        </Grid.Column>
        <Grid.Column width={6}>
         
        </Grid.Column>
      </Grid>
    )
  }
}

export default connect(mapState, actions)(EventDashboard)