export const logErrors = (errors) => ({
	type: 'LOG_ERRORS',
	errors,
});

export const clearErrors = () => ({
	type: 'CLEAR_ERRORS',
});
