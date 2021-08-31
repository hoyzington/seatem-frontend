const errors = (action, state = null) => {
	switch (action.type) {
		case 'LOG_ERRORS':
			return action.errors;

		case 'CLEAR_ERRORS':
			return null;

		default:
			return state;
	}
};

export default errors;
