import {CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENT} from './eventConstants'
import {asyncActionStart, asyncActionFinish, asyncActionError} from './../async/asyncActions'
import { fetchSampleData } from './../../data/mockApi.js'

export const createEvent = (event) => {
  return {
    type: CREATE_EVENT,
    payload: {
      event
    }
  }
}

export const updateEvent = (event) => {
  return {
    type: UPDATE_EVENT,
    payload: {
      event
    }
  }
}

export const deleteEvent = (eventId) => {
  return {
    type: DELETE_EVENT,
    payload: {
      eventId
    }
  }
}

export const fetchEvent = (events) => {
  return {
    type: FETCH_EVENT,
    payload: {
      events
    }
  }
}

export const loadEvents = () => {
  return async disptach => {
    try{
      disptach(asyncActionStart())
      let events = await fetchSampleData()
      console.log(events)
      disptach(fetchEvent(events))
      disptach(asyncActionFinish())
    } catch (error) {
      console.log(error)
      disptach(asyncActionError())
    }
  }
}