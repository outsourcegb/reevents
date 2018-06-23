import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Segment, Item, List, Button, Icon } from 'semantic-ui-react'
import EventListAttendee from './EventListAttendee'
import format from 'date-fns/format'

class EventListItem extends Component {
  render() {
    const {event, deleteEvent} = this.props;
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={event.hostPhotoURL} />
              <Item.Content>
                <Item.Header as="a">{event.title}</Item.Header>
                <Item.Description>
                  Hosted by <a>{event.hostedBy}</a>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" /> {format(event.date.toDate(),'dddd Do MMMM')} at {' '} {format(event.date.toDate(),'HH:mm')} |
            <Icon name="marker" /> {event.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {
              event.attendees &&
              Object.values(event.attendees).map(
                (attendee, index) => (
                  <EventListAttendee key={index} attendee={attendee} />
                )
              )
            }
          </List>
        </Segment>
        <Segment clearing>
          <p>{event.description}</p>
          <p>
            <Button as="a" color="red" floated="right" content="Delete" onClick={deleteEvent(event.id)} />
            <Button as={Link} to={`/events/${event.id}`} floated="right" color="blue" content="View" />
          </p>
        </Segment>
      </Segment.Group>
    )
  }
}

export default EventListItem;