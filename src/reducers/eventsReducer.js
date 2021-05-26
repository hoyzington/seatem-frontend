import { v4 as uuidv4 } from 'uuid'

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
  const { guestsYes, guestsNo, descriptionsYes, descriptionsNo } = thisGuest.preferences
  const { neighbors } = thisGuest
  const thisGuestInitials = makeInitials(thisGuest)

  const missingNeighbors = () => {
    if (guestsYes.length > 0) {
      let issues = []
      guestsYes.forEach((guestId) => {
        if (neighbors.length === 0 || !(neighbors.find(nbrId => nbrId === guestId))) {
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
        if (neighbors.find(nbrId => nbrId === guestId)) {
          const wrongNeighbor = guests.find(guest => guest.id === guestId)
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
// console.log(newIssues)
  if (thisGuest.issues.length + newIssues.length > 0) {
    return {
      ...thisGuest,
      issues: newIssues,
    }
  } else {
    return thisGuest
  }
}

const defaultState = {
  user: null,
  events: [
    {
      id: '6e7c0c06-b7be-4b56-a127-c63bf88daac1',
      name: 'event',
      table: 'rect',
      chairs: [
        '',
        '',
        '',
        ''
      ],
      guests: [
        {
          id: 'bbf2e30b-0e80-4214-9027-55a2c81e799a',
          firstName: 'Scott',
          midName: '',
          lastName: 'Hoisington',
          neighbors: [],
          preferences: {
            guestsYes: [
              '7a574ed5-efad-479d-8ac1-9c7ae314a5ca',
              'aa56777b-211d-412f-ace5-0056ec469e2d'
            ],
            guestsNo: [
              '4e8d1a3e-d48d-4b6a-b84a-9235fc8be083'
            ],
            descriptionsYes: [
              'A'
            ],
            descriptionsNo: [
              '3'
            ]
          },
          traits: ['1', 'B', 'D'],
          seated: false,
          issues: [],
        },
        {
          id: '7a574ed5-efad-479d-8ac1-9c7ae314a5ca',
          firstName: 'Ruthie',
          midName: '',
          lastName: 'Hoisington',
          neighbors: [],
          preferences: {
            guestsYes: [
              'bbf2e30b-0e80-4214-9027-55a2c81e799a',
              '4e8d1a3e-d48d-4b6a-b84a-9235fc8be083'
            ],
            guestsNo: [
              'aa56777b-211d-412f-ace5-0056ec469e2d'
            ],
            descriptionsYes: [
              'D'
            ],
            descriptionsNo: [
              '2'
            ]
          },
          traits: ['4', 'A', 'C'],
          seated: false,
          issues: [],
        },
        {
          id: 'aa56777b-211d-412f-ace5-0056ec469e2d',
          firstName: 'Linz',
          midName: '',
          lastName: 'Hoisington',
          neighbors: [],
          preferences: {
            guestsYes: [
              'bbf2e30b-0e80-4214-9027-55a2c81e799a',
              '4e8d1a3e-d48d-4b6a-b84a-9235fc8be083'
            ],
            guestsNo: [
              '7a574ed5-efad-479d-8ac1-9c7ae314a5ca'
            ],
            descriptionsYes: [
              'B'
            ],
            descriptionsNo: [
              '4'
            ]
          },
          traits: ['2', 'A', 'C'],
          seated: false,
          issues: [],
        },
        {
          id: '4e8d1a3e-d48d-4b6a-b84a-9235fc8be083',
          firstName: 'June',
          midName: '',
          lastName: 'Hoisington',
          neighbors: [],
          preferences: {
            guestsYes: [
              '7a574ed5-efad-479d-8ac1-9c7ae314a5ca',
              'aa56777b-211d-412f-ace5-0056ec469e2d'
            ],
            guestsNo: [
              'bbf2e30b-0e80-4214-9027-55a2c81e799a'
            ],
            descriptionsYes: [
              'C'
            ],
            descriptionsNo: [
              '1'
            ]
          },
          traits: ['3', 'B', 'D'],
          seated: false,
          issues: [],
        }
      ],
      guestQty: '3',
      descriptions: [
        'A',
        'B',
        'D',
        'C',
        '1',
        '3',
        '2',
        '4'
      ],
      newlyAffectedGuests: []
    }
  ],
  currentEvent: {
    id: '6e7c0c06-b7be-4b56-a127-c63bf88daac1',
    name: 'event',
    table: 'rect',
    chairs: [
      '',
      '',
      '',
      ''
    ],
    guests: [
      {
        id: 'bbf2e30b-0e80-4214-9027-55a2c81e799a',
        firstName: 'Scott',
        midName: '',
        lastName: 'Hoisington',
        neighbors: [],
        preferences: {
          guestsYes: [
            '7a574ed5-efad-479d-8ac1-9c7ae314a5ca',
            'aa56777b-211d-412f-ace5-0056ec469e2d'
          ],
          guestsNo: [
            '4e8d1a3e-d48d-4b6a-b84a-9235fc8be083'
          ],
          descriptionsYes: [
            'A'
          ],
          descriptionsNo: [
            '3'
          ]
        },
        traits: ['1', 'B', 'D'],
        seated: false,
        issues: [],
      },
      {
        id: '7a574ed5-efad-479d-8ac1-9c7ae314a5ca',
        firstName: 'Ruthie',
        midName: '',
        lastName: 'Hoisington',
        neighbors: [],
        preferences: {
          guestsYes: [
            'bbf2e30b-0e80-4214-9027-55a2c81e799a',
            '4e8d1a3e-d48d-4b6a-b84a-9235fc8be083'
          ],
          guestsNo: [
            'aa56777b-211d-412f-ace5-0056ec469e2d'
          ],
          descriptionsYes: [
            'D'
          ],
          descriptionsNo: [
            '2'
          ]
        },
        traits: ['4', 'A', 'C'],
        seated: false,
        issues: [],
      },
      {
        id: 'aa56777b-211d-412f-ace5-0056ec469e2d',
        firstName: 'Linz',
        midName: '',
        lastName: 'Hoisington',
        neighbors: [],
        preferences: {
          guestsYes: [
            'bbf2e30b-0e80-4214-9027-55a2c81e799a',
            '4e8d1a3e-d48d-4b6a-b84a-9235fc8be083'
          ],
          guestsNo: [
            '7a574ed5-efad-479d-8ac1-9c7ae314a5ca'
          ],
          descriptionsYes: [
            'B'
          ],
          descriptionsNo: [
            '4'
          ]
        },
        traits: ['2', 'A', 'C'],
        seated: false,
        issues: [],
      },
      {
        id: '4e8d1a3e-d48d-4b6a-b84a-9235fc8be083',
        firstName: 'June',
        midName: '',
        lastName: 'Hoisington',
        neighbors: [],
        preferences: {
          guestsYes: [
            '7a574ed5-efad-479d-8ac1-9c7ae314a5ca',
            'aa56777b-211d-412f-ace5-0056ec469e2d'
          ],
          guestsNo: [
            'bbf2e30b-0e80-4214-9027-55a2c81e799a'
          ],
          descriptionsYes: [
            'C'
          ],
          descriptionsNo: [
            '1'
          ]
        },
        traits: ['3', 'B', 'D'],
        seated: false,
        issues: [],
      }
    ],
    guestQty: '3',
    descriptions: [
      'A',
      'B',
      'D',
      'C',
      '1',
      '3',
      '2',
      '4'
    ],
    newlyAffectedGuests: []
  },
  selectedGuest: null
}

// function eventsReducer(state = {
//     user: null,
//     events: [],
//     currentEvent: {
//       id: '',
//       name: '',
//       table: '',
//       chairs: [],
//       guests: [],
//       guestQty: '0',
//       descriptions: [],
//       affectedGuests: [],
//     },
//     selectedGuest: null,
//   }, action) {

function eventsReducer(state = defaultState, action) {

  let eventIdx, event, currentEvent, updatedEvent, guestIdx, guest, guests, selectedGuest, affectedGuests,chairIdx, chairId

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
      eventIdx = state.events.findIndex(event => event.id === state.currentEvent.id)
      event = state.events[eventIdx]
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
        issues: [],
      }
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
      eventIdx = state.events.findIndex(event => event.id === state.currentEvent.id)
      event = state.events[eventIdx]
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
        events: [
          ...state.events.slice(0, eventIdx),
          updatedEvent,
          ...state.events.slice(eventIdx + 1),
        ],
        currentEvent: updatedEvent,
        selectedGuest: null,
      }

    case 'UNSEAT_GUEST':
      eventIdx = state.events.findIndex(event => event.id === state.currentEvent.id)
      event = state.events[eventIdx]
      selectedGuest = state.selectedGuest
      guestIdx = event.guests.findIndex(guest => guest.id === selectedGuest.id)
      chairIdx = event.chairs.findIndex(chair => chair === selectedGuest.id)
      selectedGuest = {
        ...selectedGuest,
        neighbors: [],
        seated: false,
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
      guests = event.guests
      const chairs = event.chairs
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
        events: [
          ...state.events.slice(0, eventIdx),
          updatedEvent,
          ...state.events.slice(eventIdx + 1),
        ],
        currentEvent: updatedEvent,
      }

    case 'CHECK_FOR_ISSUES':
      eventIdx = state.events.findIndex(event => event.id === state.currentEvent.id)
      event = state.events[eventIdx]
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
