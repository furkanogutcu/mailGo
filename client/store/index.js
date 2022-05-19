export const MUTATIONS = {
    SET_SUBSCRIBER: 'SET_SUBSCRIBER',
    DELETE_SUBSCRIBER: 'DELETE_SUBSCRIBER',
    CHANGE_PAGE: 'CHANGE_PAGE',
};

export const state = () => ({
    subscriber: {
        _id: '',
        firstName: '',
        lastName: '',
        email: '',
        roles: [],
        subscribedCategories: [],
        createdAt: '',
        updatedAt: '',
        analysis: {
            totalCampaignClicks: 0,
            totalNumberOfEmailSent: 0
        }
    },
    activePage: 1,
});

export const getters = {
    getSubscriber: state => state.subscriber,
    activePage: state => state.activePage,
};

export const mutations = {
    [MUTATIONS.SET_SUBSCRIBER](state, subscriber) {
        state.subscriber = subscriber;
    },
    [MUTATIONS.DELETE_SUBSCRIBER](state) {
        state.subscriber = {
            _id: '',
            firstName: '',
            lastName: '',
            email: '',
            roles: [],
            subscribedCategories: [],
            createdAt: '',
            updatedAt: '',
            analysis: {
                totalCampaignClicks: 0,
                totalNumberOfEmailSent: 0
            }
        };
    },
    [MUTATIONS.CHANGE_PAGE](state, page) {
        state.activePage = page;
    },
};

export const actions = {
    async fetchSubscriber({ commit }) {
        const subscriber = await this.$axios.$get('/subscriber/get');
        commit(MUTATIONS.SET_SUBSCRIBER, subscriber.data);
    },
    deleteSubscriber({ commit }) {
        commit(MUTATIONS.DELETE_SUBSCRIBER);
    },
    changePage({ commit }, page) {
        commit(MUTATIONS.CHANGE_PAGE, page);
    },
};
