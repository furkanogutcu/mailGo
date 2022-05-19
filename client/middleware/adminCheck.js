export default async function ({ store, redirect, $auth }) {
    const isAuthenticated = $auth.loggedIn;
    if (isAuthenticated) {
        await store.dispatch('fetchSubscriber');
        const subscriber = store.getters.getSubscriber;
        if (!subscriber.roles.some(role => role.name.toLowerCase() === 'admin')) {
            redirect('/');
        }
    }
};
