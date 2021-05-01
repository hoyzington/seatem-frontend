function eventsReducer(state = [], action) {
  let idx
  switch (action.type) {
    case 'ADD_EVENT':
      return [...state, action.event]

    case 'REMOVE_EVENT':
      idx = state.findIndex(event => event.id === action.id)
      return [
          ...state.slice(0, idx),
          ...state.slice(idx + 1)
        ]

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

    // case 'ADD_GUEST':
    //   return {
    //     ...state,
    //     guests: [...state.guests, action.guest]
    //   }

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
