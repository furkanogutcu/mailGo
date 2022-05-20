export const MUTATIONS = {
    SET_SUBSCRIBER: 'SET_SUBSCRIBER',
    DELETE_SUBSCRIBER: 'DELETE_SUBSCRIBER',
    CHANGE_PAGE: 'CHANGE_PAGE',
    SET_CATEGORIES: 'SET_CATEGORIES',
    SUBSCRIBE_CATEGORY: 'SUBSCRIBE_CATEGORY',
    UNSUBSCRIBE_CATEGORY: 'UNSUBSCRIBE_CATEGORY',
    SET_CAMPAIGNS: 'SET_CAMPAIGNS',
    SET_ALL_SUBSCRIBERS: 'SET_ALL_SUBSCRIBERS',
    SET_ROLES: 'SET_ROLES',
    REPLACE_CAMPAIGN: 'REPLACE_CAMPAIGN',
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
    campaigns: [],
    allSubscribers: [],
    roles: [],
});

export const getters = {
    getSubscriber: state => state.subscriber,
    activePage: state => state.activePage,
    getCategories: state => state.categories,
    getCampaigns: state => state.campaigns,
    getAllSubscribers: state => state.allSubscribers
        // Adminleri filtrele
        .filter(subscriber => !subscriber.roles.some(r => r.name.toLowerCase() === 'admin'))
        .map(subscriber => ({
            ...subscriber,
            fullName: `${subscriber.firstName.toUpperCase()} ${subscriber.lastName.toUpperCase()}`
        })),
    getRoles: state => state.roles,
    // Abonesi olduğum kampanyaları getir. Her bir kampanya bir kategoriye ait. Eğer ki abone o kategoriye abone ise, kampanyayı getir.
    getSubscribedCampaigns: state =>
        state.campaigns.filter(
            campaign => state.subscriber.subscribedCategories.some(
                subscribedCategory => subscribedCategory.category._id === campaign.category._id)),
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
    },
    [MUTATIONS.SET_CAMPAIGNS](state, campaigns) {
        state.campaigns = campaigns;
    },
    [MUTATIONS.SET_ALL_SUBSCRIBERS](state, subscribers) {
        state.allSubscribers = subscribers;
    },
    [MUTATIONS.SET_ROLES](state, roles) {
        state.roles = roles;
    },
    [MUTATIONS.REPLACE_CAMPAIGN](state, campaign) {
        const index = state.campaigns.findIndex(c => c._id === campaign._id);
        state.campaigns.splice(index, 1, campaign);
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
    },
    async fetchCampaigns({ commit }) {
        const response = await this.$axios.$get('/campaign/getAll');
        if (response.success) {
            commit(MUTATIONS.SET_CAMPAIGNS, response.data);
        }
    },
    async fetchAllSubscribers({ commit }) {
        const response = await this.$axios.$get('/subscriber/getAll');
        if (response.success) {
            commit(MUTATIONS.SET_ALL_SUBSCRIBERS, response.data);
        }
    },
    async fetchRoles({ commit }) {
        const response = await this.$axios.$get('userrole/getAll');
        if (response.success) {
            commit(MUTATIONS.SET_ROLES, response.data);
        }
    },
    async increaseCampaignClick({ commit }, campaignId) {
        const response = await this.$axios.$get(`/campaign/increase-total-click/${campaignId}`);
        if (response.success) {
            commit(MUTATIONS.REPLACE_CAMPAIGN, response.data);
        }
    },
};
