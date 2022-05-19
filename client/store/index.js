export const MUTATIONS = {
    SET_SUBSCRIBER: 'SET_SUBSCRIBER',
    DELETE_SUBSCRIBER: 'DELETE_SUBSCRIBER',
    CHANGE_PAGE: 'CHANGE_PAGE',
    SET_CATEGORIES: 'SET_CATEGORIES',
    SUBSCRIBE_CATEGORY: 'SUBSCRIBE_CATEGORY',
    UNSUBSCRIBE_CATEGORY: 'UNSUBSCRIBE_CATEGORY',
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
    activePage: null,
    categories: [],
});

export const getters = {
    getSubscriber: state => state.subscriber,
    activePage: state => state.activePage,
    getCategories: state => state.categories,
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
    [MUTATIONS.SET_CATEGORIES](state, categories) {
        state.categories = categories;
    }
};

export const actions = {
    async fetchSubscriber({ commit }) {
        const response = await this.$axios.$get('/subscriber/get');
        if (response.success) {
            commit(MUTATIONS.SET_SUBSCRIBER, response.data);
        }
    },
    deleteSubscriber({ commit }) {
        commit(MUTATIONS.DELETE_SUBSCRIBER);
    },
    changePage({ commit }, page) {
        commit(MUTATIONS.CHANGE_PAGE, page);
    },
    async fetchCategories({ commit }) {
        const response = await this.$axios.$get('/category/getAll');
        if (response.success) {
            commit(MUTATIONS.SET_CATEGORIES, response.data);
        }
    },
    async subscribeCategory({ commit }, categoryList) {
        const response = await this.$axios.$post('/subscriber/subscribe', {
            categories: categoryList
        });
        if (response.success) {
            commit(MUTATIONS.SET_SUBSCRIBER, response.data);
        }
    },
    async unSubscribeCategory({ commit }, categoryList) {
        const response = await this.$axios.$post('/subscriber/unsubscribe', {
            categories: categoryList
        });
        if (response.success) {
            commit(MUTATIONS.SET_SUBSCRIBER, response.data);
        }
    }
};
