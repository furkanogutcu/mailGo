import jwtDecode from 'jwt-decode';

export const MUTATIONS = {
    SET_USER: 'SET_USER',
    DELETE_USER: 'DELETE_USER',
    CHANGE_PAGE: 'CHANGE_PAGE',
};

export const state = () => ({
    user: null,
    activePage: 1,
});

export const getters = {
    user: state => state.user,
    activePage: state => state.activePage,
};

export const mutations = {
    [MUTATIONS.SET_USER](state) {
        const tokenWithBearer = this.$auth.strategy.token.get();
        if (tokenWithBearer === false) {
            this.$auth.logout();
            state.user = null;
            return;
        }
        const decoded = jwtDecode(tokenWithBearer.split(' ')[1]);
        state.user = decoded.user;
    },
    [MUTATIONS.DELETE_USER](state) {
        state.user = null;
    },
    [MUTATIONS.CHANGE_PAGE](state, page) {
        state.activePage = page;
    }
};

export const actions = {
    setUser({ commit }) {
        commit(MUTATIONS.SET_USER);
    },
    deleteUser({ commit }) {
        commit(MUTATIONS.DELETE_USER);
    },
    changePage({ commit }, page) {
        commit(MUTATIONS.CHANGE_PAGE, page);
    }
};
