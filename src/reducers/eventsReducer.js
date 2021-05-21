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
      guestQty: '0',
      descriptions: [],
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
        neighbors: [],
        preferences: {
          guestsYes: [],
          guestsNo: [],
          descriptionsYes: [],
          descriptionsNo: [],
        },
        traits: [],
        seated: false,
        happy: true,
      }
      eventIdx = state.events.findIndex(event => event.id === state.currentEvent.id)
      event = state.events[eventIdx]
      updatedEvent = {
        ...event,
        guests: [...event.guests, newGuest],
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

    case 'UPDATE_GUEST':
      eventIdx = state.events.findIndex(event => event.id === state.currentEvent.id)
      event = state.events[eventIdx]
      guestIdx = event.guests.findIndex(guest => guest.id === action.guest.id)
      updatedEvent = {
        ...event,
        guests: [
          ...event.guests.slice(0, guestIdx),
          action.guest,
          ...event.guests.slice(guestIdx + 1),
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
        selectedGuest: action.guest,
      }

      case 'UPDATE_DESCRIPTIONS':
        eventIdx = state.events.findIndex(event => event.id === state.currentEvent.id)
        event = state.events[eventIdx]
        guestIdx = event.guests.findIndex(guest => guest.id === action.guest.id)
        updatedEvent = {
          ...event,
          guests: [
            ...event.guests.slice(0, guestIdx),
            action.guest,
            ...event.guests.slice(guestIdx + 1),
          ],
          descriptions: action.descriptions,
        }
        return {
          ...state,
          events: [
            ...state.events.slice(0, eventIdx),
            updatedEvent,
            ...state.events.slice(eventIdx + 1),
          ],
          currentEvent: updatedEvent,
          selectedGuest: action.guest,
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
      guest = {
        ...action.guest,
        seated: true,
      }
      if (guestIdx >= 0) {
        updatedEvent = {
          ...event,
          guests: [
            ...event.guests.slice(0, guestIdx),
            guest,
            ...event.guests.slice(guestIdx + 1),
          ],
          chairs: [
            ...event.chairs.slice(0, chairId),
            guest.id,
            ...event.chairs.slice(chairId + 1),
          ],
        }
      } else {
        chairIdx = event.chairs.findIndex(chair => chair === action.guest.id)
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
            guest.id,
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
      guestIdx = event.guests.findIndex(guest => guest.id === action.guest.id)
      chairIdx = event.chairs.findIndex(chair => chair === action.guest.id)
      guest = { ...action.guest, neighbors: [], seated: false }
      updatedEvent = {
        ...event,
        chairs: [
          ...event.chairs.slice(0, chairIdx),
          '',
          ...event.chairs.slice(chairIdx + 1),
        ],
        guests: [
          ...event.guests.slice(0, guestIdx),
          guest,
          ...event.guests.slice(guestIdx + 1),
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
        chairIdx = event.chairs.findIndex(chair => chair === action.guest.id)
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

    case 'UPDATE_NEIGHBORS':
      eventIdx = state.events.findIndex(event => event.id === state.currentEvent.id)
      event = state.events[eventIdx]
      const chairs = event.chairs
      const guests = event.guests.map((guest) => {
        if (guest.seated) {
          let newNeighbors
          const chairIdx = chairs.findIndex(chair => chair === guest.id)
          const last = chairs.length - 1
          switch (chairIdx) {
            case 0:
              newNeighbors = [
                chairs[last],
                chairs[1],
              ]
              break
            case last:
              newNeighbors = [
                chairs[last - 1],
                chairs[0],
              ]
              break
            default:
              newNeighbors = [
                chairs[chairIdx - 1],
                chairs[chairIdx + 1],
              ]
          }
          return { ...guest, neighbors: newNeighbors }
        }
        return guest
      })
      updatedEvent = { ...event, guests: guests }
      return {
        ...state,
        events: [
          ...state.events.slice(0, eventIdx),
          updatedEvent,
          ...state.events.slice(eventIdx + 1),
        ],
        currentEvent: updatedEvent,
      }

    default:
      return state
  }
}

export default eventsReducer
