const checkForIssues = (thisGuest, guests) => {
  const { guestsYes, guestsNo, descriptionsYes, descriptionsNo } = thisGuest
  const nbrIds = thisGuest.neighbors
  const neighbors = nbrIds.map(nbrId => guests.find(guest => guest.id.toString() === nbrId))

  const makeInitials = (guest) => {
    return [
      guest.firstName[0],
      guest.middleName[0],
      guest.lastName[0],
    ].join('')
  }

  const thisGuestInitials = makeInitials(thisGuest)

  const missingNeighbors = () => {
    if (guestsYes.length > 0) {
      let issues = []
      guestsYes.forEach((guestId) => {
        if (nbrIds.length === 0 || !(nbrIds.find(id => id === guestId))) {
          const missingNeighbor = guests.find(guest => guest.id.toString() === guestId)
          issues.push(`${makeInitials(missingNeighbor)} should sit next to ${thisGuestInitials}`)
        }
      })
      return issues
    }
    return []
  }

  const wrongNeighbors = () => {
    if (guestsNo.length > 0 && nbrIds.length > 0) {
      let issues = []
      guestsNo.forEach((guestId) => {
        const wrongNeighbor = nbrIds.find(nbr => nbr.id === guestId)
        if (wrongNeighbor) {
          issues.push(`${makeInitials(wrongNeighbor)} should not sit next to ${thisGuestInitials}`)
        }
      })
      return issues
    }
    return []
  }

  const missingDescriptions = () => {
    if (descriptionsYes.length > 0 && neighbors.length > 0) {
      let issues = []
      neighbors.forEach((neighbor) => {
        descriptionsYes.forEach(desc => {
          if (!(neighbor.traits.includes(desc))) {
            issues.push(`${makeInitials(neighbor)} is not ${desc}`)
          }
        })
      })
      return issues
    }
    return []
  }

  const wrongDescriptions = () => {
    if (descriptionsNo.length > 0 && neighbors.length > 0) {
      let issues = []
      neighbors.forEach((neighbor) => {
        descriptionsNo.forEach(desc => {
          if (neighbor.traits.includes(desc)) {
            issues.push(`${makeInitials(neighbor)} is ${desc}`)
          }
        })
      })
      return issues
    }
    return []
  }

  const newIssues = [
    ...missingNeighbors(),
    ...wrongNeighbors(),
    ...missingDescriptions(),
    ...wrongDescriptions(),
  ]

  if (thisGuest.issues.length + newIssues.length > 0) {
    return {
      ...thisGuest,
      issues: newIssues,
    }
  }
  return null
}

// -----------------------------------------------

const events = (state = {
  savedEvents: [],
  currentEvent: null,
  selectedGuest: null,
}, action) => {

  let eventIdx, event, currentEvent, updatedEvent, guestIdx, guest, guests, affectedGuests

  const unJson = (string) => {
    if (string && string !== '') {
      return string.split(',')
    }
    return []
  }

  switch (action.type) {

    case 'SET_SAVED_EVENTS':
      return {
        ...state,
        savedEvents: action.events,
      }

    case 'RESET_CURRENT_EVENT':
      event = {
        id: '',
        name: '',
        table: '',
        chairs: [],
        guests: [],
        guestQty: '0',
        descriptions: [],
        newlyAffectedGuests: [],
      }
      return {
        ...state,
        currentEvent: event,
      }

    case 'ADD_EVENT':
      event = {
        ...action.event,
        chairs: unJson(action.event.chairs),
        descriptions: [],
        newlyAffectedGuests: [],
      }
      return {
        ...state,
        savedEvents: [
          ...state.savedEvents,
          event,
        ],
        currentEvent: event,
      }

    case 'SHOW_EVENT':
      eventIdx = state.savedEvents.findIndex(event => event.id === action.eventId)
      event = state.savedEvents[eventIdx]
      if (typeof event.chairs === 'string') {
        const unJsonGuests = event.guests.map(guest => ({
          ...guest,
          guestsYes: unJson(guest.guestsYes),
          guestsNo: unJson(guest.guestsNo),
          descriptionsYes: unJson(guest.descriptionsYes),
          descriptionsNo: unJson(guest.descriptionsNo),
          traits: unJson(guest.traits),
          neighbors: unJson(guest.neighbors),
          issues: unJson(guest.issues),
        }))
        const unJsonEvent = {
          ...event,
          chairs: unJson(event.chairs),
          guests: unJsonGuests,
          newlyAffectedGuests: unJson(event.newlyAffectedGuests),
          descriptions: unJson(event.descriptions),
        }
        return {
          ...state,
          savedEvents: [
            ...state.savedEvents.slice(0, eventIdx),
            unJsonEvent,
            ...state.savedEvents.slice(eventIdx + 1),
          ],
          currentEvent: unJsonEvent,
        }
      }
      return {
        ...state,
        currentEvent: event,
      }

    case 'UPDATE_EVENT':
      eventIdx = state.savedEvents.findIndex(event => event.id === action.id)
      updatedEvent = {
        ...state.currentEvent,
        ...action.changes,
      }
      return {
        ...state,
        savedEvents: [
          ...state.savedEvents.slice(0, eventIdx),
          updatedEvent,
          ...state.savedEvents.slice(eventIdx + 1),
        ],
        currentEvent: updatedEvent,
      }

    case 'DESTROY_EVENT':
      eventIdx = state.savedEvents.findIndex(event => event.id === action.id)
      return {
        savedEvents: [
          ...state.savedEvents.slice(0, eventIdx),
          ...state.savedEvents.slice(eventIdx + 1),
        ],
        currentEvent: null,
        selectedGuest: null,
      }

    case 'ADD_GUEST':
      eventIdx = state.savedEvents.findIndex(event => event.id === state.currentEvent.id)
      event = state.savedEvents[eventIdx]
      let newGuest = {
        ...action.guest,
        neighbors: [],
        guestsYes: [],
        guestsNo: [],
        descriptionsYes: [],
        descriptionsNo: [],
        traits: [],
        seated: false,
        issues: [],
      }
      updatedEvent = {
        ...event,
        guests: [...event.guests, newGuest],
      }
      return {
        ...state,
        savedEvents: [
          ...state.savedEvents.slice(0, eventIdx),
          updatedEvent,
          ...state.savedEvents.slice(eventIdx + 1),
        ],
        currentEvent: updatedEvent,
      }

    case 'UPDATE_GUEST':
      currentEvent = state.currentEvent
      eventIdx = state.savedEvents.findIndex(event => event.id === currentEvent.id)
      guestIdx = currentEvent.guests.findIndex(guest => guest.id === action.guest.id)
      updatedEvent = {
        ...currentEvent,
        guests: [
          ...currentEvent.guests.slice(0, guestIdx),
          action.guest,
          ...currentEvent.guests.slice(guestIdx + 1),
        ],
      }
      return {
        ...state,
        savedEvents: [
          ...state.savedEvents.slice(0, eventIdx),
          updatedEvent,
          ...state.savedEvents.slice(eventIdx + 1),
        ],
        currentEvent: updatedEvent,
        selectedGuest: action.guest,
      }

    case 'SELECT_GUEST':
      currentEvent = state.currentEvent
      guest = currentEvent.guests.find(guest => guest.id === action.guestId) || currentEvent.chairs.find(chair => chair.id === action.guestId)
      return {
        ...state,
        selectedGuest: guest,
      }

    case 'UNSELECT_GUEST':
      return {
        ...state,
        selectedGuest: null,
      }

    case 'CHECK_FOR_ISSUES':
      eventIdx = state.savedEvents.findIndex(event => event.id === state.currentEvent.id)
      event = state.savedEvents[eventIdx]
      guests = event.guests
      affectedGuests = action.affectedGuests.reduce((affGuests, guest) => {
          const guestWithIssues = checkForIssues(guest, guests)
          if (guestWithIssues) {
            affGuests.push(guestWithIssues)
          }
          return affGuests
        }, [])

      const updatedGuests = affectedGuests.reduce((allGuests, updatedGuest) => {
        guestIdx = guests.findIndex(guest => guest.id === updatedGuest.id)
        return [
          ...allGuests.slice(0, guestIdx),
          updatedGuest,
          ...allGuests.slice(guestIdx + 1),
        ]
      }, guests) 

      updatedEvent = {
        ...event,
        guests: updatedGuests,
        newlyAffectedGuests: affectedGuests,
      }

      return {
        ...state,
        savedEvents: [
          ...state.savedEvents.slice(0, eventIdx),
          updatedEvent,
          ...state.savedEvents.slice(eventIdx + 1),
        ],
        currentEvent: updatedEvent,
      }

    case 'CLEAR_NEWLY_AFFECTED_GUESTS':
      eventIdx = state.savedEvents.findIndex(event => event.id === state.currentEvent.id)
      event = state.savedEvents[eventIdx]
      updatedEvent = {
        ...event,
        newlyAffectedGuests: [],
      }
      return {
        ...state,
        savedEvents: [
          ...state.savedEvents.slice(0, eventIdx),
          updatedEvent,
          ...state.savedEvents.slice(eventIdx + 1),
        ],
        currentEvent: updatedEvent,
      }

    case 'CLEAR_EVENTS':
      return {
        savedEvents: [],
        currentEvent: null,
        selectedGuest: null,
      }

    default:
      return state
  }
}

export default events
