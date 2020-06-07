export const APP_STORE = {
	state: {
		email: '',
	},
	mutations: {
		GET_USER_EMAIL(state, value) {
			state.email = value;
		},
	},
	getters: {
		email: (state) => state.email,
	},
};