// import { v4 as uuidv4 } from 'uuid'

const updatePreviousNeighbor = (guestBefore, neighborId, guests) => {
  const guest = guests.find(guest => guest.id === neighborId)
  const updatedNeighbors = guest.neighbors.filter(nbrId => nbrId !== guestBefore.id)
  return {
    ...guest,
    neighbors: updatedNeighbors,
  }
}

const updatePreviousNeighbors = (guestBefore, guests) => {
  const prevNeighborIds = guestBefore.neighbors.filter(guestId => guestId !== '')
  if (prevNeighborIds.length > 0) {
    return prevNeighborIds.map(id => updatePreviousNeighbor(guestBefore, id, guests))
  }
  return prevNeighborIds
}

const getNewNeighborIds = (chairs, guest) => {
  const chairIdx = chairs.findIndex(chair => chair === guest.id)
  let neighbors
  const last = chairs.length - 1
  switch (chairIdx) {
    case 0:
      neighbors = [
        chairs[last],
        chairs[1],
      ]
      break
    case last:
      neighbors = [
        chairs[last - 1],
        chairs[0],
      ]
      break
    default:
      neighbors = [
        chairs[chairIdx - 1],
        chairs[chairIdx + 1],
      ]
  }
  return neighbors.filter(nbrId => nbrId !== '')
}

const updateNewNeighbor = (guests, neighborId, chairs) => {
  const newNeighbor = guests.find(guest => guest.id === neighborId)
  return {
    ...newNeighbor,
    neighbors: getNewNeighborIds(chairs, newNeighbor)
  }
}

const updateNewNeighbors = (guests, neighborIds, chairs) => {
  if (neighborIds.length > 0) {
    return neighborIds.map(id => updateNewNeighbor(guests, id, chairs))
  } else {
    return []
  }
}

const makeInitials = (guest) => {
  return [
    guest.firstName[0],
    guest.midName[0],
    guest.lastName[0],
  ].join('')
}

const checkForIssues = (thisGuest, guests) => {
  const { guestsYes, guestsNo, descriptionsYes, descriptionsNo } = thisGuest
  const neighbors = thisGuest.neighbors.map(nbrId => guests.find(guest => guest.id === nbrId))
  const thisGuestInitials = makeInitials(thisGuest)

  const missingNeighbors = () => {
    if (guestsYes.length > 0) {
      let issues = []
      guestsYes.forEach((guestId) => {
        if (neighbors.length === 0 || !(neighbors.find(nbr => nbr.id === guestId))) {
          const missingNeighbor = guests.find(guest => guest.id === guestId)
          issues.push(`${makeInitials(missingNeighbor)} should sit next to ${thisGuestInitials}`)
        }
      })
      return issues
    } else {
      return []
    }
  }

  const wrongNeighbors = () => {
    if (guestsNo.length > 0 && neighbors.length > 0) {
      let issues = []
      guestsNo.forEach((guestId) => {
        const wrongNeighbor = neighbors.find(nbr => nbr.id === guestId)
        if (wrongNeighbor) {
          issues.push(`${makeInitials(wrongNeighbor)} should not sit next to ${thisGuestInitials}`)
        }
      })
      return issues
    } else {
      return []
    }
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
    } else {
      return []
    }
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
    } else {
      return []
    }
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
  } else {
    return thisGuest
  }
}

// -----------------------------------------------

const events = (state = {
  savedEvents: [],
  currentEvent: null,
  selectedGuest: null,
}, action) => {

  let eventIdx, event, currentEvent, updatedEvent, guestIdx, guest, guests, selectedGuest, affectedGuests, chairs, chairIdx, chairId

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
        affectedGuests: [],
      }
      return {
        ...state,
        currentEvent: event,
      }

    case 'ADD_EVENT':
      event = {
        ...action.event,
        chairs: unJson(action.event.chairs),
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
      eventIdx = state.savedEvents.findIndex(event => event.id === action.changes.id)
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

    // case 'REMOVE_EVENT':
    //   eventIdx = state.savedEvents.findIndex(event => event.id === action.id)
    //   // ADDRESS currentEvent !!
    //   return {
    //     ...state,
    //     savedEvents: [
    //       ...state.savedEvents.slice(0, eventIdx),
    //       ...state.savedEvents.slice(eventIdx + 1),
    //     ],
    //   }

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
      eventIdx = state.savedEvents.findIndex(event => event.id === state.currentEvent.id)
      event = state.savedEvents[eventIdx]
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
        savedEvents: [
          ...state.savedEvents.slice(0, eventIdx),
          updatedEvent,
          ...state.savedEvents.slice(eventIdx + 1),
        ],
        currentEvent: updatedEvent,
        selectedGuest: action.guest,
      }

      case 'UPDATE_DESCRIPTIONS':
        eventIdx = state.savedEvents.findIndex(event => event.id === state.currentEvent.id)
        event = state.savedEvents[eventIdx]
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
      guest = currentEvent.guests.find(guest => guest.id === action.id) || currentEvent.chairs.find(chair => chair.id === action.id)
      return {
        ...state,
        selectedGuest: guest,
      }

    case 'SEAT_GUEST':
      eventIdx = state.savedEvents.findIndex(event => event.id === state.currentEvent.id)
      event = state.savedEvents[eventIdx]
      selectedGuest = state.selectedGuest
      chairId = parseInt(action.chairId)
      if (selectedGuest.seated) {
        chairIdx = event.chairs.findIndex(chair => chair === selectedGuest.id)
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
            selectedGuest.id,
            ...event.chairs.slice(chairId + 1),
          ],
        }
      } else {
        guestIdx = event.guests.findIndex(guest => guest.id === selectedGuest.id)
        selectedGuest = {
          ...selectedGuest,
          seated: true,
        }
        updatedEvent = {
          ...event,
          guests: [
            ...event.guests.slice(0, guestIdx),
            selectedGuest,
            ...event.guests.slice(guestIdx + 1),
          ],
          chairs: [
            ...event.chairs.slice(0, chairId),
            selectedGuest.id,
            ...event.chairs.slice(chairId + 1),
          ],
        }
      }
      return {
        ...state,
        savedEvents: [
          ...state.savedEvents.slice(0, eventIdx),
          updatedEvent,
          ...state.savedEvents.slice(eventIdx + 1),
        ],
        currentEvent: updatedEvent,
        selectedGuest: null,
      }

    case 'UNSEAT_GUEST':
      eventIdx = state.savedEvents.findIndex(event => event.id === state.currentEvent.id)
      event = state.savedEvents[eventIdx]
      selectedGuest = state.selectedGuest
      guestIdx = event.guests.findIndex(guest => guest.id === selectedGuest.id)
      chairIdx = event.chairs.findIndex(chair => chair === selectedGuest.id)
      selectedGuest = {
        ...selectedGuest,
        neighbors: [],
        seated: false,
        issues: [],
      }
      updatedEvent = {
        ...event,
        chairs: [
          ...event.chairs.slice(0, chairIdx),
          '',
          ...event.chairs.slice(chairIdx + 1),
        ],
        guests: [
          ...event.guests.slice(0, guestIdx),
          selectedGuest,
          ...event.guests.slice(guestIdx + 1),
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
        selectedGuest: null,
      }

    case 'DELETE_GUEST':
      eventIdx = state.savedEvents.findIndex(event => event.id === state.currentEvent.id)
      event = state.savedEvents[eventIdx]
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
        savedEvents: [
          ...state.savedEvents.slice(0, eventIdx),
          updatedEvent,
          ...state.savedEvents.slice(eventIdx + 1),
        ],
        currentEvent: updatedEvent,
        selectedGuest: null,
      }

    case 'UPDATE_NEIGHBORS':
      eventIdx = state.savedEvents.findIndex(event => event.id === state.currentEvent.id)
      event = state.savedEvents[eventIdx]
      guests = event.guests
      chairs = event.chairs
      const guestBefore = action.guest
      let guestAfter = guests.find(guest => guest.id === guestBefore.id)

      const previousNeighbors = updatePreviousNeighbors(guestBefore, guests)

      if (guestAfter.seated) {
        const newNeighborIds = getNewNeighborIds(chairs, guestAfter)
        const newNeighbors = updateNewNeighbors(guests, newNeighborIds, chairs)
        guestAfter = {
          ...guestAfter,
          neighbors: newNeighborIds,
        }
        affectedGuests = [
          ...previousNeighbors,
          guestAfter,
          ...newNeighbors,
        ]
      } else {
        affectedGuests = [...previousNeighbors]
      }

      if (affectedGuests.length > 0) {
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
      } else {
        updatedEvent = {
          ...event,
          newlyAffectedGuests: [],
        }
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

    case 'CHECK_FOR_ISSUES':
      eventIdx = state.savedEvents.findIndex(event => event.id === state.currentEvent.id)
      event = state.savedEvents[eventIdx]
      guests = event.guests
      affectedGuests = event.newlyAffectedGuests
      if (affectedGuests.length > 0) {
        affectedGuests = affectedGuests.map(guest => checkForIssues(guest, guests))
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
          newlyAffectedGuests: [],
        }
      } else {
        updatedEvent = {
          ...event,
          newlyAffectedGuests: [],
        }
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
