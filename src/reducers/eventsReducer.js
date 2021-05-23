import { v4 as uuidv4 } from 'uuid'

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
              // '7a574ed5-efad-479d-8ac1-9c7ae314a5ca',
              // 'aa56777b-211d-412f-ace5-0056ec469e2d'
            ],
            guestsNo: [
              // '4e8d1a3e-d48d-4b6a-b84a-9235fc8be083'
            ],
            descriptionsYes: [
              'A'
            ],
            descriptionsNo: [
              '3'
            ]
          },
          traits: [],
          seated: false
        },
        {
          id: '7a574ed5-efad-479d-8ac1-9c7ae314a5ca',
          firstName: 'Ruthie',
          midName: '',
          lastName: 'Hoisington',
          neighbors: [],
          preferences: {
            guestsYes: [
              // 'bbf2e30b-0e80-4214-9027-55a2c81e799a',
              // '4e8d1a3e-d48d-4b6a-b84a-9235fc8be083'
            ],
            guestsNo: [
              // 'aa56777b-211d-412f-ace5-0056ec469e2d'
            ],
            descriptionsYes: [
              'D'
            ],
            descriptionsNo: [
              '2'
            ]
          },
          traits: [],
          seated: false
        },
        {
          id: 'aa56777b-211d-412f-ace5-0056ec469e2d',
          firstName: 'Linz',
          midName: '',
          lastName: 'Hoisington',
          neighbors: [],
          preferences: {
            guestsYes: [
              // 'bbf2e30b-0e80-4214-9027-55a2c81e799a',
              // '4e8d1a3e-d48d-4b6a-b84a-9235fc8be083'
            ],
            guestsNo: [
              // '7a574ed5-efad-479d-8ac1-9c7ae314a5ca'
            ],
            descriptionsYes: [
              'B'
            ],
            descriptionsNo: [
              '4'
            ]
          },
          traits: [],
          seated: false
        },
        {
          id: '4e8d1a3e-d48d-4b6a-b84a-9235fc8be083',
          firstName: 'June',
          midName: '',
          lastName: 'Hoisington',
          neighbors: [],
          preferences: {
            guestsYes: [
              // '7a574ed5-efad-479d-8ac1-9c7ae314a5ca',
              // 'aa56777b-211d-412f-ace5-0056ec469e2d'
            ],
            guestsNo: [
              // 'bbf2e30b-0e80-4214-9027-55a2c81e799a'
            ],
            descriptionsYes: [
              'C'
            ],
            descriptionsNo: [
              '1'
            ]
          },
          traits: [],
          seated: false
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
      ]
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
            // '7a574ed5-efad-479d-8ac1-9c7ae314a5ca',
            // 'aa56777b-211d-412f-ace5-0056ec469e2d'
          ],
          guestsNo: [
            // '4e8d1a3e-d48d-4b6a-b84a-9235fc8be083'
          ],
          descriptionsYes: [
            'A'
          ],
          descriptionsNo: [
            '3'
          ]
        },
        traits: [],
        seated: false
      },
      {
        id: '7a574ed5-efad-479d-8ac1-9c7ae314a5ca',
        firstName: 'Ruthie',
        midName: '',
        lastName: 'Hoisington',
        neighbors: [],
        preferences: {
          guestsYes: [
            // 'bbf2e30b-0e80-4214-9027-55a2c81e799a',
            // '4e8d1a3e-d48d-4b6a-b84a-9235fc8be083'
          ],
          guestsNo: [
            // 'aa56777b-211d-412f-ace5-0056ec469e2d'
          ],
          descriptionsYes: [
            'D'
          ],
          descriptionsNo: [
            '2'
          ]
        },
        traits: [],
        seated: false
      },
      {
        id: 'aa56777b-211d-412f-ace5-0056ec469e2d',
        firstName: 'Linz',
        midName: '',
        lastName: 'Hoisington',
        neighbors: [],
        preferences: {
          guestsYes: [
            // 'bbf2e30b-0e80-4214-9027-55a2c81e799a',
            // '4e8d1a3e-d48d-4b6a-b84a-9235fc8be083'
          ],
          guestsNo: [
            // '7a574ed5-efad-479d-8ac1-9c7ae314a5ca'
          ],
          descriptionsYes: [
            'B'
          ],
          descriptionsNo: [
            '4'
          ]
        },
        traits: [],
        seated: false
      },
      {
        id: '4e8d1a3e-d48d-4b6a-b84a-9235fc8be083',
        firstName: 'June',
        midName: '',
        lastName: 'Hoisington',
        neighbors: [],
        preferences: {
          guestsYes: [
            // '7a574ed5-efad-479d-8ac1-9c7ae314a5ca',
            // 'aa56777b-211d-412f-ace5-0056ec469e2d'
          ],
          guestsNo: [
            // 'bbf2e30b-0e80-4214-9027-55a2c81e799a'
          ],
          descriptionsYes: [
            'C'
          ],
          descriptionsNo: [
            '1'
          ]
        },
        traits: [],
        seated: false
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
    ]
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
//     },
//     selectedGuest: null,
//   }, action) {

function eventsReducer(state = defaultState, action) {

  let eventIdx, event, currentEvent, updatedEvent, guestIdx, guest, selectedGuest, chairIdx, chairId

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
