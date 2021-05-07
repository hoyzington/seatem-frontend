import { v4 as uuidv4 } from 'uuid'

function eventsReducer(state = {
    user: null,
    events: [],
    currentEvent: { id: '', name: '', table: '', chairs: [], guests: [] },
    selectedGuest: null
  }, action) {

  let idx, updatedEvent, event

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

    case 'ADD_GUEST':
      idx = state.events.findIndex(event => event.id === state.currentEvent.id)
      let newGuest = { id: uuidv4(), name: action.name }
      event = state.events[idx]
      if (event.guests.length > 4) {
        event = { ...event, guests: [...event.guests, newGuest], chairs: [...event.chairs, ''] }
      } else {
        event = { ...event, guests: [...event.guests, newGuest] }
      }
      return {
        ...state,
        events: [
          ...state.events.slice(0, idx),
          event,
          ...state.events.slice(idx + 1)
        ],
        currentEvent: event
      }

      case 'SELECT_GUEST':
        const guest = state.currentEvent.guests.find(guest => guest.id === action.id) || state.currentEvent.chairs.find(chair => chair.id === action.id)
        return {
          ...state,
          selectedGuest: guest
        }

      case 'SEAT_GUEST':
        const eventIdx = state.events.findIndex(event => event.id === state.currentEvent.id)
        const guestIdx = event.guests.findIndex(guest => guest.id === state.selectedGuest.id)
        const chairId = parseInt(action.chairId)
        event = state.events[eventIdx]

        if (guestIdx >= 0) {
          updatedEvent = {
            ...event,
            guests: [
              ...event.guests.slice(0, guestIdx),
              ...event.guests.slice(guestIdx + 1)
            ],
            chairs: [
              ...event.chairs.slice(0, chairId),
              state.selectedGuest,
              ...event.chairs.slice(chairId + 1)
            ]
          }
        } else if (chairId >= 0) {
          const chairIdx = event.chairs.findIndex(chair => chair.id === state.selectedGuest.id)
          event = {
            ...event,
            chairs: [
              ...event.chairs.slice(0, chairIdx),
              '',
              ...event.chairs.slice(chairIdx + 1)
            ]
          }
          updatedEvent = {
            ...event,
            chairs: [
              ...event.chairs.slice(0, chairId),
              state.selectedGuest,
              ...event.chairs.slice(chairId + 1)
            ]
          }
        }

        return {
          ...state,
          events: [
            ...state.events.slice(0, eventIdx),
            updatedEvent,
            ...state.events.slice(eventIdx + 1)
          ],
          currentEvent: updatedEvent,
          selectedGuest: null
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
