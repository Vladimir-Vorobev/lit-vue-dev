export const APP_STORE = {
	state: {
		cookie: false,
		email: '',
	},
	mutations: {
		CHECK_COOKIE(state) {
			state.cookie = true;
		},
		GET_USER_EMAIL(state, value) {
			state.email = value;
		},
	},
	getters: {
		cookie: (state) => state.cookie,
		email: (state) => state.email,
	},
};