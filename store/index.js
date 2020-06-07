export const APP_STORE = {
	state: {
		email: '',
		allEventsScroll: 0,
		openDaysScroll: 0,
	},
	mutations: {
		GET_USER_EMAIL(state, value) {
			state.email = value;
		},
		SET_ALL_EVENTS_SCROLL(state, value){
			state.allEventsScroll = value
		},
		SET_OPEN_DAYS_SCROLL(state, value){
			state.openDaysScroll = value
		},
	},
	getters: {
		email: (state) => state.email,
		allEventsScroll: (state) => state.allEventsScroll,
		openDaysScroll: (state) => state.openDaysScroll,
	},
};