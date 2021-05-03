import { v4 as uuidv4 } from 'uuid'

function eventsReducer(state = {
    user: null,
    events: [],
    currentEvent: { name: '', table: '', guests: [] }
  }, action) {

  let idx

  switch (action.type) {
    case 'ADD_EVENT':
      let newEvent = { ...action.event, id: uuidv4() }
      return { ...state, events: [...state.events, newEvent], currentEvent: newEvent }

    case 'REMOVE_EVENT':
      idx = state.events.findIndex(event => event.id === action.id)
      // ADDRESS currentEvent !!
      return { ...state, events: [
        ...state.events.slice(0, idx),
        ...state.events.slice(idx + 1)
      ] }

    // case 'ADD_NAME':
    //   return {
    //     ...state,
    //     name: action.name
    //   }

    // case 'ADD_TABLE':
    //   return {
    //     ...state,
    //     table: action.table
    //   }

    case 'ADD_GUEST':
      idx = state.events.findIndex(event => event.id === state.currentEvent.id)
      let newGuest = { name: action.name, id: uuidv4() }
      let updatedEvent = state.events[idx]
      updatedEvent = { ...updatedEvent, guests: [...updatedEvent.guests, newGuest]}
      return {
        ...state,
        events: [
          ...state.events.slice(0, idx),
          updatedEvent,
          ...state.events.slice(idx + 1)
        ],
        currentEvent: updatedEvent
      }

    // case 'REMOVE_GUEST':
    //   idx = state.guests.findIndex(guest => guest.id === action.id)
    //   return {
    //     ...state,
    //     guests: [
    //       ...state.guests.slice(0, idx),
    //       ...state.guests.slice(idx + 1)
    //     ]
    //   }

    default:
      return state
  }
}

export default eventsReducer
