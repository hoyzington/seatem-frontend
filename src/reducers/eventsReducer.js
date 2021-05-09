import { v4 as uuidv4 } from 'uuid'

function eventsReducer(state = {
    user: null,
    events: [],
    currentEvent: {
      id: '',
      name: '',
      table: '',
      chairs: [],
      guests: [],
    },
    selectedGuest: null,
  }, action) {

  let eventIdx, chairIdx, guestIdx, event, currentEvent, updatedEvent, chairId, guest

  switch (action.type) {
    case 'ADD_EVENT':
      let newEvent = { ...action.event, id: uuidv4() }
      return {
        ...state,
        events: [
          ...state.events,
          newEvent,
        ],
        currentEvent: newEvent,
      }

    case 'REMOVE_EVENT':
      eventIdx = state.events.findIndex(event => event.id === action.id)
      // ADDRESS currentEvent !!
      return {
        ...state,
        events: [
          ...state.events.slice(0, eventIdx),
          ...state.events.slice(eventIdx + 1),
        ],
      }

    case 'ADD_GUEST':
      let newGuest = {
        id: uuidv4(),
        firstName: action.guest.first,
        midName: action.guest.mid,
        lastName: action.guest.last,
        seated: false,
      }
      eventIdx = state.events.findIndex(event => event.id === state.currentEvent.id)
      event = state.events[eventIdx]
      updatedEvent = {
        ...event,
        guests: [...event.guests, newGuest],
      }
      if (updatedEvent.guests.length > 4) {
        updatedEvent = {
          ...updatedEvent,
          chairs: [...updatedEvent.chairs, ''],
        }
      }
      return {
        ...state,
        events: [
          ...state.events.slice(0, eventIdx),
          updatedEvent,
          ...state.events.slice(eventIdx + 1),
        ],
        currentEvent: updatedEvent,
      }

    case 'SELECT_GUEST':
      currentEvent = state.currentEvent
      guest = currentEvent.guests.find(guest => guest.id === action.id) || currentEvent.chairs.find(chair => chair.id === action.id)
      return {
        ...state,
        selectedGuest: guest,
      }

    case 'SEAT_GUEST':
      chairId = parseInt(action.chairId)
      eventIdx = state.events.findIndex(event => event.id === state.currentEvent.id)
      event = state.events[eventIdx]
      guestIdx = event.guests.findIndex(guest => guest.id === action.guest.id)
      guest = { ...action.guest, seated: true }
      if (guestIdx >= 0) {
        updatedEvent = {
          ...event,
          guests: [
            ...event.guests.slice(0, guestIdx),
            ...event.guests.slice(guestIdx + 1),
          ],
          chairs: [
            ...event.chairs.slice(0, chairId),
            guest,
            ...event.chairs.slice(chairId + 1),
          ],
        }
      } else {
        chairIdx = event.chairs.findIndex(chair => chair === action.guest)
        event = {
          ...event,
          chairs: [
            ...event.chairs.slice(0, chairIdx),
            '',
            ...event.chairs.slice(chairIdx + 1),
          ],
        }
        updatedEvent = {
          ...event,
          chairs: [
            ...event.chairs.slice(0, chairId),
            guest,
            ...event.chairs.slice(chairId + 1),
          ],
        }
      }
      return {
        ...state,
        events: [
          ...state.events.slice(0, eventIdx),
          updatedEvent,
          ...state.events.slice(eventIdx + 1),
        ],
        currentEvent: updatedEvent,
        selectedGuest: null,
      }

    case 'UNSEAT_GUEST':
      chairId = parseInt(action.chairId)
      eventIdx = state.events.findIndex(event => event.id === state.currentEvent.id)
      event = state.events[eventIdx]
      chairIdx = event.chairs.findIndex(chair => chair === action.guest)
      guest = { ...action.guest, seated: false }
      updatedEvent = {
        ...event,
        chairs: [
          ...event.chairs.slice(0, chairIdx),
          '',
          ...event.chairs.slice(chairIdx + 1),
        ],
        guests: [
          ...event.guests,
          guest,
        ],
      }
      return {
        ...state,
        events: [
          ...state.events.slice(0, eventIdx),
          updatedEvent,
          ...state.events.slice(eventIdx + 1),
        ],
        currentEvent: updatedEvent,
        selectedGuest: null,
      }

    case 'DELETE_GUEST':
      eventIdx = state.events.findIndex(event => event.id === state.currentEvent.id)
      event = state.events[eventIdx]
      guestIdx = event.guests.findIndex(guest => guest.id === action.guest.id)
      updatedEvent = {
        ...event,
        guests: [
          ...event.guests.slice(0, guestIdx),
          ...event.guests.slice(guestIdx + 1),
        ],
      }
      if (action.guest.seated) {
        chairIdx = event.chairs.findIndex(chair => chair === action.guest)
        updatedEvent = {
          ...updatedEvent,
          chairs: [
            ...updatedEvent.chairs.slice(0, chairIdx),
            '',
            ...updatedEvent.chairs.slice(chairIdx + 1),
          ],
        }
      }
      return {
        ...state,
        events: [
          ...state.events.slice(0, eventIdx),
          updatedEvent,
          ...state.events.slice(eventIdx + 1),
        ],
        currentEvent: updatedEvent,
        selectedGuest: null,
      }

    default:
      return state
  }
}

export default eventsReducer
